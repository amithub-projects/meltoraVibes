"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type OrderItem = {
    id: number
    name: string
    price: string
    quantity: number
}

export type Order = {
    id: string
    customerName: string
    email: string
    phone: string
    address: string
    items: OrderItem[]
    total: number
    date: string
}

interface OrderContextType {
    orders: Order[]
    addOrder: (order: Omit<Order, "id" | "date">) => Order
    deleteOrder: (id: string) => void
    clearOrders: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([])
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const savedOrders = localStorage.getItem("meltoravibes-orders")
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders))
            } catch (e) {
                console.error("Failed to parse orders", e)
            }
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("meltoravibes-orders", JSON.stringify(orders))
        }
    }, [orders, isMounted])

    const addOrder = (orderData: Omit<Order, "id" | "date">) => {
        const newOrder: Order = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            date: new Date().toLocaleString()
        }
        setOrders((prev) => [...prev, newOrder])
        return newOrder
    }

    const deleteOrder = (id: string) => {
        setOrders((prev) => prev.filter(o => o.id !== id))
    }

    const clearOrders = () => {
        setOrders([])
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder, deleteOrder, clearOrders }}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrderContext)
    if (context === undefined) {
        throw new Error("useOrders must be used within an OrderProvider")
    }
    return context
}
