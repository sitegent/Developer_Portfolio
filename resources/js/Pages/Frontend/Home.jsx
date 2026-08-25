import IsakLayout from '@/Layouts/IsakLayout';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '@/Components/Magnetic';

export default function Home({ cms, brands }) {
    const c = cms || {};

    const greeting = c.home_greeting || "Hey, I'm a";
    const roleText = c.home_role || 'Web Developer';
    const bio = c.home_bio || 'I design and build dynamic, high-performance web applications.';
    const yearsExp = c.home_years_exp || '+3';
    const projects = c.home_projects || '+40';
    const clients = c.home_clients || '+20';
    const yearsLbl = c.home_years_label || 'Years of Experience';
    const projLbl = c.home_projects_label || 'Projects Completed';
    const clientLbl = c.home_clients_label || 'Happy Clients';

    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        let currentText = '';
        let i = 0;
        const interval = setInterval(() => {
            currentText += roleText[i];
            setTypedText(currentText);
            i++;
            if (i === roleText.length) clearInterval(interval);
        }, 150);
        return () => clearInterval(interval);
    }, [roleText]);

    // Duplicate brands for seamless infinite loop
    const brandList = brands && brands.length > 0 ? brands : null;
    const marqueeItems = brandList ? [...brandList, ...brandList] : null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <IsakLayout title="Home">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full flex flex-col justify-center min-h-[calc(100vh-100px)] py-10 lg:py-0 relative z-10"
            >

                {/* Intro Title */}
                <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter leading-[1.1] mb-8 text-white">
                    {greeting} <br />
                    <span className="text-isak-primary">{typedText}</span><span className="animate-pulse text-white">|</span>
                </motion.h1>

                {/* Bio */}
                <motion.div variants={itemVariants} className="text-isak-textMuted text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-16 font-body font-light">
                    {bio.substring(0, 200)}
                </motion.div>

                {/* Stats Row */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 md:gap-12 lg:gap-16 mb-20 flex-wrap">
                    <div className="flex flex-col space-y-2">
                        <span className="text-white text-5xl md:text-6xl lg:text-7xl font-serif">{yearsExp}</span>
                        <span className="text-isak-textMuted text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase font-medium">{yearsLbl}</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-white text-5xl md:text-6xl lg:text-7xl font-serif">{projects}</span>
                        <span className="text-isak-textMuted text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase font-medium">{projLbl}</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-white text-5xl md:text-6xl lg:text-7xl font-serif">{clients}</span>
                        <span className="text-isak-textMuted text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase font-medium">{clientLbl}</span>
                    </div>
                </motion.div>

                {/* Brand Slider (Infinite Marquee) */}
                <motion.div variants={itemVariants}>
                    {marqueeItems ? (
                        <div className="w-full overflow-hidden relative">
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-isak-bg to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-isak-bg to-transparent z-10 pointer-events-none" />
                            <div className="flex whitespace-nowrap animate-marquee items-center gap-16 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {marqueeItems.map((brand, idx) => (
                                    <Magnetic key={`${brand.id}-${idx}`} strength={0.1}>
                                        <div className="flex shrink-0 items-center">
                                            {brand.logo_url ? (
                                                <img
                                                    src={brand.logo_url}
                                                    alt={brand.name}
                                                    className="h-8 object-contain"
                                                />
                                            ) : (
                                                <span className="text-2xl font-bold font-serif italic text-white whitespace-nowrap">
                                                    {brand.name}
                                                </span>
                                            )}
                                        </div>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full overflow-hidden relative">
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-isak-bg to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-isak-bg to-transparent z-10 pointer-events-none" />
                            <div className="flex whitespace-nowrap animate-marquee items-center gap-16 md:gap-24 opacity-30">
                                {[1, 2].map((group) => (
                                    <div key={`group-${group}`} className="flex shrink-0 items-center gap-16 md:gap-24">
                                        {['Google', 'Meta', 'Amazon', 'Netflix', 'Spotify', 'Microsoft'].map(name => (
                                            <span key={name} className="text-2xl font-bold font-serif italic text-white">{name}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

            </motion.div>
        </IsakLayout>
    );
}
