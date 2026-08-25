<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FcmToken;
use App\Models\Setting;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Works/Index', [
            'works' => Work::latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Works/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'category'    => 'nullable|string|max:255',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link'        => 'nullable|string|max:255',
            'tech_stack'  => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('works', 'public');
        }

        $work = Work::create($validated);

        // Auto-send FCM push notification to all subscribers
        $this->sendWorkNotification($work);

        return redirect()->route('admin.works.index')->with('success', 'Work created successfully.');
    }

    public function edit(Work $work)
    {
        return Inertia::render('Admin/Works/Edit', [
            'work' => $work
        ]);
    }

    public function update(Request $request, Work $work)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'category'    => 'nullable|string|max:255',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link'        => 'nullable|string|max:255',
            'tech_stack'  => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            if ($work->image) {
                \Storage::disk('public')->delete($work->image);
            }
            $validated['image'] = $request->file('image')->store('works', 'public');
        }

        $work->update($validated);

        return redirect()->route('admin.works.index')->with('success', 'Work updated successfully.');
    }

    public function destroy(Work $work)
    {
        if ($work->image) {
            \Storage::disk('public')->delete($work->image);
        }
        $work->delete();
        return redirect()->route('admin.works.index')->with('success', 'Work deleted successfully.');
    }

    /**
     * Send FCM push notification to all subscribers when a new work is published.
     */
    private function sendWorkNotification(Work $work): void
    {
        $serverKey = Setting::where('key', 'fcm_server_key')->value('value');
        if (!$serverKey) return;

        $tokens = FcmToken::pluck('token')->toArray();
        if (empty($tokens)) return;

        $clickUrl = url('/works');

        $payload = [
            'registration_ids' => $tokens,
            'notification' => [
                'title' => '🚀 New Project Published!',
                'body'  => $work->title . ' — Check it out!',
                'click_action' => $clickUrl,
                'icon'  => url('/favicon.ico'),
            ],
            'data' => ['url' => $clickUrl],
        ];

        try {
            $response = Http::timeout(10)->withHeaders([
                'Authorization' => 'key=' . $serverKey,
                'Content-Type'  => 'application/json',
            ])->post('https://fcm.googleapis.com/fcm/send', $payload);

            // Clean up invalid tokens
            $result = $response->json();
            if (($result['failure'] ?? 0) > 0 && isset($result['results'])) {
                $invalidTokens = [];
                foreach ($result['results'] as $i => $r) {
                    if (isset($r['error']) && in_array($r['error'], ['NotRegistered', 'InvalidRegistration'])) {
                        $invalidTokens[] = $tokens[$i];
                    }
                }
                if ($invalidTokens) FcmToken::whereIn('token', $invalidTokens)->delete();
            }
        } catch (\Throwable $e) {
            // Fail silently — don't block the admin workflow if FCM fails
            \Log::warning('FCM notification failed: ' . $e->getMessage());
        }
    }
}
