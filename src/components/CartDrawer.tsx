"use client"

import { useProducts } from "@/context/ProductContext"
import { useCart } from "@/context/CartContext"
import { useOrders } from "@/context/OrderContext"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { getWhatsAppUrl } from "@/lib/whatsapp"

export function CartDrawer() {
    const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal, clearCart } = useCart()
    const { addOrder } = useOrders()
    const { contactData } = useProducts()
    const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart')
    const [placedOrder, setPlacedOrder] = useState<any>(null)
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

            setPlacedOrder(newOrder)
            clearCart()
            setStep('success')
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
                                {step !== 'cart' && step !== 'success' && (
                                    <button
                                        onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
                                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-vanilla" />
                                    </button>
                                )}
                                <h2 className="text-2xl font-display font-bold text-vanilla">
                                    {step === 'cart' ? `Your Cart (${cart.reduce((a, b) => a + b.quantity, 0)})` :
                                        step === 'address' ? 'Shipping Details' :
                                            step === 'payment' ? 'Payment Summary' : 'Order Placed!'}
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
                            ) : step === 'success' ? (
                                <div className="text-center space-y-8 py-10">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto scale-125">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-display text-3xl text-vanilla">Thank you, {placedOrder?.customerName}!</h3>
                                        <p className="text-vanilla/60">Your order {placedOrder?.id} has been received.</p>
                                    </div>

                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-4">
                                        <p className="text-sm font-bold text-gold uppercase tracking-widest">Share Order Summary</p>
                                        <p className="text-sm text-vanilla/70">Please click the button below to send your order summary to us on WhatsApp to confirm your order.</p>

                                        <a
                                            href={getWhatsAppUrl(placedOrder, contactData.phone)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center space-x-3 w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all shadow-lg"
                                        >
                                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            <span>Send Order Summary</span>
                                        </a>
                                    </div>

                                    <button
                                        onClick={resetAndClose}
                                        className="text-vanilla/40 hover:text-vanilla transition-colors underline text-sm"
                                    >
                                        Close and return home
                                    </button>
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
                        {cart.length > 0 && step !== 'success' && (
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
