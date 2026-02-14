"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductContext"

export function ProductScroll() {
    const { addToCart } = useCart()
    const { products } = useProducts()

    // Duplicate products to create a seamless loop (4x for wide screens)
    const marqueeProducts = [...products, ...products, ...products, ...products]

    return (
        <section className="py-20 bg-cream dark:bg-cocoa overflow-hidden">
            <div className="container mx-auto px-4 mb-10">
                <h2 className="font-display text-4xl md:text-5xl text-cocoa dark:text-cream mb-4">Signature Collection</h2>
                <p className="text-cocoa/70 dark:text-cream/70 max-w-xl">From our kitchen to your soul, explore our award-winning creations.</p>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream dark:from-cocoa to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream dark:from-cocoa to-transparent z-10"></div>

                <motion.div
                    className="flex space-x-8"
                    animate={{ x: "-25%" }} // Move by 25% (since we have 4 sets, 1 set = 25%)
                    transition={{
                        duration: 30, // Adjust speed
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {marqueeProducts.map((cho, i) => (
                        <div
                            key={`${cho.id}-${i}`}
                            className="flex-shrink-0 w-[300px] md:w-[350px]"
                        >
                            <div className="group relative bg-white/40 dark:bg-[#3E2C24]/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5">
                                {/* Image Area */}
                                <div className="relative h-[350px] w-full">
                                    <Image
                                        src={cho.image}
                                        alt={cho.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    {/* Quick Add Button */}
                                    <button
                                        onClick={() => addToCart(cho)}
                                        className="absolute bottom-6 right-6 bg-gold text-cocoa p-4 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.5)] font-bold cursor-pointer hover:scale-110 active:scale-95 z-10"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>

                                    <div className="absolute bottom-6 left-6 text-cream">
                                        <h3 className="font-display text-2xl font-bold mb-1 drop-shadow-md">{cho.name}</h3>
                                        <p className="text-sm text-gold font-sans font-bold tracking-wider">{cho.price}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-10">
                                    <p className="text-sm text-cocoa/80 dark:text-cream/80 leading-relaxed font-light">{cho.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
