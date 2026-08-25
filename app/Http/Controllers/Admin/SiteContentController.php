<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteContentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SiteContent/Index', [
            'siteContents' => SiteContent::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/SiteContent/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:site_contents',
            'value' => 'nullable|string',
        ]);

        SiteContent::create($validated);

        return redirect()->route('admin.site-content.index')->with('success', 'Content created successfully.');
    }

    public function edit(SiteContent $siteContent)
    {
        return Inertia::render('Admin/SiteContent/Edit', [
            'siteContent' => $siteContent
        ]);
    }

    public function update(Request $request, SiteContent $siteContent)
    {
        $rules = [
            'key' => 'required|string|unique:site_contents,key,' . $siteContent->id,
        ];

        // Determine validation rules based on if a file or string was submitted
        if ($request->hasFile('value')) {
            $rules['value'] = 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048';
        } else {
            $rules['value'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        // Handle file upload if present
        if ($request->hasFile('value')) {
            $file = $request->file('value');
            $path = $file->store('site-contents', 'public');
            $validated['value'] = '/storage/' . $path;
        }

        $siteContent->update($validated);

        return redirect()->route('admin.site-content.index')->with('success', 'Content updated successfully.');
    }

    public function destroy(SiteContent $siteContent)
    {
        $siteContent->delete();
        return redirect()->route('admin.site-content.index')->with('success', 'Content deleted successfully.');
    }
}
