import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    // Desktop: collapsed to icon-only vs full width
    const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
    // Mobile/Tablet: drawer open state
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile drawer on route change
    useEffect(() => { setIsMobileOpen(false); }, [url]);

    const navLinks = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            active: url === '/dashboard',
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>)
        },
        {
            name: 'Site Content',
            href: route('admin.site-content.index'),
            active: url.startsWith('/admin/site-content'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>)
        },
        {
            name: 'Services',
            href: route('admin.services.index'),
            active: url.startsWith('/admin/services'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)
        },
        {
            name: 'Works',
            href: route('admin.works.index'),
            active: url.startsWith('/admin/works'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>)
        },
        {
            name: 'Messages',
            href: route('admin.messages.index'),
            active: url.startsWith('/admin/messages'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 5-8-5" /></svg>)
        },
        {
            name: 'Brands',
            href: route('admin.brands.index'),
            active: url.startsWith('/admin/brands'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>)
        },
        {
            name: 'Experience',
            href: route('admin.experiences.index'),
            active: url.startsWith('/admin/experiences'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)
        },
        {
            name: 'Notifications',
            href: route('admin.notifications.index'),
            active: url.startsWith('/admin/notifications'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>)
        },
        {
            name: 'Settings',
            href: route('admin.settings.index'),
            active: url.startsWith('/admin/settings'),
            icon: (<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>)
        },
    ];

    // Sidebar inner content — reused for both desktop sidebar and mobile drawer
    const SidebarContent = ({ expanded }) => {
        const { settings } = usePage().props;
        const logoText = settings?.header_logo_text || 'Partho';

        return (
            <>
                {/* Logo */}
                <div className="h-16 flex items-center px-5 border-b border-white/5 shrink-0">
                    <Link href="/" className="flex items-center gap-3 overflow-hidden">
                        <ApplicationLogo className="w-8 h-8 text-[#00DE51] shrink-0 hover:scale-110 hover:rotate-6 transition-all duration-300" />
                        <span className={`font-bold text-white text-xl tracking-tight transition-all duration-300 whitespace-nowrap overflow-hidden ${expanded ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'}`}>
                            {logoText}
                        </span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group relative ${link.active ? 'bg-isak-primary text-black shadow-lg shadow-isak-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {link.icon}
                            <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[160px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
                                {link.name}
                            </span>
                            {/* Tooltip when collapsed — desktop only */}
                            {!expanded && (
                                <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#2a2a2a] border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl pointer-events-none">
                                    {link.name}
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User Dropdown */}
                <div className="p-3 border-t border-white/5 shrink-0">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left">
                                <div className="w-9 h-9 rounded-full bg-isak-primary/10 flex items-center justify-center text-isak-primary font-bold shrink-0 text-lg">
                                    {user.name.charAt(0)}
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[140px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none'}`}>
                                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right" width="48">
                            <Dropdown.Link href={route('admin.profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex text-gray-300">

            {/* ── Mobile Overlay Backdrop ── */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* ── Mobile / Tablet Drawer (slides in from left) ── */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-[#161616] border-r border-white/5 z-50 flex flex-col transition-transform duration-300 lg:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Close button */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <SidebarContent expanded={true} />
            </aside>

            {/* ── Desktop Sidebar (always visible, collapsible) ── */}
            <aside className={`hidden lg:flex fixed inset-y-0 left-0 bg-[#161616] border-r border-white/5 z-50 flex-col transition-all duration-300 ${isDesktopExpanded ? 'w-64' : 'w-[72px]'}`}>
                <SidebarContent expanded={isDesktopExpanded} />
            </aside>

            {/* ── Main Content ── */}
            <div className={`flex-1 min-w-0 transition-all duration-300 ${isDesktopExpanded ? 'lg:ml-64' : 'lg:ml-[72px]'}`}>

                {/* Top Header */}
                <header className="h-16 border-b border-white/5 bg-[#111111]/60 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        {/* Desktop collapse toggle */}
                        <button
                            onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
                            className="hidden lg:flex p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        {header && (
                            <div className="text-base md:text-xl font-medium text-white tracking-tight truncate max-w-[200px] sm:max-w-none">
                                {header}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-isak-primary/50 text-isak-primary transition-all text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            <span className="hidden sm:inline">View Website</span>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
