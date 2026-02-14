"use client"

import { useProducts } from "@/context/ProductContext"
import { useCart } from "@/context/CartContext"
import { motion } from "framer-motion"
import Image from "next/image"

export default function CollectionsPage() {
    const { products } = useProducts()
    const { addToCart } = useCart()

    return (
        <div className="min-h-screen bg-cream dark:bg-cocoa pt-24 pb-12 px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl text-cocoa dark:text-cream mb-4"
                    >
                        Our Signature Collections
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-cocoa/70 dark:text-cream/70 text-lg max-w-2xl mx-auto"
                    >
                        Explore our full range of handcrafted artisanal chocolates.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((cho, i) => (
                        <motion.div
                            key={cho.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#3E2C24] rounded-2xl overflow-hidden shadow-lg border border-cocoa/5 dark:border-gold/10 group"
                        >
                            <div className="relative h-[150px] w-full overflow-hidden">
                                <Image
                                    src={cho.image}
                                    alt={cho.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-2xl text-cocoa dark:text-cream font-bold">{cho.name}</h3>
                                    <span className="text-gold font-bold font-sans text-lg">{cho.price}</span>
                                </div>
                                <p className="text-sm text-cocoa/70 dark:text-cream/70 mb-6 leading-relaxed">
                                    {cho.desc}
                                </p>
                                <button
                                    onClick={() => addToCart(cho)}
                                    className="w-full py-3 bg-cocoa text-cream dark:bg-gold dark:text-cocoa rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
