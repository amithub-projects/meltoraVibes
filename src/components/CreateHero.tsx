"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function CreateHero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-cream dark:bg-cocoa">
            {/* Background Image - Brighter & More Vibrant */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1606312619070-d48b706521bf?q=80&w=1920&auto=format&fit=crop" // Bright Raspberry/Ruby Chocolate
                    alt="Artisanal Chocolate"
                    fill
                    className="object-cover opacity-80" // Slightly reduced opacity to blend with yummy gradients
                    priority
                />

                {/* Animated Colorful Blobs for 'Yummy' feel */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/20 blur-[120px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -40, 0],
                            y: [0, 60, 0],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
                        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E91E63]/20 blur-[120px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.4, 1],
                            x: [0, 30, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#3E2723]/30 blur-[120px] rounded-full"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/60 to-transparent dark:from-cocoa/95 dark:via-cocoa/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-left px-4 max-w-7xl mx-auto w-full">
                <div className="max-w-2xl">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="block text-gold font-sans font-bold tracking-[0.2em] uppercase mb-4 mt-10 text-sm md:text-base drop-shadow-sm"
                    >
                        Handcrafted in India
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-6xl md:text-8xl text-cocoa dark:text-cream mb-6 leading-tight drop-shadow-lg"
                    >
                        Taste the <br />
                        <span className="italic text-gold">Vibrance.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-cocoa/80 dark:text-cream/90 max-w-lg mb-10 font-light leading-relaxed"
                    >
                        A splash of color, a burst of flavor. Experience chocolate reimagined.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gold text-cocoa font-bold py-4 px-12 rounded-full text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all"
                    >
                        Shop Now
                    </motion.button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cocoa/60 dark:text-cream/60"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto"></div>
                <span className="text-xs tracking-widest mt-2 block font-sans uppercase font-bold">Scroll</span>
            </motion.div>
        </section>
    )
}
