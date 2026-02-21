"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductContext"
import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()
    const isAdminPage = pathname === "/admin"
    const [isOpen, setIsOpen] = useState(false)
    const { toggleCart, cart } = useCart()
    const { brandLogo } = useProducts()
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 dark:bg-cocoa/80 backdrop-blur-md border-b border-cocoa/10 dark:border-gold/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-vanilla hover:text-gold transition-colors">
                        {brandLogo && (
                            <div className="relative w-8 h-8 flex-shrink-0">
                                <Image src={brandLogo} alt="Brand logo" fill className="object-contain" />
                            </div>
                        )}
                        MeltoraVibes
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!isAdminPage && (
                            <>
                                <Link href="/" className="text-vanilla/80 hover:text-gold transition-colors font-medium">Home</Link>
                                <Link href="/#shop" className="text-vanilla/80 hover:text-gold transition-colors font-medium">Shop</Link>
                                <Link href="/#collections" className="text-vanilla/80 hover:text-gold transition-colors font-medium">Collections</Link>
                                <Link href="/#about" className="text-vanilla/80 hover:text-gold transition-colors font-medium">About Us</Link>
                                <Link href="/#contact" className="text-vanilla/80 hover:text-gold transition-colors font-medium">Contact Us</Link>
                            </>
                        )}

                        <div className="flex items-center space-x-4 ml-4 border-l border-cocoa/10 dark:border-cream/10 pl-4">
                            <ThemeToggle />
                            <button
                                onClick={toggleCart}
                                className="relative p-2 text-cocoa dark:text-cream hover:text-gold transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5 text-vanilla" />
                                {itemCount > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-cocoa text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-cocoa dark:text-cream"
                        >
                            {isOpen ? <X className="w-6 h-6 text-vanilla" /> : <Menu className="w-6 h-6 text-vanilla" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cream dark:bg-cocoa border-b border-cocoa/10 dark:border-gold/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {!isAdminPage && (
                                <>
                                    <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-vanilla hover:bg-white/5 rounded-lg">Home</Link>
                                    <Link href="/#shop" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-vanilla hover:bg-white/5 rounded-lg">Shop</Link>
                                    <Link href="/#collections" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-vanilla hover:bg-white/5 rounded-lg">Collections</Link>
                                    <Link href="/#about" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-vanilla hover:bg-white/5 rounded-lg">About Us</Link>
                                    <Link href="/#contact" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-vanilla hover:bg-white/5 rounded-lg">Contact Us</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
