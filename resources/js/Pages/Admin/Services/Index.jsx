import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ services }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <Link
                        href={route('admin.services.create')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-transform text-base shadow-lg shadow-isak-primary/20"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Service
                    </Link>
                </div>
            }
        >
            <Head title="Services CMS" />

            <div className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20 text-center">Icon</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Title</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description Snippet</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {services.length > 0 ? services.map((service) => (
                                <tr key={service.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="w-12 h-12 rounded-xl bg-isak-primary/10 flex items-center justify-center text-isak-primary group-hover:scale-110 transition-transform overflow-hidden">
                                            {service.icon ? (
                                                service.icon.startsWith('services/') ? (
                                                    <img src={`/storage/${service.icon}`} alt={service.title} className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <div dangerouslySetInnerHTML={{ __html: service.icon }} className="w-6 h-6" />
                                                )
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-white font-bold text-lg group-hover:text-isak-primary transition-colors">{service.title}</p>
                                    </td>
                                    <td className="px-8 py-6 max-w-md">
                                        <p className="text-gray-500 text-sm line-clamp-2">{service.description}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={route('admin.services.edit', service.id)}
                                                className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-isak-primary/50 transition-all"
                                                title="Edit Service"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={route('admin.services.destroy', service.id)}
                                                method="delete"
                                                as="button"
                                                className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                                                title="Delete Service"
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
                                    <td colSpan="4" className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 italic">No services listed yet.</p>
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
