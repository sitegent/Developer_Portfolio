<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Brands/Index', [
            'brands' => Brand::orderBy('sort_order')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:100']);

        $data = ['name' => $request->name, 'sort_order' => $request->sort_order ?? 0];

        if ($request->hasFile('logo')) {
            $data['logo_url'] = '/storage/' . $request->file('logo')->store('brands', 'public');
        }

        Brand::create($data);

        return redirect()->route('admin.brands.index')->with('success', 'Brand added.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return redirect()->route('admin.brands.index')->with('success', 'Brand removed.');
    }
}
