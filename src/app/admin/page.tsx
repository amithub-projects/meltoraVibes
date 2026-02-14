"use client"

import { useState } from "react"
import { useProducts } from "@/context/ProductContext"
import { motion } from "framer-motion"
import Image from "next/image"
import { Trash2 } from "lucide-react"

export default function AdminPage() {
    const { addProduct, products, deleteProduct } = useProducts()
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        desc: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.image) return

        addProduct(formData)
        setFormData({ name: "", price: "", image: "", desc: "" })
        alert("Product added successfully!")
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-cocoa pt-24 pb-12 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20"
                >
                    <h1 className="font-display text-3xl text-cocoa dark:text-cream mb-6">Add New Product</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Product Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Midnight Truffle"
                                className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Price (₹)</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="₹0.00"
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            const reader = new FileReader()
                                            reader.onloadend = () => {
                                                setFormData({ ...formData, image: reader.result as string })
                                            }
                                            reader.readAsDataURL(file)
                                        }
                                    }}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-cocoa hover:file:bg-yellow-500"
                                    required={!formData.image}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Description</label>
                            <textarea
                                value={formData.desc}
                                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                placeholder="Describe the flavor profile..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0"
                        >
                            Add to Collection
                        </button>
                    </form>
                </motion.div>

                {/* Preview Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Live Preview</h2>

                    <div className="w-[350px] mx-auto bg-white dark:bg-[#3E2C24] rounded-2xl overflow-hidden shadow-2xl border border-gold/10">
                        <div className="relative h-[300px] w-full bg-cocoa/5">
                            {formData.image ? (
                                <Image
                                    src={formData.image}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-cocoa/30 dark:text-cream/30">
                                    Image Preview
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display text-xl text-cocoa dark:text-cream font-bold">{formData.name || "Product Name"}</h3>
                                <span className="text-gold font-bold font-sans">
                                    {formData.price
                                        ? (formData.price.startsWith("₹") ? formData.price : `₹${formData.price}`)
                                        : "₹0.00"}
                                </span>
                            </div>
                            <p className="text-sm text-cocoa/60 dark:text-cream/60">{formData.desc || "Product description will appear here..."}</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h3 className="font-display text-xl text-cocoa dark:text-cream mb-4">Current Inventory ({products.length})</h3>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {products.slice().reverse().map(p => (
                                <div key={p.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-cocoa/5 dark:border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                                        </div>
                                        <span className="font-bold text-cocoa dark:text-cream">{p.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gold text-sm">{p.price}</span>
                                        <button
                                            onClick={() => {
                                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                                    deleteProduct(p.id)
                                                }
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                            title="Delete product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
