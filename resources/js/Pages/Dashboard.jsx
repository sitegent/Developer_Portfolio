import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentMessages }) {
    const statCards = [
        {
            name: 'Total Works',
            value: stats.works,
            icon: (
                <svg className="w-8 h-8 text-isak-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
            color: 'bg-isak-primary/10'
        },
        {
            name: 'Active Services',
            value: stats.services,
            icon: (
                <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-blue-400/10'
        },
        {
            name: 'Messages Received',
            value: stats.messages,
            icon: (
                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 5-8-5" />
                </svg>
            ),
            color: 'bg-purple-400/10'
        },
        {
            name: 'Content Blocks',
            value: stats.content,
            icon: (
                <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: 'bg-orange-400/10'
        },
    ];

    return (
        <AuthenticatedLayout
            header="Dashboard"
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat) => (
                        <div key={stat.name} className="bg-[#161616] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                            </div>
                            <p className="text-gray-500 font-medium">{stat.name}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Messages */}
                    <div className="lg:col-span-2 bg-[#161616] rounded-3xl border border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-medium text-white tracking-tight">Recent Messages</h3>
                            <Link href={route('admin.messages.index')} className="text-isak-primary text-sm hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="divide-y divide-white/5">
                            {recentMessages.length > 0 ? recentMessages.map((msg) => {
                                const timeAgo = (() => {
                                    const diff = Math.floor((Date.now() - new Date(msg.created_at)) / 1000);
                                    if (diff < 60) return `${diff}s ago`;
                                    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
                                    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
                                    return `${Math.floor(diff / 86400)}d ago`;
                                })();
                                return (
                                    <div key={msg.id} className="flex items-start gap-4 p-5 hover:bg-white/2 transition-colors group">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-400 font-bold text-sm shrink-0 uppercase">
                                            {msg.name?.charAt(0) || '?'}
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-0.5">
                                                <span className="text-white font-medium truncate">{msg.name}</span>
                                                <span className="text-gray-600 text-xs shrink-0">{timeAgo}</span>
                                            </div>
                                            <p className="text-gray-500 text-xs mb-1 truncate">{msg.email}</p>
                                            <p className="text-gray-400 text-sm truncate">
                                                {msg.message?.substring(0, 80)}{msg.message?.length > 80 ? '...' : ''}
                                            </p>
                                        </div>
                                        {/* View link */}
                                        <Link
                                            href={route('admin.messages.show', msg.id)}
                                            className="opacity-0 group-hover:opacity-100 shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            View
                                        </Link>
                                    </div>
                                );
                            }) : (
                                <div className="p-12 text-center text-gray-600 italic">
                                    No messages yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-[#161616] p-6 rounded-3xl border border-white/5">
                            <h3 className="text-xl font-medium text-white tracking-tight mb-6">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('admin.works.create')}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-isak-primary/5 border border-isak-primary/20 hover:bg-isak-primary/10 transition-all text-isak-primary text-left"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="font-medium">Add New Project</span>
                                </Link>
                                <Link
                                    href={route('admin.services.create')}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all text-white text-left"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="font-medium">Add New Service</span>
                                </Link>
                                <Link
                                    href={route('admin.site-content.index')}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all text-white text-left"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span className="font-medium">Edit Home Hero</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
