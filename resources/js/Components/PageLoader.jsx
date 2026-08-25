import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOADING_STEPS = [
    "Initializing root systems...",
    "Mounting React components...",
    "Establishing WebSocket connections...",
    "Fetching site configuration...",
    "Applying premium styling hashes...",
    "Compiling awesomeness...",
    "System ready."
];

export default function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [lines, setLines] = useState([]);
    const [decodedText, setDecodedText] = useState("");
    const finalWord = "HELLO WORLD";

    useEffect(() => {
        let currentLine = 0;

        // Step 1: Rapidly print terminal lines
        const lineInterval = setInterval(() => {
            if (currentLine < LOADING_STEPS.length) {
                setLines(prev => [...prev, LOADING_STEPS[currentLine]]);
                currentLine++;
            } else {
                clearInterval(lineInterval);
                startDecoding();
            }
        }, 150);

        // Step 2: Decode the final word
        const startDecoding = () => {
            let iteration = 0;
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

            const decodeInterval = setInterval(() => {
                setDecodedText(
                    finalWord
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) return finalWord[index];
                            if (letter === " ") return " ";
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("")
                );

                if (iteration >= finalWord.length) {
                    clearInterval(decodeInterval);
                    setTimeout(() => setLoading(false), 800); // Wait before exiting
                }

                iteration += 1 / 3;
            }, 30);
        };

        return () => clearInterval(lineInterval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[100000] bg-isak-bg flex flex-col items-start justify-end p-8 md:p-16 overflow-hidden"
                >
                    {/* Terminal Lines Container */}
                    <div className="w-full max-w-3xl flex flex-col gap-2 font-mono text-xs md:text-sm text-gray-500 mb-8 md:mb-12">
                        {lines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3"
                            >
                                <span className="text-isak-primary/50 text-[10px]">{(i + 1).toString().padStart(2, '0')}</span>
                                <span className="text-gray-400">~/system:</span>
                                <span>{line}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Hacker Decoding Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: decodedText ? 1 : 0 }}
                        className="w-full mt-4 flex items-center mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-isak-primary font-mono text-4xl md:text-7xl font-bold tracking-widest shrink-0">
                                {">"}
                            </span>
                            <span className="text-white font-mono text-4xl md:text-7xl font-bold tracking-widest" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
                                {decodedText || " "}
                            </span>
                            {/* Blinking Cursor */}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-6 h-12 md:w-10 md:h-16 bg-isak-primary ml-2"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
