<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FcmToken;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /** Admin UI */
    public function index()
    {
        return Inertia::render('Admin/Notifications/Index', [
            'subscriberCount' => FcmToken::count(),
            'hasFcmConfig'    => (bool) Setting::where('key', 'fcm_api_key')->whereNotNull('value')->where('value', '!=', '')->first(),
        ]);
    }

    /** Frontend: save FCM token */
    public function saveToken(Request $request)
    {
        $request->validate(['token' => 'required|string']);
        FcmToken::updateOrCreate(
            ['token' => $request->token],
            ['device' => $request->userAgent()]
        );
        return response()->json(['ok' => true]);
    }

    /** Admin: send push notification */
    public function send(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:100',
            'body'    => 'required|string|max:300',
            'url'     => 'nullable|url',
        ]);

        $serverKey = Setting::where('key', 'fcm_server_key')->value('value');
        if (!$serverKey) {
            return back()->withErrors(['error' => 'FCM Server Key not configured. Add it in Settings → Integrations.']);
        }

        $tokens = FcmToken::pluck('token')->toArray();
        if (empty($tokens)) {
            return back()->withErrors(['error' => 'No subscribers yet.']);
        }

        $payload = [
            'registration_ids' => $tokens,
            'notification' => [
                'title' => $request->title,
                'body'  => $request->body,
                'click_action' => $request->url ?? url('/'),
            ],
            'data' => ['url' => $request->url ?? url('/')],
        ];

        $response = Http::withHeaders([
            'Authorization' => 'key=' . $serverKey,
            'Content-Type'  => 'application/json',
        ])->post('https://fcm.googleapis.com/fcm/send', $payload);

        $result = $response->json();
        $success = $result['success'] ?? 0;
        $failure = $result['failure'] ?? 0;

        // Remove invalid tokens
        if ($failure > 0 && isset($result['results'])) {
            $invalidTokens = [];
            foreach ($result['results'] as $i => $r) {
                if (isset($r['error']) && in_array($r['error'], ['NotRegistered', 'InvalidRegistration'])) {
                    $invalidTokens[] = $tokens[$i];
                }
            }
            if ($invalidTokens) FcmToken::whereIn('token', $invalidTokens)->delete();
        }

        return back()->with('success', "Notification sent! {$success} delivered, {$failure} failed.");
    }
}
