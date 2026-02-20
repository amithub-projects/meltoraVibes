"use client"

import { useProducts } from "@/context/ProductContext"
import { useCart } from "@/context/CartContext"
import { motion } from "framer-motion"
import Image from "next/image"

export function CategorySections() {
    const { products, categories } = useProducts()
    const { addToCart } = useCart()

    return (
        <section id="collections" className="relative py-20 overflow-hidden">
            {/* Transparent to show global dark background */}


            <div className="relative z-10 container mx-auto px-4">
                {categories.map((category) => {
                    const categoryProducts = products.filter(p => p.category === category);
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category} className="mb-20 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                                <div>
                                    <h2 className="font-display text-4xl text-vanilla mb-2 capitalize">
                                        {category}
                                    </h2>
                                    <p className="text-vanilla/80">Discover our handcrafted {category.toLowerCase()} selection.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {categoryProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-cocoa/5 dark:border-white/5 hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="relative h-72 overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                        </div>

                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-display text-2xl text-vanilla font-bold group-hover:text-gold transition-colors">
                                                    {product.name}
                                                </h3>
                                                <span className="text-gold font-bold font-sans text-lg">{product.price}</span>
                                            </div>
                                            <p className="text-sm text-vanilla/70 mb-8 leading-relaxed line-clamp-2">
                                                {product.desc}
                                            </p>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full py-4 bg-gold text-cocoa rounded-2xl font-bold hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
                                            >
                                                Add to Bag
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
