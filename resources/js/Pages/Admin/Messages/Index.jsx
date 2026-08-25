import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useCallback } from 'react';

export default function Index({ messages }) {
    const loaderRef = useRef(null);

    const loadMore = useCallback(() => {
        if (messages.next_page_url) {
            router.get(messages.next_page_url, {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['messages'],
                replace: true,
            });
        }
    }, [messages.next_page_url]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadMore(); },
            { threshold: 0.5 }
        );
        const el = loaderRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [loadMore]);

    const items = messages.data || [];

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center justify-between w-full">
                <span>Messages Inbox</span>
            </div>
        }>
            <Head title="Messages Inbox" />

            <div className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
                    <div>
                        <h3 className="text-xl font-medium text-white tracking-tight">Recent Inquiries</h3>
                        <p className="text-gray-500 text-sm mt-1">Manage your hire requests and contact form submissions.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sender</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Communication</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Received At</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {items.length > 0 ? items.map((msg) => (
                                <tr key={msg.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-isak-primary/10 flex items-center justify-center text-isak-primary font-bold shrink-0">
                                                {msg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium group-hover:text-isak-primary transition-colors">{msg.name}</p>
                                                <p className="text-gray-500 text-xs truncate max-w-[150px]">{msg.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm text-gray-300">{msg.email}</span>
                                            </div>
                                            {msg.whatsapp && (
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-400">{msg.whatsapp}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 text-sm">
                                        {new Date(msg.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link href={route('admin.messages.show', msg.id)} className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-isak-primary/50 transition-all" title="View Details">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                            <Link href={route('admin.messages.destroy', msg.id)} method="delete" as="button" className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all" title="Delete Message">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-24 text-center">
                                        <p className="text-gray-500 italic">Your inbox is currently empty.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Infinite scroll sentinel */}
                {items.length > 0 && (
                    <div ref={loaderRef} className="p-6 text-center border-t border-white/5">
                        {messages.next_page_url ? (
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Loading more...
                            </div>
                        ) : (
                            <p className="text-gray-700 text-sm italic">All {messages.total} messages loaded ✓</p>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
