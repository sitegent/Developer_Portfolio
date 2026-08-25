import IsakLayout from '@/Layouts/IsakLayout';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TECH_STACK_ICONS } from '@/Constants/TechIcons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Works({ works, cms }) {
    const [selectedWork, setSelectedWork] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(2);

    // Get unique categories that have projects
    const categories = ['All', ...new Set(works.map(work => work.category).filter(Boolean))];

    // Filter works based on category
    const filteredWorks = activeCategory === 'All'
        ? works
        : works.filter(work => work.category === activeCategory);

    // Get only the visible works for infinite scroll
    const visibleWorks = filteredWorks.slice(0, visibleCount);

    const loadMore = () => {
        setVisibleCount(prev => prev + 2);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setVisibleCount(2); // Reset scroll on category change
    };

    const renderTechStack = (techStack, isSmall = true) => {
        if (!techStack) return null;
        const techs = techStack.split(',').map(t => t.trim()).filter(t => t !== '');

        return (
            <div className={`flex flex-wrap ${isSmall ? 'gap-2 mt-2' : 'gap-3'}`}>
                {techs.map((techName, idx) => {
                    const techInfo = TECH_STACK_ICONS[techName];
                    return (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`flex items-center justify-center border border-white/5 rounded-full bg-isak-card transition-all duration-700 shadow-lg ${isSmall
                                ? 'w-10 h-10 group-hover:border-isak-primary/30'
                                : 'w-12 h-12 bg-white/5 border-white/10'
                                }`}
                            title={techName}
                        >
                            {techInfo ? (
                                <div className={`${isSmall ? 'w-5 h-5' : 'w-6 h-6'}`} style={{ color: techInfo.color }}>
                                    {techInfo.svg}
                                </div>
                            ) : (
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-isak-textMuted px-2 text-center">
                                    {techName}
                                </span>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
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
        <IsakLayout title="Portfolio">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full min-h-[calc(100vh-100px)] lg:py-16"
            >

                {/* Header Section */}
                <motion.div variants={itemVariants} className="mb-20">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 text-white leading-[0.9]">
                        {cms?.works_heading || 'Selected'} <span className="text-isak-primary font-serif italic">{cms?.works_heading_accent || '& Case Studies.'}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-isak-textMuted max-w-2xl leading-relaxed font-body font-light">
                        {cms?.works_subheading || 'A showcase of digital experiences, web apps, and platforms built with precision, passion, and purpose.'}
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3 md:gap-4 mb-20">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-4 md:px-8 py-2 md:py-3 rounded-full border transition-all duration-500 text-[10px] md:text-sm font-bold uppercase tracking-widest ${activeCategory === category
                                ? 'bg-isak-primary border-isak-primary text-black shadow-lg shadow-isak-primary/20'
                                : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Staggered Masonry Grid */}
                <motion.div
                    layout
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleWorks.map((work, index) => (
                            <motion.div
                                layout
                                key={work.id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                                }}
                                onClick={() => setSelectedWork(work)}
                                // Stagger the right column downward
                                className={`group flex flex-col gap-6 md:gap-8 cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                            >
                                {/* Project Image Container */}
                                <div className="relative w-full aspect-[4/5] rounded-[40px] md:rounded-[50px] overflow-hidden block border border-white/5 transition-all duration-700 group-hover:border-isak-primary/30 group-hover:shadow-2xl group-hover:shadow-isak-primary/10">

                                    {/* Interactive Glow Overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                                        style={{ background: 'radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(0, 222, 81, 0.1), transparent 80%)' }}
                                    />

                                    <div className="absolute inset-0 bg-isak-card opacity-50 z-10 transition-opacity duration-700 group-hover:opacity-20"></div>

                                    {work.image ? (
                                        <img
                                            src={work.image.startsWith('http') ? work.image : `/storage/${work.image}`}
                                            alt={work.title}
                                            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#161616] border border-white/10 text-isak-textMuted font-body text-xl">
                                            No Image
                                        </div>
                                    )}

                                    {/* Hover Badge Overlay */}
                                    <div className="absolute top-10 right-10 z-20 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out">
                                        <div className="bg-isak-primary text-black w-16 h-16 rounded-full flex items-center justify-center font-bold tracking-tighter shadow-xl transform group-hover:rotate-12">
                                            VIEW
                                        </div>
                                    </div>

                                    {/* Bottom Info Overlay */}
                                    <div className="absolute bottom-10 left-10 z-20 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                                        <span className="text-xs uppercase tracking-[0.3em] font-bold text-isak-primary mb-2 block">Case Study</span>
                                        <h3 className="text-4xl font-medium tracking-tighter">0{index + 1}</h3>
                                    </div>

                                    <div className="absolute bottom-10 right-10 bg-white/5 p-3 rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border border-white/10 z-20">
                                        <svg className="w-6 h-6 text-isak-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Project Metadata */}
                                <div className="flex flex-col gap-4 px-4">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-3xl font-medium text-white group-hover:text-isak-primary transition-colors duration-500 tracking-tight leading-none mb-1">
                                            {work.title}
                                        </h3>
                                        <span className="text-[10px] font-bold text-isak-primary/50 uppercase tracking-[0.3em]">{work.category}</span>
                                    </div>

                                    {renderTechStack(work.tech_stack, true)}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {works.length === 0 && (
                        <motion.div variants={itemVariants} className="col-span-full py-40 text-center border border-dashed border-white/10 rounded-[50px] animate-pulse">
                            <p className="text-isak-textMuted font-serif italic text-2xl">Building the future... Projects arriving soon.</p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Load More Button (Infinite Scroll Trigger) */}
                {visibleCount < filteredWorks.length && (
                    <motion.div variants={itemVariants} className="mt-40 flex justify-center pb-20">
                        <button
                            onClick={loadMore}
                            className="group relative px-16 py-8 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.3em] text-xs hover:border-isak-primary transition-all duration-700 overflow-hidden"
                        >
                            <span className="relative z-10">Load More Projects</span>
                            <div className="absolute inset-0 bg-isak-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-0"></div>
                            <style dangerouslySetInnerHTML={{ __html: `.group:hover span { color: black !important; transition: color 0.7s; }` }} />
                        </button>
                    </motion.div>
                )}

                {/* Project Detail Modal */}
                <Transition show={!!selectedWork} as={Fragment}>
                    <Dialog as="div" className="relative z-[9999]" onClose={() => setSelectedWork(null)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-700"
                                    enterFrom="opacity-0 scale-95 translate-y-12"
                                    enterTo="opacity-100 scale-100 translate-y-0"
                                    leave="ease-in duration-500"
                                    leaveFrom="opacity-100 scale-100 translate-y-0"
                                    leaveTo="opacity-0 scale-95 translate-y-12"
                                >
                                    <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-[60px] bg-[#0c0c0c] border border-white/10 shadow-3xl transition-all relative">

                                        {/* Close Button */}
                                        <button
                                            onClick={() => setSelectedWork(null)}
                                            className="absolute top-10 right-10 p-5 rounded-full bg-white/5 text-white hover:bg-isak-primary hover:text-black transition-all duration-500 z-50 hover:rotate-90 group"
                                        >
                                            <svg className="w-8 h-8 transition-transform group-active:scale-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        {selectedWork && (
                                            <div className="grid grid-cols-1 lg:grid-cols-2">

                                                {/* Left: Image */}
                                                <div className="relative aspect-[4/5] lg:aspect-auto h-full overflow-hidden">
                                                    {selectedWork.image ? (
                                                        <img
                                                            src={selectedWork.image.startsWith('http') ? selectedWork.image : `/storage/${selectedWork.image}`}
                                                            alt={selectedWork.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-[#161616] flex items-center justify-center text-white/10 italic">Project Reveal</div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden"></div>
                                                </div>

                                                {/* Right: Info */}
                                                <div className="p-10 lg:p-24 flex flex-col gap-12 justify-center">
                                                    <div>
                                                        <span className="text-isak-primary uppercase tracking-[0.4em] text-xs font-black mb-6 block">Premium Project</span>
                                                        <h2 className="text-6xl lg:text-8xl font-medium text-white tracking-tighter leading-[0.8] mb-8">
                                                            {selectedWork.title}
                                                        </h2>
                                                        <div className="h-1 w-20 bg-isak-primary"></div>
                                                    </div>

                                                    <div className="space-y-10">
                                                        <div className="space-y-4">
                                                            <h4 className="text-white/30 uppercase tracking-widest text-xs font-bold">The Challenge</h4>
                                                            <p className="text-xl lg:text-2xl text-white font-light leading-relaxed font-body">
                                                                {selectedWork.description}
                                                            </p>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-white/30 uppercase tracking-widest text-xs font-bold">Technologies Used</h4>
                                                            {renderTechStack(selectedWork.tech_stack, false)}
                                                        </div>
                                                    </div>

                                                    <div className="pt-10 flex flex-col md:flex-row gap-6">
                                                        {selectedWork.link && (
                                                            <a
                                                                href={selectedWork.link}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="px-12 py-6 rounded-full bg-isak-primary text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all text-center flex items-center justify-center gap-3 shadow-xl shadow-isak-primary/20"
                                                            >
                                                                Launch Project
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        <button
                                                            onClick={() => setSelectedWork(null)}
                                                            className="px-12 py-6 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all text-center"
                                                        >
                                                            Back to Portfolio
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

            </motion.div>
        </IsakLayout>
    );
}
