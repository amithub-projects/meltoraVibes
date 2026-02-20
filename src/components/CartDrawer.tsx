"use client"

import { useProducts } from "@/context/ProductContext"
import { useCart } from "@/context/CartContext"
import { useOrders } from "@/context/OrderContext"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { sendOrderEmail } from "@/lib/email"

export function CartDrawer() {
    const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal, clearCart } = useCart()
    const { addOrder } = useOrders()
    const { sellerEmail } = useProducts()
    const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart')
    const [addressData, setAddressData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: ""
    })

    const handleCheckout = async () => {
        if (step === 'cart') {
            setStep('address')
        } else if (step === 'address') {
            if (!addressData.name || !addressData.email || !addressData.phone || !addressData.address || !addressData.city) {
                alert("Please fill in all shipping details, including mobile number.")
                return
            }
            setStep('payment')
        } else if (step === 'payment') {
            // Save the order
            const newOrder = addOrder({
                customerName: addressData.name,
                email: addressData.email,
                phone: addressData.phone,
                address: `${addressData.address}, ${addressData.city}`,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: parseFloat(cartTotal.toFixed(2))
            })

            // Trigger email notification
            await sendOrderEmail(newOrder, sellerEmail)

            alert(`Thank you ${addressData.name}! Order ${newOrder.id} has been placed. Order details have been sent to ${addressData.email}.`)
            clearCart()
            setStep('cart')
            toggleCart()
        }
    }

    const resetAndClose = () => {
        setStep('cart')
        toggleCart()
    }

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-cream shadow-2xl z-[70] flex flex-col border-l border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-cocoa/10 dark:border-white/10">
                            <div className="flex items-center space-x-4">
                                {step !== 'cart' && (
                                    <button
                                        onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
                                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-vanilla" />
                                    </button>
                                )}
                                <h2 className="text-2xl font-display font-bold text-vanilla">
                                    {step === 'cart' ? `Your Cart (${cart.reduce((a, b) => a + b.quantity, 0)})` :
                                        step === 'address' ? 'Shipping Details' : 'Payment Summary'}
                                </h2>
                            </div>
                            <button
                                onClick={resetAndClose}
                                className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6 text-cocoa dark:text-cream" />
                            </button>
                        </div>

                        {/* Items / Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {step === 'cart' ? (
                                <div className="space-y-6">
                                    {cart.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-cocoa/50 dark:text-cream/50 space-y-4">
                                            <ShoppingBag className="w-16 h-16 opacity-20" />
                                            <p className="text-lg">Your cart is empty.</p>
                                            <button
                                                onClick={toggleCart}
                                                className="text-gold font-bold hover:underline"
                                            >
                                                Start Shopping
                                            </button>
                                        </div>
                                    ) : (
                                        cart.map((item) => (
                                            <div key={item.id} className="flex items-start space-x-4">
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-display font-bold text-vanilla">{item.name}</h3>
                                                    <p className="text-sm text-vanilla/60">{item.price}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-xs bg-cocoa/10 dark:bg-white/10 px-2 py-1 rounded">Qty: {item.quantity}</span>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                            aria-label="Remove item"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : step === 'address' ? (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-vanilla/70 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={addressData.name}
                                                onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                                                placeholder="e.g. Rahul Sharma"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-vanilla focus:outline-none focus:ring-2 focus:ring-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-vanilla/70 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={addressData.email}
                                                onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
                                                placeholder="rahul@example.com"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-vanilla focus:outline-none focus:ring-2 focus:ring-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-vanilla/70 mb-1">Mobile Number</label>
                                            <input
                                                type="tel"
                                                value={addressData.phone}
                                                onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-vanilla focus:outline-none focus:ring-2 focus:ring-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-vanilla/70 mb-1">Shipping Address</label>
                                            <textarea
                                                value={addressData.address}
                                                onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                                                placeholder="Plot No. 123, Sector 4..."
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-vanilla focus:outline-none focus:ring-2 focus:ring-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-vanilla/70 mb-1">City</label>
                                            <input
                                                type="text"
                                                value={addressData.city}
                                                onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                                                placeholder="Mumbai"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-vanilla focus:outline-none focus:ring-2 focus:ring-gold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="bg-cocoa/5 dark:bg-white/5 p-4 rounded-xl border border-cocoa/10 dark:border-white/10">
                                        <h3 className="font-bold text-vanilla mb-2">Delivery to:</h3>
                                        <p className="text-sm text-vanilla/80">{addressData.name} ({addressData.phone})</p>
                                        <p className="text-sm text-vanilla/60">{addressData.address}, {addressData.city}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-bold text-vanilla">Order Summary:</h3>
                                        {cart.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span className="text-vanilla/70">{item.name} x {item.quantity}</span>
                                                <span className="font-bold text-vanilla">{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-cocoa/10 dark:border-white/10 bg-white/50 dark:bg-black/20">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-sans text-lg text-vanilla/80">
                                        {step === 'payment' ? 'Total Amount' : 'Subtotal'}
                                    </span>
                                    <span className="font-display text-2xl font-bold text-gold">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0"
                                >
                                    {step === 'cart' ? 'Checkout Securely' :
                                        step === 'address' ? 'Continue to Payment' : 'Pay Now'}
                                </button>
                                <p className="text-xs text-center mt-4 text-vanilla/40">
                                    {step === 'payment' ? 'Demo mode: Click Pay to complete purchase' : 'Secured by Stripe (Demo Mode)'}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
