"use client"

import { useProducts } from "../context/ProductContext"
import { motion } from "framer-motion"

export function AnnouncementBar({ type }: { type: 'landing' | 'shop' | 'collection' }) {
    const { promoData, hasLoaded } = useProducts()

    if (!hasLoaded || !promoData.isActive) return null

    const text = type === 'landing' ? promoData.landingText :
        type === 'shop' ? promoData.shopText :
            promoData.collectionText

    if (!text) return null

    return (
        <div className="relative z-50 w-full bg-gold/10 backdrop-blur-md border-y border-gold/20 py-3 overflow-hidden">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex shrink-0 items-center"
                >
                    {/* Repeat the text multiple times for seamless scrolling */}
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <span className={`px-12 text-sm font-bold tracking-[0.2em] uppercase text-beige
                                ${promoData.format === 'modern' ? 'font-sans' : ''}
                                ${promoData.format === 'bold' ? 'font-display text-lg' : ''}
                                ${promoData.format === 'elegant' ? 'font-display italic' : ''}
                            `}>
                                {text}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-gold/40" />
                        </div>
                    ))}
                </motion.div>

                {/* Second instance for seamless loop */}
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex shrink-0 items-center"
                >
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <span className={`px-12 text-sm font-bold tracking-[0.2em] uppercase text-beige
                                ${promoData.format === 'modern' ? 'font-sans' : ''}
                                ${promoData.format === 'bold' ? 'font-display text-lg' : ''}
                                ${promoData.format === 'elegant' ? 'font-display italic' : ''}
                            `}>
                                {text}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-gold/40" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
