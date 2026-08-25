import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ siteContents }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <Link
                        href={route('admin.site-content.create')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-transform text-base shadow-lg shadow-isak-primary/20"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Key
                    </Link>
                </div>
            }
        >
            <Head title="Site Content CMS" />

            <div className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-8 border-b border-white/5 bg-white/2">
                    <h3 className="text-xl font-medium text-white tracking-tight">Configuration Keys</h3>
                    <p className="text-gray-500 text-sm mt-1">Manage text content, hero sections, and global identifiers.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Internal Key</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Value</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {siteContents.length > 0 ? siteContents.map((content) => (
                                <tr key={content.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-isak-primary/30"></div>
                                            <p className="text-isak-primary font-mono text-sm">{content.key}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 max-w-xl">
                                        <p className="text-gray-400 text-sm line-clamp-2 italic">
                                            {content.value || <span className="text-gray-700 font-normal">No value set</span>}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={route('admin.site-content.edit', content.id)}
                                                className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-isak-primary/50 transition-all"
                                                title="Edit Content"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={route('admin.site-content.destroy', content.id)}
                                                method="delete"
                                                as="button"
                                                className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                                                title="Delete Key"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 italic">No configuration keys found.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
