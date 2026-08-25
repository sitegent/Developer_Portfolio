import { useEffect, useRef, useMemo } from 'react';

export default function GlobalLighting() {
    const spotlightRef = useRef(null);
    const rafRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const animate = () => {
            // Smooth follow with lerp
            current.current.x += (mouse.current.x - current.current.x) * 0.05;
            current.current.y += (mouse.current.y - current.current.y) * 0.05;

            if (spotlightRef.current) {
                spotlightRef.current.style.background =
                    `radial-gradient(600px circle at ${current.current.x}px ${current.current.y}px, rgba(0, 222, 81, 0.08), transparent 80%)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Static blobs — use CSS animation instead of JS-driven framer-motion
    const blobs = useMemo(() => [
        { color: 'rgba(0, 222, 81, 0.04)', size: 500, left: '10%', top: '10%', duration: '20s' },
        { color: 'rgba(59, 130, 246, 0.04)', size: 400, left: '70%', top: '40%', duration: '25s' },
        { color: 'rgba(168, 85, 247, 0.04)', size: 600, left: '30%', top: '70%', duration: '30s' },
    ], []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
            {/* Spotlight — GPU-composited */}
            <div
                ref={spotlightRef}
                className="absolute inset-0 z-0 opacity-40"
                style={{ willChange: 'background' }}
            />

            {/* Ambient Glow Blobs — pure CSS animation, no JS overhead */}
            {blobs.map((blob, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: blob.size,
                        height: blob.size,
                        left: blob.left,
                        top: blob.top,
                        backgroundColor: blob.color,
                        filter: 'blur(120px)',
                        willChange: 'transform',
                        animation: `blobFloat${i} ${blob.duration} ease-in-out infinite`,
                    }}
                />
            ))}

            {/* CSS keyframes for blobs */}
            <style>{`
                @keyframes blobFloat0 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(80px, 40px) scale(1.15); }
                }
                @keyframes blobFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-60px, 60px) scale(1.1); }
                }
                @keyframes blobFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-40px, -30px) scale(1.12); }
                }
            `}</style>

            {/* Noise overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
