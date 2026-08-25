<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SiteContent;
use App\Models\Service;
use App\Models\Work;
use App\Models\Setting;
use App\Models\Message;
use App\Models\Brand;
use App\Models\Experience;

class FrontendController extends Controller
{
    private function getSettings()
    {
        return Setting::all();
    }

    /**
     * Get all site content as a key => value array for easy frontend use.
     */
    private function getCms(): array
    {
        return SiteContent::all()->pluck('value', 'key')->toArray();
    }

    public function home()
    {
        return Inertia::render('Frontend/Home', [
            'cms'      => $this->getCms(),
            'settings' => $this->getSettings(),
            'brands'   => Brand::orderBy('sort_order')->get()
        ]);
    }

    public function about()
    {
        return Inertia::render('Frontend/About', [
            'cms'         => $this->getCms(),
            'settings'    => $this->getSettings(),
            'experiences' => Experience::orderBy('sort_order')->orderByDesc('id')->get()
        ]);
    }

    public function services()
    {
        return Inertia::render('Frontend/Services', [
            'services' => Service::all(),
            'cms'      => $this->getCms(),
            'settings' => $this->getSettings()
        ]);
    }

    public function works()
    {
        return Inertia::render('Frontend/Works', [
            'works'    => Work::latest()->get(),
            'cms'      => $this->getCms(),
            'settings' => $this->getSettings()
        ]);
    }

    public function contact()
    {
        return Inertia::render('Frontend/Contact', [
            'cms'      => $this->getCms(),
            'settings' => $this->getSettings()
        ]);
    }

    public function storeHire(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|max:255',
            'whatsapp'      => 'nullable|string|max:255',
            'work_info'     => 'required|string',
            'attached_file' => 'nullable|file|max:10240',
        ]);

        if ($request->hasFile('attached_file')) {
            $path = $request->file('attached_file')->store('attachments', 'public');
            $validated['attached_file'] = $path;
        }

        Message::create($validated);

        return redirect()->back()->with('success', 'Request sent successfully!');
    }
}
