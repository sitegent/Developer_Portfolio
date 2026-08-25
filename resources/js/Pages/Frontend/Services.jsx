import IsakLayout from '@/Layouts/IsakLayout';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

export default function Services({ services }) {
    const [selectedService, setSelectedService] = useState(null);

    const renderIcon = (service, className = "w-6 h-6") => {
        if (!service.icon) {
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                </svg>
            );
        }

        if (service.icon.startsWith('services/')) {
            return <img src={`/storage/${service.icon}`} alt={service.title} className={className + " object-contain"} />;
        }

        // Handle legacy SVG strings if any
        return <div dangerouslySetInnerHTML={{ __html: service.icon }} className={className} />;
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
        <IsakLayout title="Services">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full min-h-[calc(100vh-100px)] lg:py-16"
            >

                {/* Header Section */}
                <motion.div variants={itemVariants} className="mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter mb-8 text-white leading-[0.9]">
                        Elevating <span className="text-isak-primary font-serif italic">Brands</span>
                        <br /> Through Design.
                    </h2>
                    <p className="text-lg md:text-xl text-isak-textMuted max-w-2xl leading-relaxed font-body font-light">
                        I specialize in creating bespoke digital experiences that bridge the gap between technology and human connection. Each project is a venture into innovation.
                    </p>
                </motion.div>

                {/* Grid-based Service Cards */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                            }}
                            onClick={() => setSelectedService(service)}
                            className="group relative bg-isak-card border border-white/5 rounded-[40px] p-8 md:p-10 lg:p-14 transition-all duration-700 hover:border-isak-primary/30 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[350px] md:min-h-[400px]"
                        >
                            {/* Interactive Glow Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                                style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(0, 222, 81, 0.08), transparent 80%)' }}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8 md:mb-12">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 md:p-5 group-hover:bg-isak-primary group-hover:border-isak-primary group-hover:text-black transition-all duration-700 ease-out group-hover:scale-110">
                                        {renderIcon(service, "w-8 h-8 md:w-10 md:h-10")}
                                    </div>
                                    <span className="text-white/20 font-serif italic text-3xl md:text-4xl">0{index + 1}</span>
                                </div>

                                <div>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 md:mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-700 ease-out">
                                        {service.title}
                                    </h3>
                                    <p className="text-isak-textMuted text-base md:text-lg font-light leading-relaxed font-body mb-8 line-clamp-3 group-hover:text-white transition-colors duration-700">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center gap-3 text-isak-primary font-medium tracking-wide uppercase text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                    <span>Explore Service</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {services.length === 0 && (
                        <motion.div variants={itemVariants} className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[40px]">
                            <p className="text-isak-textMuted font-body text-xl italic">Crafting new possibilities... Check back soon.</p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Service Detail Modal */}
                <Transition show={!!selectedService} as={Fragment}>
                    <Dialog as="div" className="relative z-[9999]" onClose={() => setSelectedService(null)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-700"
                                    enterFrom="opacity-0 scale-95 translate-y-8"
                                    enterTo="opacity-100 scale-100 translate-y-0"
                                    leave="ease-in duration-500"
                                    leaveFrom="opacity-100 scale-100 translate-y-0"
                                    leaveTo="opacity-0 scale-95 translate-y-8"
                                >
                                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-[50px] bg-isak-card border border-white/10 p-10 lg:p-20 text-left align-middle shadow-2xl transition-all relative">

                                        {/* Close Button */}
                                        <button
                                            onClick={() => setSelectedService(null)}
                                            className="absolute top-10 right-10 p-4 rounded-full bg-white/5 text-white hover:bg-isak-primary hover:text-black transition-all duration-500 z-50 hover:rotate-90"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        {selectedService && (
                                            <div className="flex flex-col gap-12">
                                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                                    <div>
                                                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-6 text-isak-primary mb-10">
                                                            {renderIcon(selectedService, "w-12 h-12")}
                                                        </div>
                                                        <h2 className="text-5xl lg:text-7xl font-medium text-white tracking-tighter leading-tight">
                                                            {selectedService.title}
                                                        </h2>
                                                    </div>
                                                    <div className="text-isak-primary font-serif italic text-3xl">
                                                        Expertise.
                                                    </div>
                                                </div>

                                                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent"></div>

                                                <div className="space-y-8">
                                                    <h3 className="text-isak-textMuted uppercase tracking-[0.2em] text-sm font-bold">About the Service</h3>
                                                    <p className="text-xl lg:text-2xl text-white font-light leading-relaxed font-body">
                                                        {selectedService.description}
                                                    </p>
                                                </div>

                                                <div className="pt-10">
                                                    <button
                                                        onClick={() => setSelectedService(null)}
                                                        className="px-10 py-5 rounded-full bg-isak-primary text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                                                    >
                                                        Close Details
                                                    </button>
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
