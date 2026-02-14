"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Product = {
    id: number
    name: string
    price: string
    image: string
    desc: string
}

const defaultProducts: Product[] = [
    {
        id: 1,
        name: "Velvet Truffle",
        price: "₹450",
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop",
        desc: "Dark chocolate ganache dusted with cocoa."
    },
    {
        id: 2,
        name: "Golden Hazelnut",
        price: "₹650",
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop",
        desc: "Roasted hazelnut coated in milk chocolate and gold leaf."
    },
    {
        id: 3,
        name: "Ruby Raspberry",
        price: "₹750",
        image: "https://images.unsplash.com/photo-1606312619070-d48b706521bf?q=80&w=800&auto=format&fit=crop",
        desc: "Tangy raspberry filling in ruby chocolate shells."
    },
    {
        id: 4,
        name: "Sea Salt Caramel",
        price: "₹380",
        image: "https://images.unsplash.com/photo-1511381978815-4f39c4679461?q=80&w=800&auto=format&fit=crop",
        desc: "Gooey caramel with a hint of Maldon sea salt."
    },
    {
        id: 5,
        name: "Mint Noir",
        price: "₹520",
        image: "https://images.unsplash.com/photo-1526081347589-7fa3cbcd1b4b?q=80&w=800&auto=format&fit=crop",
        desc: "Refreshing mint cream encased in 70% dark chocolate."
    }
]

interface ProductContextType {
    products: Product[]
    addProduct: (product: Omit<Product, "id">) => void
    deleteProduct: (id: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(defaultProducts)
    const [isMounted, setIsMounted] = useState(false)

    // Load products from local storage on mount
    useEffect(() => {
        setIsMounted(true)
        const savedProducts = localStorage.getItem("meltora-products")
        if (savedProducts) {
            try {
                const parsed = JSON.parse(savedProducts)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const fixedProducts = parsed.map((p: Product) => ({
                        ...p,
                        price: p.price.replace("$", "₹")
                    }))
                    setProducts(fixedProducts)
                }
            } catch (e) {
                console.error("Failed to parse products", e)
            }
        }
    }, [])

    // Save products to local storage whenever they change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("meltora-products", JSON.stringify(products))
        }
    }, [products, isMounted])

    const addProduct = (newProduct: Omit<Product, "id">) => {
        const formattedPrice = newProduct.price.startsWith("₹")
            ? newProduct.price
            : `₹${newProduct.price}`
        const productWithId = { ...newProduct, price: formattedPrice, id: Date.now() }
        setProducts((prev) => [...prev, productWithId])
    }

    const deleteProduct = (id: number) => {
        setProducts((prev) => prev.filter(p => p.id !== id))
    }

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider")
    }
    return context
}
