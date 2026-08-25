import { useState, useEffect } from 'react';

export default function LiveTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const isDay = time.getHours() >= 6 && time.getHours() < 18;

    return (
        <div className="hidden lg:flex flex-col items-end gap-5 fixed top-10 right-4 lg:right-10 z-40">
            <div className="text-right flex flex-col gap-1">
                <span className="text-isak-textMuted text-xl font-body font-light tracking-wide">{dateStr}</span>
                <span className="text-isak-textMuted text-2xl font-body font-light tracking-wider flex items-center justify-end gap-2">
                    {timeStr}
                    {isDay ? (
                        /* Sun */
                        <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <circle cx="12" cy="12" r="4" />
                            <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                    ) : (
                        /* Moon */
                        <svg className="w-5 h-5 text-blue-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                        </svg>
                    )}
                </span>
            </div>

            <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-settings-modal'))}
                className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-isak-textMuted hover:text-white hover:bg-[#222] transition-all duration-300"
                aria-label="Settings"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    );
}
