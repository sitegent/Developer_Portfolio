import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';

const errorData = {
    // 4xx Client Errors
    400: { title: 'Bad Request', description: 'The server could not understand the request due to invalid syntax.', emoji: '🤔' },
    401: { title: 'Unauthorized', description: 'You need to be authenticated to access this resource.', emoji: '🔐' },
    403: { title: 'Forbidden', description: "You don't have permission to access this resource.", emoji: '🚫' },
    404: { title: 'Page Not Found', description: "The page you're looking for doesn't exist or has been moved.", emoji: '👻' },
    405: { title: 'Method Not Allowed', description: 'The request method is not supported for this resource.', emoji: '⛔' },
    408: { title: 'Request Timeout', description: 'The server timed out waiting for the request.', emoji: '⏳' },
    419: { title: 'Page Expired', description: 'Your session has expired. Please refresh and try again.', emoji: '⌛' },
    422: { title: 'Unprocessable Entity', description: 'The request was well-formed but unable to be processed.', emoji: '📝' },
    429: { title: 'Too Many Requests', description: "You've sent too many requests. Please slow down.", emoji: '🐌' },

    // 5xx Server Errors
    500: { title: 'Internal Server Error', description: 'Something went wrong on our end. We are working on it.', emoji: '💥' },
    502: { title: 'Bad Gateway', description: 'The server received an invalid response from the upstream server.', emoji: '🔗' },
    503: { title: 'Service Unavailable', description: 'The service is temporarily unavailable. Please try again later.', emoji: '🔧' },
    504: { title: 'Gateway Timeout', description: 'The server took too long to respond.', emoji: '⏱️' },
};

const fallback = { title: 'Error', description: 'An unexpected error occurred.', emoji: '⚠️' };

export default function Error({ status }) {
    const error = errorData[status] || fallback;
    const isServerError = status >= 500;

    // Animated particles for background
    const particles = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 10,
        })), []
    );

    return (
        <>
            <Head title={`${status} - ${error.title}`} />

            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-isak-bg px-4 font-body text-white">

                {/* Ambient glow */}
                <div
                    className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full opacity-15 blur-[150px]"
                    style={{
                        background: isServerError
                            ? 'radial-gradient(circle, #ef4444 0%, transparent 70%)'
                            : 'radial-gradient(circle, #00DE51 0%, transparent 70%)',
                    }}
                />
                <div
                    className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
                    style={{
                        background: isServerError
                            ? 'radial-gradient(circle, #f97316 0%, transparent 70%)'
                            : 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                    }}
                />

                {/* Floating particles */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="pointer-events-none absolute rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            backgroundColor: isServerError
                                ? 'rgba(239, 68, 68, 0.3)'
                                : 'rgba(0, 222, 81, 0.3)',
                            animation: `errorFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        }}
                    />
                ))}

                {/* Subtle grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

                    {/* Emoji */}
                    <div
                        className="text-7xl mb-6"
                        style={{ animation: 'errorBounce 2s ease-in-out infinite' }}
                    >
                        {error.emoji}
                    </div>

                    {/* Status code */}
                    <h1
                        className="font-sans text-[120px] sm:text-[160px] font-black leading-none tracking-tighter select-none"
                        style={{
                            background: isServerError
                                ? 'linear-gradient(135deg, #ef4444, #f97316, #ef4444)'
                                : 'linear-gradient(135deg, #00DE51, #3b82f6, #00DE51)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'errorGradient 4s ease infinite',
                        }}
                    >
                        {status}
                    </h1>

                    {/* Title */}
                    <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {error.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-4 text-base text-isak-textMuted leading-relaxed max-w-md">
                        {error.description}
                    </p>

                    {/* Action buttons */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-isak-primary px-6 py-3 font-sans text-sm font-bold tracking-wide text-isak-bg transition-all duration-300 hover:shadow-lg hover:shadow-isak-primary/25 active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            <span>Go Home</span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 rounded-xl border border-isak-border bg-isak-card/60 px-6 py-3 font-sans text-sm font-medium text-isak-textMuted backdrop-blur-sm transition-all duration-300 hover:border-isak-primary/30 hover:text-white active:scale-[0.98]"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            <span>Go Back</span>
                        </button>
                    </div>

                    {/* Error type badge */}
                    <div className="mt-10">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
                                isServerError
                                    ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                                    : 'border border-isak-primary/20 bg-isak-primary/10 text-isak-primary'
                            }`}
                        >
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${isServerError ? 'bg-red-400' : 'bg-isak-primary'}`}
                                style={{ animation: 'errorPulse 2s ease-in-out infinite' }}
                            />
                            {isServerError ? 'Server Error' : 'Client Error'}
                        </span>
                    </div>
                </div>

                {/* CSS Animations */}
                <style>{`
                    @keyframes errorFloat {
                        0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                        50% { transform: translateY(-30px) scale(1.5); opacity: 0.6; }
                    }
                    @keyframes errorBounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes errorGradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes errorPulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.4; }
                    }
                `}</style>
            </div>
        </>
    );
}
