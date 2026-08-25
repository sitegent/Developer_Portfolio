import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-isak-bg px-4">
            {/* Ambient glow orbs */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
                style={{ background: 'radial-gradient(circle, #00DE51 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none absolute -bottom-60 -right-40 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
                style={{ background: 'radial-gradient(circle, #00DE51 0%, transparent 70%)' }}
            />

            {/* Subtle grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Logo */}
            <div className="relative z-10 mb-8">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-isak-border bg-isak-card/80 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 group-hover:border-isak-primary/30 group-hover:shadow-isak-primary/10">
                        <ApplicationLogo className="h-7 w-7 text-isak-primary" />
                    </div>
                    <span className="font-sans text-xl font-bold tracking-tight text-white">
                        Partho
                    </span>
                </Link>
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Glow behind card */}
                <div
                    className="absolute -inset-1 rounded-3xl opacity-20 blur-xl"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(0,222,81,0.3) 0%, transparent 50%, rgba(0,222,81,0.15) 100%)',
                    }}
                />

                <div className="relative rounded-3xl border border-isak-border bg-isak-card/60 px-8 py-10 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    {children}
                </div>
            </div>

            {/* Footer */}
            <p className="relative z-10 mt-8 text-xs text-isak-textMuted">
                © {new Date().getFullYear()} Partho. All rights reserved.
            </p>
        </div>
    );
}
