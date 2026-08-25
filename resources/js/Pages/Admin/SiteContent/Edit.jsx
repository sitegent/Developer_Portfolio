import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ siteContent }) {
    const { data, setData, post, processing, errors } = useForm({
        key: siteContent.key,
        value: siteContent.value || '',
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        // Use post() with _method: 'put' because browsers/Inertia cannot handle files over PUT natively.
        post(route('admin.site-content.update', siteContent.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.site-content.index')}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <span>Edit Key: {siteContent.key}</span>
                </div>
            }
        >
            <Head title={`Edit ${siteContent.key}`} />

            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={submit} className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-8">

                    <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Configuration Key *</label>
                        <input
                            type="text"
                            value={data.key}
                            onChange={e => setData('key', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-isak-primary/50 focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-mono opacity-80"
                            placeholder="e.g. hero_headline_bold"
                            disabled
                        />
                        <p className="text-gray-600 text-xs mt-2 italic">Keys are internal identifiers and cannot be renamed once created.</p>
                        {errors.key && <div className="text-red-500 text-sm mt-2">{errors.key}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Value Content</label>
                        {data.key.endsWith('_image') || data.key.endsWith('_url') && data.key.includes('image') || data.key === 'profile_image_url' ? (
                            <div className="space-y-4">
                                {data.value && typeof data.value === 'string' && (
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                                        <img src={data.value} alt="Current configuration value" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={e => setData('value', e.target.files[0])}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-isak-primary/10 file:text-isak-primary hover:file:bg-isak-primary/20"
                                    accept="image/*"
                                />
                            </div>
                        ) : (
                            <textarea
                                value={data.value}
                                onChange={e => setData('value', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium min-h-[200px]"
                                placeholder="Enter the text or HTML content for this key."
                            ></textarea>
                        )}
                        {errors.value && <div className="text-red-500 text-sm mt-2">{errors.value}</div>}
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Link
                            href={route('admin.site-content.index')}
                            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-base"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-12 py-4 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-all text-base shadow-lg shadow-isak-primary/20 disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Content'}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
