import IsakLayout from '@/Layouts/IsakLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SocialIcon = ({ href, label, children }) => {
    if (!href || href === '#') return null;
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:text-isak-primary hover:bg-white/10 transition-all duration-300"
            aria-label={label}>
            {children}
        </motion.a>
    );
};

export default function Contact({ cms }) {
    const { settings } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', whatsapp: '', work_info: '',
    });
    const [isSent, setIsSent] = useState(false);

    const getSetting = (key, fallback = '') => settings?.find(s => s.key === key)?.value || fallback;

    const email = getSetting('contact_email', 'hello@partho.dev');
    const phone = getSetting('contact_phone', '');
    const githubUrl = getSetting('github_url');
    const linkedinUrl = getSetting('linkedin_url');
    const twitterUrl = getSetting('twitter_url');
    const facebookUrl = getSetting('facebook_url');
    const instaUrl = getSetting('instagram_url');

    const submit = (e) => {
        e.preventDefault();
        post(route('hire.store'), {
            preserveScroll: true,
            onSuccess: () => { reset(); setIsSent(true); setTimeout(() => setIsSent(false), 5000); }
        });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <IsakLayout title="Contact">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full min-h-[calc(100vh-100px)] lg:py-16"
            >

                {/* Header */}
                <motion.div variants={itemVariants} className="mb-12 md:mb-20">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tighter mb-6 text-white leading-[1]">
                        {cms?.contact_heading || "Let's start a project together"}
                    </h2>
                    {cms?.contact_subheading && (
                        <p className="text-lg md:text-xl text-isak-textMuted max-w-xl leading-relaxed font-body font-light">
                            {cms.contact_subheading}
                        </p>
                    )}
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

                    {/* Left — Contact Info + Social */}
                    <motion.div variants={itemVariants} className="md:w-1/3 flex flex-col gap-10">
                        <motion.div variants={itemVariants}>
                            <span className="text-isak-textMuted font-body text-xs md:text-sm uppercase tracking-widest block mb-3">Drop a line</span>
                            <a href={`mailto:${email}`} className="text-xl md:text-2xl font-medium text-white hover:text-isak-primary transition-colors block truncate">
                                {email}
                            </a>
                        </motion.div>
                        {phone && (
                            <motion.div variants={itemVariants}>
                                <span className="text-isak-textMuted font-body text-xs md:text-sm uppercase tracking-widest block mb-3">Call me</span>
                                <a href={`tel:${phone}`} className="text-xl md:text-2xl font-medium text-white hover:text-isak-primary transition-colors block truncate">
                                    {phone}
                                </a>
                            </motion.div>
                        )}

                        {/* Socials */}
                        <motion.div variants={itemVariants}>
                            <span className="text-isak-textMuted font-body text-xs md:text-sm uppercase tracking-widest block mb-4">Find me on</span>
                            <motion.div
                                variants={containerVariants}
                                className="flex flex-wrap gap-3"
                            >
                                <SocialIcon href={githubUrl} label="GitHub">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                </SocialIcon>
                                <SocialIcon href={linkedinUrl} label="LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </SocialIcon>
                                <SocialIcon href={twitterUrl} label="Twitter/X">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.126H5.078z" /></svg>
                                </SocialIcon>
                                <SocialIcon href={facebookUrl} label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </SocialIcon>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div variants={itemVariants} className="md:w-2/3 flex flex-col gap-12">

                        {isSent && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-isak-primary/10 border border-isak-primary text-white font-body px-6 py-4 rounded-2xl flex items-center gap-4"
                            >
                                <svg className="w-6 h-6 text-isak-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Your message has been sent successfully. I will get back to you soon.
                            </motion.div>
                        )}

                        <form onSubmit={submit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.div variants={itemVariants} className="relative group">
                                    <input type="text" id="name" value={data.name} onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-4 text-white text-xl focus:ring-0 focus:border-isak-primary peer transition-colors font-body"
                                        placeholder=" " />
                                    <label htmlFor="name" className="absolute left-0 top-4 text-isak-textMuted text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                        What's your name? *
                                    </label>
                                    {errors.name && <div className="text-red-500 mt-2 text-sm">{errors.name}</div>}
                                </motion.div>
                                <motion.div variants={itemVariants} className="relative group">
                                    <input type="email" id="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-4 text-white text-xl focus:ring-0 focus:border-isak-primary peer transition-colors font-body"
                                        placeholder=" " />
                                    <label htmlFor="email" className="absolute left-0 top-4 text-isak-textMuted text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                        Your email address *
                                    </label>
                                    {errors.email && <div className="text-red-500 mt-2 text-sm">{errors.email}</div>}
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="relative group">
                                <input type="text" id="whatsapp" value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)}
                                    className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-4 text-white text-xl focus:ring-0 focus:border-isak-primary peer transition-colors font-body"
                                    placeholder=" " />
                                <label htmlFor="whatsapp" className="absolute left-0 top-4 text-isak-textMuted text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                    WhatsApp / Phone (Optional)
                                </label>
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative group">
                                <textarea id="message" value={data.work_info} onChange={e => setData('work_info', e.target.value)} rows="4"
                                    className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-4 text-white text-xl focus:ring-0 focus:border-isak-primary peer transition-colors resize-none font-body"
                                    placeholder=" " />
                                <label htmlFor="message" className="absolute left-0 top-4 text-isak-textMuted text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                    Tell me about your project... *
                                </label>
                                {errors.work_info && <div className="text-red-500 mt-2 text-sm">{errors.work_info}</div>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-4">
                                <button type="submit" disabled={processing}
                                    className="group relative inline-flex items-center justify-center bg-isak-primary text-black font-semibold text-xl px-12 py-5 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 disabled:opacity-75 disabled:hover:scale-100">
                                    <span className="relative z-10 flex items-center gap-3">
                                        {processing ? 'Sending...' : 'Send Message'}
                                        {!processing && (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"></div>
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

            </motion.div>
        </IsakLayout>
    );
}
