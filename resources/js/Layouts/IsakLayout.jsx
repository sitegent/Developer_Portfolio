import FloatMenu, { MobileNav } from '@/Components/FloatMenu';
import LeftProfile from '@/Components/LeftProfile';
import HireModal from '@/Components/HireModal';
import LiveTime from '@/Components/LiveTime';
import RightMenu from '@/Components/RightMenu';
import CustomCursor from '@/Components/CustomCursor';
import PageLoader from '@/Components/PageLoader';
import GlobalLighting from '@/Components/GlobalLighting';
import { Head, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IsakLayout({ children, title, className = '' }) {
    const { settings } = usePage().props;
    const siteTitle = settings?.site_title || 'Partho';

    const openMenu = () => window.dispatchEvent(new CustomEvent('open-settings-modal'));

    return (
        <div className="min-h-screen lg-cursor-none relative bg-isak-bg overflow-x-hidden">
            <GlobalLighting />
            <PageLoader />
            <CustomCursor />
            <Head title={title ? `${title} - ${siteTitle}` : siteTitle} />

            <div className="max-w-[1600px] mx-auto w-full relative px-4 lg:px-12 py-4 lg:py-10">

                <div className="flex flex-col md:flex-row min-h-screen">

                    {/* Left Sticky Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-[320px] lg:w-[400px] md:sticky md:top-10 z-10 self-start"
                    >
                        <LeftProfile />
                    </motion.div>

                    {/* Right Scrollable Content */}
                    <main className={`flex-1 w-full pb-32 md:pb-0 md:ml-12 lg:ml-24 lg:mr-20 xl:mr-32 pt-20 md:pt-0 ${className}`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={usePage().url}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </main>

                </div>

                {/* Desktop Right Navigation */}
                <div className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center">
                    <FloatMenu />
                    {/* Hamburger Menu Toggle — always visible */}
                </div>

                {/* Floating Date Time Widget */}
                <LiveTime />

                {/* Mobile Nav Bar */}
                <MobileNav />


            </div>

            {/* Overlays */}
            <HireModal />
            <RightMenu />
        </div>
    );
}
