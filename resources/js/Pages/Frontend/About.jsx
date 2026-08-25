import IsakLayout from '@/Layouts/IsakLayout';
import { motion } from 'framer-motion';

export default function About({ cms, experiences }) {
    const c = cms || {};

    const heading = c.about_heading || 'Every great design begins with an even better story.';
    const aboutText = c.about_text || "Hello! I'm Partho, a passionate developer based in BD.";
    const skillsStr = c.about_skills || 'PHP, Laravel, MySQL, PostgreSQL, JavaScript, React, Next.js, Inertia.js, Tailwind CSS, Bootstrap, Git, Docker';
    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

    // Fallback hardcoded experience if DB is empty
    const expList = (experiences && experiences.length > 0) ? experiences : [
        { id: 1, year: '2023 - Present', role: 'Full Stack Developer', company: 'Freelance', description: '' },
        { id: 2, year: '2021 - 2023', role: 'Backend Engineer', company: 'Local IT Agency', description: '' },
        { id: 3, year: '2020 - 2021', role: 'Web Intern', company: 'Tech Solutions', description: '' },
    ];

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
        <IsakLayout title="About Me">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full min-h-[calc(100vh-100px)] lg:py-16"
            >

                {/* Header */}
                <motion.div variants={itemVariants} className="mb-12 md:mb-16">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tighter mb-6 text-white leading-tight">
                        {heading.includes('story.') ? (
                            <>
                                {heading.split('story.')[0]}
                                <span className="text-isak-primary italic font-serif">story.</span>
                            </>
                        ) : heading}
                    </h2>
                </motion.div>

                {/* About Text */}
                <motion.div variants={itemVariants} className="text-isak-textMuted text-base md:text-xl font-body font-light leading-relaxed mb-16 md:mb-20 max-w-3xl">
                    {aboutText}
                </motion.div>

                {/* Skills */}
                <motion.div variants={itemVariants} className="mb-20 md:mb-24">
                    <h3 className="text-2xl md:text-3xl font-medium mb-8 md:mb-10 text-white tracking-tight">Technical Arsenal</h3>
                    <motion.div
                        variants={containerVariants}
                        className="flex flex-wrap gap-3 md:gap-4"
                    >
                        {skills.map(skill => (
                            <motion.span
                                key={skill}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, backgroundColor: '#00DE51', color: '#000', borderColor: '#00DE51' }}
                                className="px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 text-white text-sm md:text-base font-medium transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Experience — dynamic from DB */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl md:text-3xl font-medium mb-8 md:mb-10 text-white tracking-tight">Experience</h3>
                    <motion.div
                        variants={containerVariants}
                        className="space-y-4 md:space-y-6 max-w-4xl"
                    >
                        {expList.map((exp) => (
                            <motion.div
                                key={exp.id}
                                variants={itemVariants}
                                whileHover={{ x: 10 }}
                                className="group flex flex-col md:flex-row md:items-start justify-between p-6 md:p-8 rounded-4xl border border-white/5 bg-isak-card hover:bg-[#222] transition-colors duration-500 cursor-default"
                            >
                                <div className="flex flex-col gap-2 mb-4 md:mb-0">
                                    <span className="text-isak-textMuted font-body text-xs md:text-sm font-light tracking-widest uppercase">{exp.year}</span>
                                    <span className="text-xl md:text-2xl font-medium text-white group-hover:text-isak-primary transition-colors">{exp.role}</span>
                                    {exp.description && (
                                        <p className="text-isak-textMuted font-body text-sm leading-relaxed max-w-lg mt-1">{exp.description}</p>
                                    )}
                                </div>
                                <div className="text-isak-textMuted font-body text-base md:text-lg md:text-right shrink-0">{exp.company}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

            </motion.div>
        </IsakLayout>
    );
}
