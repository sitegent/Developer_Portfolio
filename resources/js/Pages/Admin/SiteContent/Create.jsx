import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        key: '',
        value: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.site-content.store'));
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
                    <span>Create Configuration Key</span>
                </div>
            }
        >
            <Head title="Create Site Content" />

            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={submit} className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-8">

                    <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Configuration Key *</label>
                        <input
                            type="text"
                            value={data.key}
                            onChange={e => setData('key', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-isak-primary focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-mono"
                            placeholder="e.g. hero_headline_bold"
                        />
                        <p className="text-gray-600 text-xs mt-2 italic">Lowercase, underscores, used internally to fetch content.</p>
                        {errors.key && <div className="text-red-500 text-sm mt-2">{errors.key}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Value Content</label>
                        <textarea
                            value={data.value}
                            onChange={e => setData('value', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium min-h-[200px]"
                            placeholder="Enter the text or HTML content for this key."
                        ></textarea>
                        {errors.value && <div className="text-red-500 text-sm mt-2">{errors.value}</div>}
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Link
                            href={route('site-content.index')}
                            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-base"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-12 py-4 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-all text-base shadow-lg shadow-isak-primary/20 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Create Key'}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
