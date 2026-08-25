import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        icon: null,
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!data.icon) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.icon);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [data.icon]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.services.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.services.index')}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <span>Define New Service</span>
                </div>
            }
        >
            <Head title="Add New Service" />

            <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Service Title *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium text-lg"
                                    placeholder="e.g. Branded Ecommerce"
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-2">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Service Description *</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium min-h-[200px]"
                                    placeholder="Describe what this service entails and how it helps clients."
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-sm mt-2">{errors.description}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Service Icon (SVG/PNG)</label>

                            <div className="relative group">
                                <div className={`aspect-square rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-isak-primary/50 ${preview ? 'bg-black' : 'bg-white/2'}`}>
                                    {preview ? (
                                        <img src={preview} alt="Icon Preview" className="w-full h-full object-contain p-8" />
                                    ) : (
                                        <div className="text-center p-6">
                                            <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-500 text-sm font-medium">Click to upload icon</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={e => setData('icon', e.target.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/svg+xml,image/png,image/jpeg"
                                    />
                                </div>
                                {preview && (
                                    <button
                                        type="button"
                                        onClick={() => setData('icon', null)}
                                        className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-600 text-xs mt-4 leading-relaxed font-body">
                                Best results with SVGs or transparent PNGs. Max size 2MB.
                            </p>
                            {errors.icon && <div className="text-red-500 text-sm mt-2">{errors.icon}</div>}
                        </div>

                        <div className="pt-4 space-y-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl bg-isak-primary text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all text-lg shadow-lg shadow-isak-primary/20 disabled:opacity-50"
                            >
                                {processing ? 'Creating Service...' : 'Publish Service'}
                            </button>
                            <Link
                                href={route('admin.services.index')}
                                className="w-full block text-center py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-base"
                            >
                                Cancel & Back
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
