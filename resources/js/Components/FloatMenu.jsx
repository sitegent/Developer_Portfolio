import { Link, usePage } from '@inertiajs/react';
import { HomeMenu, Person, Mail, DocumentText, Briefcase } from './Icons';

export default function FloatMenu() {
    const { url } = usePage();

    const links = [
        { href: '/', icon: <HomeMenu />, label: 'Home' },
        { href: '/about', icon: <Person />, label: 'About' },
        { href: '/services', icon: <Briefcase />, label: 'Services' },
        { href: '/works', icon: <DocumentText />, label: 'Portfolio' },
        { href: '/contact', icon: <Mail />, label: 'Contact' },
    ];

    return (
        <nav className="hidden md:flex flex-col gap-4 border border-isak-border p-2 rounded-full bg-isak-card/40 backdrop-blur-xl">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group relative
                        ${url === link.href ? 'bg-white text-black' : 'text-isak-textMuted bg-white/5 hover:text-white hover:bg-white/20 hover:scale-110'}
                    `}
                >
                    <span className="w-5 h-5">{link.icon}</span>

                    {/* Tooltip */}
                    <span className="absolute right-16 bg-white text-black text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl pointer-events-none translate-x-4 group-hover:translate-x-0">
                        {link.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
}

// Mobile Bottom Nav
export function MobileNav() {
    const { url } = usePage();
    const links = [
        { href: '/', icon: <HomeMenu /> },
        { href: '/about', icon: <Person /> },
        { href: '/services', icon: <Briefcase /> },
        { href: '/works', icon: <DocumentText /> },
        { href: '/contact', icon: <Mail /> },
    ];

    return (
        <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden bg-isak-card/90 backdrop-blur-xl border border-isak-border rounded-full flex justify-around p-2 shadow-2xl">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`p-3 rounded-full transition-colors flex items-center justify-center
                        ${url === link.href ? 'bg-white text-black' : 'text-isak-textMuted hover:text-white'}
                    `}
                >
                    <span className="w-6 h-6 block">{link.icon}</span>
                </Link>
            ))}
        </nav>
    );
}
