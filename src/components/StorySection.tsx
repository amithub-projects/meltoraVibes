"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useProducts } from "@/context/ProductContext"

import { useState, useEffect } from "react"

export function StorySection() {
    const { promoData, hasLoaded } = useProducts()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const isReady = isMounted && hasLoaded

    const formatStyles = {
        modern: "font-sans font-light tracking-tight text-vanilla/90",
        bold: "font-display font-black tracking-widest uppercase text-gold drop-shadow-lg",
        elegant: "font-display italic tracking-wide text-vanilla/80"
    }

    return (
        <section id="story" className="relative min-h-[90vh] flex items-center justify-center text-vanilla overflow-hidden">
            <div className="absolute inset-0 z-0">
                {/* Subtle decorative glows */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 py-24">
                <div className={`grid grid-cols-1 ${isReady && promoData?.isActive ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto text-center'} gap-16 items-center`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={isReady && promoData?.isActive ? "text-left text-vanilla" : "text-white"}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="block text-gold font-sans font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base"
                        >
                            Our Heritage
                        </motion.span>

                        <h2 className={`font-display ${isReady && promoData?.isActive ? 'text-5xl md:text-7xl' : 'text-6xl md:text-8xl'} text-gold mb-8`}>Our Story</h2>

                        <p className={`text-xl ${isReady && promoData?.isActive ? 'text-lg md:text-xl' : 'md:text-2xl'} text-vanilla/90 leading-relaxed font-sans mb-12`}>
                            Born from a single copper pot and a vision for pure, unadulterated luxury, MeltoraVibes is an exploration of flavor, texture, and emotion in handcrafted chocolate.
                        </p>

                        <div className={`grid grid-cols-1 ${isReady && promoData?.isActive ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-6 text-left`}>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                <h3 className="text-gold font-bold mb-1">Ethically Sourced</h3>
                                <p className="text-vanilla/60 text-sm">Sustainable and fair cocoa practices.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                <h3 className="text-gold font-bold mb-1">Artisanal Method</h3>
                                <p className="text-vanilla/60 text-sm">Hand-tempered by master chocolatiers.</p>
                            </div>
                            {(!isReady || !promoData?.isActive) && (
                                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                    <h3 className="text-gold font-bold mb-1">Pure Ingredients</h3>
                                    <p className="text-vanilla/60 text-sm">No artificial preservatives.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Promo Section - Only displayed if isActive is true */}
                    {isReady && promoData?.isActive && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="relative group lg:ml-auto"
                        >
                            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold/20">
                                {promoData.image ? (
                                    <img
                                        src={promoData.image}
                                        alt="Seasonal Promotion"
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gold/10 flex items-center justify-center">
                                        <p className="text-gold tracking-widest font-sans font-bold">MELTORA PROMO</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

                                <div className="absolute bottom-10 left-10 right-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <p className={`${formatStyles[promoData.format || 'modern']} text-3xl md:text-4xl leading-tight`}>
                                            {promoData.text}
                                        </p>
                                        <div className="h-1 w-20 bg-gold mt-6 group-hover:w-32 transition-all duration-500" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Decorative elements for promo */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/10 blur-3xl rounded-full" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 blur-3xl rounded-full" />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
