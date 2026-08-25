import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

function ExperienceRow({ exp, onDelete }) {
    const { data, setData, put, processing, errors } = useForm({
        year: exp.year,
        role: exp.role,
        company: exp.company,
        description: exp.description || '',
        sort_order: exp.sort_order ?? 0,
    });
    const [editing, setEditing] = useState(false);

    const save = (e) => {
        e.preventDefault();
        put(route('admin.experiences.update', exp.id), {
            onSuccess: () => setEditing(false),
        });
    };

    if (editing) {
        return (
            <form onSubmit={save} className="p-6 border border-isak-primary/30 rounded-2xl bg-isak-primary/5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Year / Period</label>
                        <input value={data.year} onChange={e => setData('year', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-isak-primary focus:outline-none"
                            placeholder="2023 - Present" />
                        {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Role / Position *</label>
                        <input value={data.role} onChange={e => setData('role', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-isak-primary focus:outline-none"
                            placeholder="Full Stack Developer" />
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Company / Client *</label>
                        <input value={data.company} onChange={e => setData('company', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-isak-primary focus:outline-none"
                            placeholder="Freelance" />
                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Description (Optional)</label>
                    <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-isak-primary focus:outline-none resize-none"
                        placeholder="Brief description of responsibilities..." />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Order</label>
                        <input type="number" value={data.sort_order} onChange={e => setData('sort_order', e.target.value)}
                            className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-isak-primary focus:outline-none" min="0" />
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setEditing(false)} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white text-sm transition-all">Cancel</button>
                        <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl bg-isak-primary text-black font-bold text-sm hover:scale-105 transition-all disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    return (
        <div className="flex items-center gap-6 px-8 py-5 hover:bg-white/2 transition-colors group">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                <span className="text-isak-textMuted text-sm font-light tracking-widest uppercase">{exp.year}</span>
                <span className="text-white font-medium">{exp.role}</span>
                <span className="text-isak-textMuted">{exp.company}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => setEditing(true)} className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-isak-primary/50 transition-all" title="Edit">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <Link href={route('admin.experiences.destroy', exp.id)} method="delete" as="button"
                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all" title="Delete">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </Link>
            </div>
        </div>
    );
}

export default function Index({ experiences }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        year: '',
        role: '',
        company: '',
        description: '',
        sort_order: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.experiences.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center justify-between w-full">
                <span>Experience</span>
            </div>
        }>
            <Head title="Experience" />

            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Add Form */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 p-8">
                    <h3 className="text-white text-lg font-medium mb-6">Add New Experience</h3>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Year / Period *</label>
                                <input value={data.year} onChange={e => setData('year', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                    placeholder="2023 - Present" />
                                {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Role / Position *</label>
                                <input value={data.role} onChange={e => setData('role', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                    placeholder="Full Stack Developer" />
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Company / Client *</label>
                                <input value={data.company} onChange={e => setData('company', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                    placeholder="Freelance" />
                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description (Optional)</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={2}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all resize-none"
                                placeholder="Brief description of responsibilities and achievements..." />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Display Order</label>
                                <input type="number" value={data.sort_order} onChange={e => setData('sort_order', e.target.value)}
                                    className="w-24 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-isak-primary focus:outline-none" min="0" />
                            </div>
                            <button type="submit" disabled={processing}
                                className="px-10 py-4 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-lg shadow-isak-primary/20 disabled:opacity-50">
                                {processing ? 'Adding...' : '+ Add Experience'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Experience List */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5">
                        <h3 className="text-white text-lg font-medium">Experience Entries</h3>
                        <p className="text-gray-500 text-sm mt-1">Hover a row to edit or delete. Drag to reorder via Display Order number.</p>
                    </div>

                    {experiences.length === 0 ? (
                        <div className="p-16 text-center">
                            <p className="text-gray-600 italic">No experience entries yet. Add your first above.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5 px-2 py-2 space-y-2">
                            {experiences.map(exp => (
                                <ExperienceRow key={exp.id} exp={exp} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
