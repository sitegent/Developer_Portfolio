<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => Experience::orderBy('sort_order')->orderByDesc('id')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year'    => 'required|string|max:50',
            'role'    => 'required|string|max:150',
            'company' => 'required|string|max:150',
        ]);

        Experience::create($request->only(['year', 'role', 'company', 'description', 'sort_order']));

        return redirect()->route('admin.experiences.index')->with('success', 'Experience added.');
    }

    public function update(Request $request, Experience $experience)
    {
        $request->validate([
            'year'    => 'required|string|max:50',
            'role'    => 'required|string|max:150',
            'company' => 'required|string|max:150',
        ]);

        $experience->update($request->only(['year', 'role', 'company', 'description', 'sort_order']));

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted.');
    }
}
