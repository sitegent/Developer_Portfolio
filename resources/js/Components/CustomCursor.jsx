import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const rafRef = useRef(null);
    const mouse = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });
    const isHovering = useRef(false);
    const isVisible = useRef(false);

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = useCallback(() => {
        // Smooth follow for ring
        ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15);
        ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15);

        if (dotRef.current) {
            dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
            dotRef.current.style.opacity = isHovering.current ? '0' : '1';
        }

        if (ringRef.current) {
            const size = isHovering.current ? 64 : 32;
            ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
            ringRef.current.style.width = `${size}px`;
            ringRef.current.style.height = `${size}px`;
            ringRef.current.style.borderColor = isHovering.current
                ? 'rgba(255, 255, 255, 0)'
                : 'rgba(255, 255, 255, 0.6)';
            ringRef.current.style.backgroundColor = isHovering.current
                ? 'rgba(255, 255, 255, 0.15)'
                : 'transparent';
        }

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // Only enable on desktop (no touch)
        const mq = window.matchMedia('(min-width: 1024px)');
        if (!mq.matches) return;

        const onMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            if (!isVisible.current) {
                isVisible.current = true;
                if (dotRef.current) dotRef.current.style.opacity = '1';
                if (ringRef.current) ringRef.current.style.opacity = '1';
            }
        };

        const onOver = (e) => {
            const t = e.target;
            isHovering.current =
                t.tagName === 'A' ||
                t.tagName === 'BUTTON' ||
                !!t.closest('button') ||
                !!t.closest('a') ||
                window.getComputedStyle(t).cursor === 'pointer';
        };

        const onLeave = () => {
            isVisible.current = false;
            if (dotRef.current) dotRef.current.style.opacity = '0';
            if (ringRef.current) ringRef.current.style.opacity = '0';
        };

        const onEnter = () => {
            isVisible.current = true;
            if (dotRef.current) dotRef.current.style.opacity = '1';
            if (ringRef.current) ringRef.current.style.opacity = '1';
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        // Start animation loop
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block overflow-hidden">
            {/* Inner Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[100000]"
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    opacity: 0,
                    willChange: 'transform',
                    transition: 'opacity 0.15s',
                }}
            />

            {/* Outer Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'transparent',
                    opacity: 0,
                    willChange: 'transform',
                    transition: 'width 0.25s, height 0.25s, border-color 0.25s, background-color 0.25s, opacity 0.15s',
                }}
            />
        </div>
    );
}
