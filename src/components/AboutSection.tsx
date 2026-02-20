"use client"

import { motion } from "framer-motion"
import { useProducts } from "@/context/ProductContext"
import { useState, useEffect } from "react"

export function AboutSection() {
    const { aboutData, hasLoaded } = useProducts()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted || !hasLoaded) return null

    return (
        <section id="about" className="relative min-h-[90vh] flex items-center justify-center text-vanilla overflow-hidden bg-cream/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
            </div>

            <div className="container relative z-10 mx-auto px-4 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="block text-gold font-sans font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base"
                        >
                            {aboutData.subtitle}
                        </motion.span>

                        <h2 className="font-display text-6xl md:text-8xl text-gold mb-8">
                            {aboutData.title}
                        </h2>

                        <p className="text-xl md:text-2xl text-vanilla/90 leading-relaxed font-sans mb-16 max-w-3xl mx-auto">
                            {aboutData.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {aboutData.benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-gold/30 transition-all group"
                                >
                                    <h3 className="text-gold font-display text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-vanilla/60 text-sm leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
