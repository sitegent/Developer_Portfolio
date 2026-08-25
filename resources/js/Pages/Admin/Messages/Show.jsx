import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ message }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.messages.index')}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <span>Message Details</span>
                </div>
            }
        >
            <Head title={`Message from ${message.name}`} />

            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Contact Info Card */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-isak-primary/10 flex items-center justify-center text-isak-primary text-3xl font-bold">
                                {message.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">{message.name}</h1>
                                <p className="text-gray-500">{message.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {message.whatsapp && (
                                <a
                                    href={`https://wa.me/${message.whatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-medium"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            )}
                            <a
                                href={`mailto:${message.email}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium"
                            >
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Reply via Email
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-1">WhatsApp / Phone</p>
                            <p className="text-white text-lg">{message.whatsapp || 'Not provided'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-1">Received On</p>
                            <p className="text-white text-lg">
                                {new Date(message.created_at).toLocaleString(undefined, {
                                    dateStyle: 'full',
                                    timeStyle: 'short'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Message Content */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 p-8">
                    <h3 className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-4">Project Inquiry / Message</h3>
                    <div className="bg-white/2 rounded-2xl p-6 border border-white/5">
                        <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                            {message.work_info || 'No details provided.'}
                        </p>
                    </div>
                </div>

                {/* Attachment Card */}
                <div className="bg-[#161616] rounded-3xl border border-white/5 p-8">
                    <h3 className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-4">Attachment</h3>
                    {message.attached_file ? (
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-isak-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-isak-primary/10 flex items-center justify-center text-isak-primary">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Project File</p>
                                    <p className="text-gray-500 text-xs">Click to view or download</p>
                                </div>
                            </div>
                            <a
                                href={`/storage/${message.attached_file}`}
                                target="_blank"
                                className="px-6 py-2 bg-isak-primary text-black font-bold rounded-xl hover:scale-105 transition-transform"
                            >
                                Open File
                            </a>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 text-gray-600 italic">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            No file attached to this message.
                        </div>
                    )}
                </div>

                {/* Danger Zone */}
                <div className="pt-8 flex justify-end">
                    <Link
                        href={route('admin.messages.destroy', message.id)}
                        method="delete"
                        as="button"
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Permanently
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
