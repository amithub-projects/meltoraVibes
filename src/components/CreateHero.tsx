"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Image as ImageIcon } from "lucide-react"
import { useProducts } from "../context/ProductContext"

export function CreateHero() {
    const { heroImages } = useProducts()

    return (
        <section className="relative min-h-screen w-full bg-cream pt-32 px-4 md:px-8 pb-32 overflow-hidden">
            <div className="max-w-6xl mx-auto h-full">
                {heroImages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 md:gap-y-32">
                        {heroImages.slice(0, 6).map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.8,
                                    ease: [0.21, 0.45, 0.32, 0.9]
                                }}
                                className={`relative group mx-auto w-full max-w-[240px] 
                                    ${index % 2 !== 0 ? 'md:mt-16 lg:mt-24' : ''} 
                                    ${index === 1 || index === 4 ? 'lg:mt-32' : ''}
                                `}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                                    <Image
                                        src={img}
                                        alt={`Handcrafted Creation ${index + 1}`}
                                        fill
                                        className="object-cover transition-all duration-1000 group-hover:scale-110"
                                        priority={index < 2}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Subtle decorative number or accent */}
                                <div className="mt-6 flex items-center justify-between px-2">
                                    <div className="h-[1px] w-8 bg-gold/30" />
                                    <span className="font-display text-gold/40 text-sm tracking-widest italic">MT.0{index + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[60vh] flex items-center justify-center border-2 border-dashed border-gold/20 rounded-[3rem] bg-gold/5">
                        <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gold mx-auto mb-4 opacity-30" />
                            <p className="text-cocoa/40 font-display text-xl">Upload images from Admin Panel to see them here!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/[0.02] -skew-x-12 -z-10 translate-x-1/2" />
        </section>
    )
}
