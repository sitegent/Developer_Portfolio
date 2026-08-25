import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ subscriberCount, hasFcmConfig }) {
    const { data, setData, post, processing, errors, wasSuccessful, recentlySuccessful } = useForm({
        title: '',
        body: '',
        url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.notifications.send'), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout header={<span>Push Notifications</span>}>
            <Head title="Push Notifications" />

            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Status Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-[#161616] p-6 rounded-3xl border border-white/5">
                        <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-2">Total Subscribers</p>
                        <p className="text-4xl font-bold text-isak-primary">{subscriberCount}</p>
                        <p className="text-gray-600 text-xs mt-2">Visitors who allowed push notifications</p>
                    </div>
                    <div className={`p-6 rounded-3xl border ${hasFcmConfig ? 'bg-isak-primary/5 border-isak-primary/30' : 'bg-red-500/5 border-red-500/30'}`}>
                        <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-2">FCM Status</p>
                        <div className={`flex items-center gap-2 text-xl font-bold ${hasFcmConfig ? 'text-isak-primary' : 'text-red-400'}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${hasFcmConfig ? 'bg-isak-primary animate-pulse' : 'bg-red-400'}`}></span>
                            {hasFcmConfig ? 'Configured' : 'Not Configured'}
                        </div>
                        {!hasFcmConfig && (
                            <Link href={route('admin.settings.index')} className="text-xs text-red-400 mt-2 block hover:text-red-300 underline">
                                → Add Firebase config in Settings → Integrations
                            </Link>
                        )}
                    </div>
                </div>

                {/* Send Notification */}
                <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                    <div>
                        <h3 className="text-white text-lg font-medium mb-1">🔔 Send Push Notification</h3>
                        <p className="text-gray-500 text-sm">Broadcast a notification to all {subscriberCount} subscriber(s).</p>
                    </div>
                    <div className="h-px bg-white/5"></div>

                    {errors.error && (
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {errors.error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Notification Title *</label>
                            <input
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                placeholder="Hey! Check this out 🚀"
                                maxLength={100}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message Body *</label>
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all resize-none"
                                placeholder="New project just published! Click to see the details."
                                maxLength={300}
                            />
                            <p className="text-gray-600 text-xs mt-1 text-right">{data.body.length}/300</p>
                            {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Click URL (Optional)</label>
                            <input
                                value={data.url}
                                onChange={e => setData('url', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all"
                                placeholder="https://yoursite.com/works"
                                type="url"
                            />
                        </div>

                        {/* Preview */}
                        {(data.title || data.body) && (
                            <div className="p-4 rounded-2xl bg-white/3 border border-white/10">
                                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-bold">Preview</p>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-isak-primary/20 flex items-center justify-center text-lg shrink-0">🔔</div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{data.title || 'Title...'}</p>
                                        <p className="text-gray-400 text-xs mt-0.5">{data.body || 'Message body...'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing || !hasFcmConfig || subscriberCount === 0}
                            className="w-full py-4 rounded-2xl bg-isak-primary text-black font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-isak-primary/20 disabled:opacity-40 disabled:hover:scale-100"
                        >
                            {processing ? 'Sending...' : `Send to ${subscriberCount} Subscriber${subscriberCount !== 1 ? 's' : ''}`}
                        </button>
                    </form>
                </div>

                {/* FCM Server Key reminder */}
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-300 text-sm space-y-1">
                    <p className="font-bold">⚠️ Important: Also add your FCM Server Key</p>
                    <p className="text-yellow-400/70 text-xs">Go to Settings → Integrations and add the <strong>FCM Server Key</strong> (found in Firebase Console → Project Settings → Cloud Messaging → Server key). This is required to send notifications.</p>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
