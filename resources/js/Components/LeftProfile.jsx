import { usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Magnetic from '@/Components/Magnetic';

export default function LeftProfile() {
    const { settings, cms } = usePage().props;
    const c = cms || {};

    const getSetting = (key) => {
        const setting = settings?.find(s => s.key === key);
        return setting ? setting.value : '#';
    };

    const name = c.profile_name || 'Partho';
    const tagline = c.profile_tagline || 'Full Stack Developer';
    const email = c.profile_email || 'hello@partho.dev';
    const location = c.profile_location || 'Based in Dhaka, BD';
    const imageUrl = c.profile_image_url || 'https://ui-avatars.com/api/?name=Partho&background=222&color=fff&size=512';
    const cvUrl = c.cv_url || '#';
    const isAvailable = c.profile_available !== 'false';

    return (
        <div className="bg-isak-card border border-isak-border rounded-4xl p-5 lg:p-10 flex flex-col items-center justify-between h-auto md:min-h-[500px] md:h-full lg:h-[calc(100vh-80px)] relative w-full md:w-[320px] lg:w-[400px]">

            {/* Top Bar with Name and Socials */}
            <div className="w-full flex justify-between items-center mb-6">
                <div className="flex gap-2 items-center">
                    <Magnetic>
                        <ApplicationLogo className="w-8 h-8 text-[#00DE51] shrink-0 transition-all duration-300 hover:rotate-6" />
                    </Magnetic>
                    <span className="text-2xl lg:text-3xl font-medium tracking-tight text-white">{name}</span>
                </div>

                {/* Socials - Top Right Corner */}
                <div className="flex gap-2">
                    <Magnetic strength={0.2}>
                        <a href={getSetting('linkedin_url')} target="_blank" rel="noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-isak-textMuted hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                        <a href={getSetting('github_url')} target="_blank" rel="noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-isak-textMuted hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                    </Magnetic>
                </div>
            </div>

            {/* Profile Image */}
            <div className="w-full max-w-[320px] aspect-square md:aspect-[4/5] rounded-4xl overflow-hidden mb-8 relative border border-white/5 shrink-0">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                {/* Available Badge */}
                {isAvailable && (
                    <div className="absolute left-0 bottom-1/4 -translate-x-1/2 -rotate-90 origin-bottom-left text-[10px] lg:text-xs uppercase tracking-widest bg-isak-bg text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-full border border-isak-border flex items-center gap-2 whitespace-nowrap shadow-xl">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-isak-primary animate-pulse relative">
                            <span className="absolute inset-0 rounded-full bg-isak-primary animate-ping opacity-75"></span>
                        </span>
                        Available for Work
                    </div>
                )}
            </div>

            {/* Content Container (to push actions to bottom if needed) */}
            <div className="w-full flex-1 flex flex-col justify-end">

                {/* Email & Details */}
                <div className="w-full text-center flex flex-col gap-1 mb-8">
                    <p className="text-white text-2xl font-medium tracking-tight">{email}</p>
                    <p className="text-isak-textMuted text-sm">{location}</p>
                </div>

                {/* Bottom Actions */}
                <div className="w-full flex gap-3">
                    <Magnetic strength={0.1} className="flex-1">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-hire-modal'))}
                            className="w-full bg-isak-primary text-black font-semibold text-lg py-4 px-6 rounded-full hover:bg-white transition-colors duration-300"
                        >
                            Let's Talk
                        </button>
                    </Magnetic>
                    <Magnetic strength={0.4}>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-hire-modal'))}
                            className="w-[60px] h-[60px] flex items-center justify-center bg-isak-primary text-black rounded-full hover:bg-white transition-colors duration-300"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </button>
                    </Magnetic>
                </div>

                {/* Download CV */}
                <Magnetic strength={0.1} className="w-full">
                    <a href={cvUrl} target="_blank" rel="noreferrer" className="w-full mt-4 py-4 rounded-full border border-isak-border text-center text-white hover:border-isak-primary hover:text-isak-primary transition-colors flex items-center justify-center gap-2 font-medium">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download CV
                    </a>
                </Magnetic>
            </div>

        </div >
    );
}
