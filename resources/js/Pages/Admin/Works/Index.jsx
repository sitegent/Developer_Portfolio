import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useCallback } from 'react';

export default function Index({ works }) {
    const loaderRef = useRef(null);

    const loadMore = useCallback(() => {
        if (works.next_page_url) {
            router.get(works.next_page_url, {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['works'],
                replace: true,
            });
        }
    }, [works.next_page_url]);

    // IntersectionObserver — auto-load next page when sentinel enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadMore(); },
            { threshold: 0.5 }
        );
        const el = loaderRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [loadMore]);

    const items = works.data || [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <Link
                        href={route('admin.works.create')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-transform text-base shadow-lg shadow-isak-primary/20"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Project
                    </Link>
                </div>
            }
        >
            <Head title="Portfolio Projects" />

            <div className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24 text-center">Preview</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Details</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tech Stack</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {items.length > 0 ? items.map((work) => (
                                <tr key={work.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-isak-primary/30 transition-all">
                                            {work.image ? (
                                                <img src={`/storage/${work.image}`} alt={work.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-700">
                                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-white font-bold text-lg group-hover:text-isak-primary transition-colors">{work.title}</p>
                                        <p className="text-gray-500 text-sm mt-1 truncate max-w-xs">{work.subtitle || 'Personal Portfolio Project'}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            {work.tech_stack?.split(',').map((tech, i) => (
                                                <span key={i} className="px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">{tech.trim()}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link href={route('admin.works.edit', work.id)} className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-isak-primary/50 transition-all" title="Edit Project">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </Link>
                                            <Link href={route('admin.works.destroy', work.id)} method="delete" as="button" className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all" title="Delete Project">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-24 text-center">
                                        <p className="text-gray-500 italic">No projects found in portfolio.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Infinite scroll sentinel + status */}
                {items.length > 0 && (
                    <div ref={loaderRef} className="p-6 text-center border-t border-white/5">
                        {works.next_page_url ? (
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Loading more...
                            </div>
                        ) : (
                            <p className="text-gray-700 text-sm italic">All {works.total} projects loaded ✓</p>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
