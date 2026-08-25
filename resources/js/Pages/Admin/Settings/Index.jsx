import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';

const tabs = [
    { id: 'branding', label: 'Branding', icon: '🎨' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'social', label: 'Social', icon: '🔗' },
    { id: 'integrations', label: 'Integrations', icon: '⚙️' },
];

function InputField({ label, name, value, onChange, type = 'text', placeholder = '', hint = '' }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all font-medium placeholder:text-gray-600"
            />
            {hint && <p className="text-gray-600 text-xs mt-1.5 italic">{hint}</p>}
        </div>
    );
}

function TextareaField({ label, name, value, onChange, placeholder = '', rows = 3 }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
            <textarea
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-isak-primary focus:outline-none transition-all font-medium placeholder:text-gray-600 resize-none"
            />
        </div>
    );
}

function ImageUploadField({ label, name, currentUrl, onChange, hint = '' }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(currentUrl || null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onChange(name, file);
        }
    };

    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
            <div
                onClick={() => inputRef.current?.click()}
                className="relative w-full h-32 rounded-2xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-isak-primary/50 transition-all group overflow-hidden"
            >
                {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-contain p-2" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="text-xs font-medium">Click to upload</span>
                    </div>
                )}
            </div>
            {hint && <p className="text-gray-600 text-xs mt-1.5 italic">{hint}</p>}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
    );
}

export default function Index({ settings: initialSettings }) {
    const [activeTab, setActiveTab] = useState('branding');
    const [s, setS] = useState(initialSettings || {});
    const [files, setFiles] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setS(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFile = (key, file) => {
        setFiles(prev => ({ ...prev, [key]: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        Object.entries(s).forEach(([k, v]) => { if (v != null) formData.append(k, v); });
        Object.entries(files).forEach(([k, v]) => formData.append(k, v));

        router.post(route('admin.settings.update'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setSaving(false);
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            },
            onError: () => setSaving(false),
        });
    };

    return (
        <AuthenticatedLayout header={<span>Settings</span>}>
            <Head title="Settings" />

            <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={handleSubmit}>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 flex-wrap">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-isak-primary text-black shadow-lg shadow-isak-primary/20'
                                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                <span>{tab.icon}</span> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* ── BRANDING ── */}
                    {activeTab === 'branding' && (
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                            <div>
                                <h3 className="text-white text-lg font-medium mb-1">Branding & Identity</h3>
                                <p className="text-gray-500 text-sm">Site name, logo text, and visual identity.</p>
                            </div>
                            <div className="h-px bg-white/5"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Site Title" name="site_title" value={s.site_title} onChange={handleChange} placeholder="Partho | Full Stack Developer" />
                                <InputField label="Site Tagline" name="site_tagline" value={s.site_tagline} onChange={handleChange} placeholder="Building Digital Experiences" />
                                <InputField label="Header Logo Text" name="header_logo_text" value={s.header_logo_text} onChange={handleChange} placeholder="Partho" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ImageUploadField
                                    label="Favicon"
                                    name="favicon_url"
                                    currentUrl={s.favicon_url}
                                    onChange={handleFile}
                                    hint="Recommended: 32×32px or 64×64px PNG/ICO"
                                />
                                <ImageUploadField
                                    label="Social Share Banner (OG Image)"
                                    name="og_image_url"
                                    currentUrl={s.og_image_url}
                                    onChange={handleFile}
                                    hint="Recommended: 1200×630px JPG/PNG"
                                />
                            </div>
                        </div>
                    )}

                    {/* ── SEO ── */}
                    {activeTab === 'seo' && (
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                            <div>
                                <h3 className="text-white text-lg font-medium mb-1">SEO & Meta Tags</h3>
                                <p className="text-gray-500 text-sm">Control how your site appears in search engines and social shares.</p>
                            </div>
                            <div className="h-px bg-white/5"></div>

                            <InputField
                                label="SEO Title"
                                name="seo_title"
                                value={s.seo_title}
                                onChange={handleChange}
                                placeholder="Partho - Full Stack Developer Portfolio"
                                hint="Ideal length: 50–60 characters"
                            />
                            <TextareaField
                                label="Meta Description"
                                name="seo_description"
                                value={s.seo_description}
                                onChange={handleChange}
                                placeholder="Full Stack Developer specializing in Laravel, React..."
                                rows={4}
                            />
                            <TextareaField
                                label="Keywords"
                                name="seo_keywords"
                                value={s.seo_keywords}
                                onChange={handleChange}
                                placeholder="full stack developer, laravel, react, freelance"
                                rows={2}
                            />

                            {/* Character counters */}
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                                <div className={`flex items-center gap-2 ${(s.seo_title?.length || 0) > 60 ? 'text-red-500' : 'text-isak-primary'}`}>
                                    <span className="w-2 h-2 rounded-full bg-current"></span>
                                    SEO Title: {s.seo_title?.length || 0}/60 chars
                                </div>
                                <div className={`flex items-center gap-2 ${(s.seo_description?.length || 0) > 160 ? 'text-red-500' : 'text-isak-primary'}`}>
                                    <span className="w-2 h-2 rounded-full bg-current"></span>
                                    Description: {s.seo_description?.length || 0}/160 chars
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── CONTACT ── */}
                    {activeTab === 'contact' && (
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                            <div>
                                <h3 className="text-white text-lg font-medium mb-1">Contact Information</h3>
                                <p className="text-gray-500 text-sm">Update your contact details shown across the site.</p>
                            </div>
                            <div className="h-px bg-white/5"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Email Address" name="contact_email" value={s.contact_email} onChange={handleChange} placeholder="hello@partho.dev" type="email" />
                                <InputField label="Phone Number" name="contact_phone" value={s.contact_phone} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" />
                                <InputField label="WhatsApp Number" name="contact_whatsapp" value={s.contact_whatsapp} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" />
                                <InputField label="Location / Address" name="contact_address" value={s.contact_address} onChange={handleChange} placeholder="Dhaka, Bangladesh" />
                            </div>
                        </div>
                    )}

                    {/* ── SOCIAL ── */}
                    {activeTab === 'social' && (
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                            <div>
                                <h3 className="text-white text-lg font-medium mb-1">Social Media Links</h3>
                                <p className="text-gray-500 text-sm">Links shown in the profile sidebar and contact section.</p>
                            </div>
                            <div className="h-px bg-white/5"></div>

                            <div className="space-y-4">
                                {[
                                    { key: 'github_url', label: 'GitHub', placeholder: 'https://github.com/yourname', emoji: '🐙' },
                                    { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourname', emoji: '💼' },
                                    { key: 'twitter_url', label: 'Twitter / X', placeholder: 'https://twitter.com/yourname', emoji: '🐦' },
                                    { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/yourname', emoji: '📘' },
                                    { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/yourname', emoji: '📸' },
                                ].map(social => (
                                    <div key={social.key} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
                                            {social.emoji}
                                        </div>
                                        <div className="flex-1">
                                            <InputField
                                                label={social.label}
                                                name={social.key}
                                                value={s[social.key]}
                                                onChange={handleChange}
                                                placeholder={social.placeholder}
                                                type="url"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── INTEGRATIONS ── */}
                    {activeTab === 'integrations' && (
                        <div className="space-y-6">

                            {/* Google */}
                            <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">🔍 Google Integrations</h3>
                                    <p className="text-gray-500 text-sm">Search Console, Analytics & Tag Manager.</p>
                                </div>
                                <div className="h-px bg-white/5"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Google Search Console Verification"
                                        name="google_site_verification"
                                        value={s.google_site_verification}
                                        onChange={handleChange}
                                        placeholder="abc123xyz..."
                                        hint="Only the content value of the meta tag, not the full tag."
                                    />
                                    <InputField
                                        label="Google Tag Manager ID"
                                        name="gtm_id"
                                        value={s.gtm_id}
                                        onChange={handleChange}
                                        placeholder="GTM-XXXXXXX"
                                    />
                                    <InputField
                                        label="Google Analytics 4 Measurement ID"
                                        name="ga4_id"
                                        value={s.ga4_id}
                                        onChange={handleChange}
                                        placeholder="G-XXXXXXXXXX"
                                    />
                                </div>
                            </div>

                            {/* Facebook Pixel */}
                            <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">📘 Facebook Pixel</h3>
                                    <p className="text-gray-500 text-sm">Track visitors and conversion events.</p>
                                </div>
                                <div className="h-px bg-white/5"></div>
                                <InputField
                                    label="Facebook Pixel ID"
                                    name="fb_pixel_id"
                                    value={s.fb_pixel_id}
                                    onChange={handleChange}
                                    placeholder="123456789012345"
                                />
                            </div>

                            {/* Firebase Cloud Messaging */}
                            <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">🔔 Firebase Cloud Messaging</h3>
                                    <p className="text-gray-500 text-sm">Push notifications via Firebase. Get these values from your Firebase project console → Project Settings → Web app.</p>
                                </div>
                                <div className="h-px bg-white/5"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="API Key" name="fcm_api_key" value={s.fcm_api_key} onChange={handleChange} placeholder="AIzaSy..." />
                                    <InputField label="Auth Domain" name="fcm_auth_domain" value={s.fcm_auth_domain} onChange={handleChange} placeholder="your-app.firebaseapp.com" />
                                    <InputField label="Project ID" name="fcm_project_id" value={s.fcm_project_id} onChange={handleChange} placeholder="your-app-id" />
                                    <InputField label="Messaging Sender ID" name="fcm_messaging_sender_id" value={s.fcm_messaging_sender_id} onChange={handleChange} placeholder="123456789" />
                                    <InputField label="App ID" name="fcm_app_id" value={s.fcm_app_id} onChange={handleChange} placeholder="1:123:web:abc" />
                                    <InputField
                                        label="VAPID Key (Public)"
                                        name="fcm_vapid_key"
                                        value={s.fcm_vapid_key}
                                        onChange={handleChange}
                                        placeholder="BL..."
                                        hint="Found in Firebase Console → Project Settings → Cloud Messaging → Web Push certificates"
                                    />
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                                    💡 After saving, go to <strong>Notifications</strong> in the sidebar to send push notifications to your subscribers.
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`px-14 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-500 flex items-center gap-3 shadow-xl ${saved
                                ? 'bg-green-500 text-white shadow-green-500/20'
                                : 'bg-isak-primary text-black hover:scale-105 shadow-isak-primary/20 disabled:opacity-50'
                                }`}
                        >
                            {saving ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : saved ? (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save All Settings
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
