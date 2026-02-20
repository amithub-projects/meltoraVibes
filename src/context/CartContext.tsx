"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
    id: number
    name: string
    price: string
    image: string
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (item: Omit<CartItem, "quantity">) => void
    removeFromCart: (id: number) => void
    isCartOpen: boolean
    toggleCart: () => void
    clearCart: () => void
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Load cart from local storage if available
    useEffect(() => {
        const savedCart = localStorage.getItem("meltoravibes-cart")
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Save cart to local storage
    useEffect(() => {
        localStorage.setItem("meltoravibes-cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Omit<CartItem, "quantity">) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const clearCart = () => setCart([])
    const toggleCart = () => setIsCartOpen(!isCartOpen)

    const cartTotal = cart.reduce((total, item) => {
        // Remove all non-numeric characters except decimal point
        const numericString = item.price.replace(/[^0-9.]/g, "")
        const price = parseFloat(numericString) || 0
        return total + price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                isCartOpen,
                toggleCart,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
