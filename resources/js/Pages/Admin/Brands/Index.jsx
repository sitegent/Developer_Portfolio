import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Index({ brands }) {
    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        logo: null,
        sort_order: 0,
    });

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.brands.store'), {
            forceFormData: true,
            onSuccess: () => { reset(); setPreview(null); },
        });
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center justify-between w-full">
                <span>Brand Logos</span>
            </div>
        }>
            <Head title="Brand Logos" />

            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Add Form */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 p-8">
                    <h3 className="text-white text-lg font-medium mb-6">Add New Brand</h3>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Brand / Client Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Google"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Display Order</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Logo Image (Optional)</label>
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="w-full h-28 rounded-2xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-isak-primary/50 transition-all group overflow-hidden"
                            >
                                {preview ? (
                                    <img src={preview} alt="preview" className="h-20 object-contain p-2" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        <span className="text-xs">Click to upload logo (PNG/SVG recommended)</span>
                                    </div>
                                )}
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                            <p className="text-gray-600 text-xs mt-1.5 italic">If no logo uploaded, the brand name will display as text in the slider.</p>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" disabled={processing}
                                className="px-10 py-4 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-lg shadow-isak-primary/20 disabled:opacity-50">
                                {processing ? 'Adding...' : '+ Add Brand'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Current Brands Grid */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5">
                        <h3 className="text-white text-lg font-medium">Current Brands in Slider</h3>
                        <p className="text-gray-500 text-sm mt-1">These will appear in the infinite marquee on the homepage.</p>
                    </div>

                    {brands.length === 0 ? (
                        <div className="p-16 text-center">
                            <p className="text-gray-600 italic">No brands yet. Add your first brand above.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {brands.map(brand => (
                                <div key={brand.id} className="flex items-center gap-6 px-8 py-5 hover:bg-white/2 transition-colors group">
                                    {/* Logo / Name Preview */}
                                    <div className="w-20 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                        {brand.logo_url ? (
                                            <img src={brand.logo_url} alt={brand.name} className="h-10 object-contain p-1" />
                                        ) : (
                                            <span className="text-white font-bold text-sm truncate px-2">{brand.name}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium group-hover:text-isak-primary transition-colors truncate">{brand.name}</p>
                                        <p className="text-gray-600 text-xs mt-0.5">
                                            {brand.logo_url ? '🖼 Has logo image' : '📝 Text only'} · Order: {brand.sort_order}
                                        </p>
                                    </div>

                                    <Link
                                        href={route('admin.brands.destroy', brand.id)}
                                        method="delete"
                                        as="button"
                                        className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-red-500 hover:border-red-500/50 transition-all opacity-0 group-hover:opacity-100"
                                        title="Remove brand"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Live Preview */}
                {brands.length > 0 && (
                    <div className="bg-[#161616] rounded-3xl border border-white/5 p-8">
                        <h3 className="text-white text-lg font-medium mb-6">Slider Preview</h3>
                        <div className="w-full overflow-hidden relative rounded-2xl bg-black/30 py-6 px-4">
                            <div className="flex gap-12 items-center opacity-60 flex-wrap">
                                {brands.map(brand => (
                                    brand.logo_url ? (
                                        <img key={brand.id} src={brand.logo_url} alt={brand.name} className="h-8 object-contain grayscale" />
                                    ) : (
                                        <span key={brand.id} className="text-white font-bold text-xl italic">{brand.name}</span>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
