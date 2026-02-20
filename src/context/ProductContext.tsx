"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Product = {
    id: number
    name: string
    price: string
    image: string
    desc: string
    category: string
    featured: boolean
}

export type PromoData = {
    landingText: string
    text: string
    image: string
    shopText: string
    collectionText: string
    format: 'modern' | 'bold' | 'elegant'
    isActive: boolean
}
export type AboutData = {
    title: string
    subtitle: string
    description: string
    benefits: { title: string; desc: string }[]
}

export type ContactData = {
    title: string
    subtitle: string
    email: string
    phone: string
    address: string
    timing: string
    instagram: string
    facebook: string
}

export type AdminAuth = {
    userId: string
    password: string
}

const defaultProducts: Product[] = [
    {
        id: 1,
        name: "Velvet Truffle",
        price: "₹450",
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop",
        desc: "Dark chocolate ganache dusted with cocoa.",
        category: "Truffles",
        featured: true
    },
    {
        id: 2,
        name: "Golden Hazelnut",
        price: "₹650",
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop",
        desc: "Roasted hazelnut coated in milk chocolate and gold leaf.",
        category: "Nuts",
        featured: true
    },
    {
        id: 3,
        name: "Ruby Raspberry",
        price: "₹750",
        image: "https://images.unsplash.com/photo-1606312619070-d48b706521bf?q=80&w=800&auto=format&fit=crop",
        desc: "Tangy raspberry filling in ruby chocolate shells.",
        category: "Fruit",
        featured: false
    },
    {
        id: 4,
        name: "Sea Salt Caramel",
        price: "₹380",
        image: "https://images.unsplash.com/photo-1511381978815-4f39c4679461?q=80&w=800&auto=format&fit=crop",
        desc: "Gooey caramel with a hint of Maldon sea salt.",
        category: "Caramel",
        featured: true
    },
    {
        id: 5,
        name: "Mint Noir",
        price: "₹520",
        image: "https://images.unsplash.com/photo-1526081347589-7fa3cbcd1b4b?q=80&w=800&auto=format&fit=crop",
        desc: "Refreshing mint cream encased in 70% dark chocolate.",
        category: "Mint",
        featured: false
    }
]

const defaultCategories = ["Truffles", "Nuts", "Fruit", "Caramel", "Mint", "Dark Chocolate", "Milk Chocolate"]

interface ProductContextType {
    products: Product[]
    categories: string[]
    addProduct: (product: Omit<Product, "id">) => void
    deleteProduct: (id: number) => void
    addCategory: (category: string) => void
    deleteCategory: (category: string) => void
    updateProductFeaturedStatus: (id: number, featured: boolean) => void
    promoData: PromoData
    updatePromoData: (data: PromoData) => void
    aboutData: AboutData
    updateAboutData: (data: AboutData) => void
    hasLoaded: boolean
    sellerEmail: string
    updateSellerEmail: (email: string) => void
    shopFallbackText: string
    updateShopFallbackText: (text: string) => void
    heroImages: string[]
    updateHeroImages: (images: string[]) => void
    contactData: ContactData
    updateContactData: (data: ContactData) => void
    adminAuth: AdminAuth
    updateAdminAuth: (auth: AdminAuth) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(defaultProducts)
    const [categories, setCategories] = useState<string[]>(defaultCategories)
    const [promoData, setPromoData] = useState<PromoData>({
        landingText: "",
        text: "",
        image: "",
        shopText: "",
        collectionText: "",
        format: 'modern',
        isActive: false
    })
    const [aboutData, setAboutData] = useState<AboutData>({
        title: "Our Story",
        subtitle: "Our Heritage",
        description: "Born from a single copper pot and a vision for pure, unadulterated luxury, MeltoraVibes is an exploration of flavor, texture, and emotion in handcrafted chocolate.",
        benefits: [
            { title: "Ethically Sourced", desc: "Sustainable and fair cocoa practices." },
            { title: "Artisanal Method", desc: "Hand-tempered by master chocolatiers." },
            { title: "Pure Ingredients", desc: "No artificial preservatives." }
        ]
    })
    const [sellerEmail, setSellerEmail] = useState("amitchaudhary.net@gmail.com")
    const [shopFallbackText, setShopFallbackText] = useState("Coming Soon")
    const [heroImages, setHeroImages] = useState<string[]>([])
    const [contactData, setContactData] = useState<ContactData>({
        title: "Contact Us",
        subtitle: "Get in Touch",
        email: "amitchaudhary.net@gmail.com",
        phone: "+91 98765 43210",
        address: "123 Chocolate Street, Gourmet Lane, Mumbai, Maharashtra 400001",
        timing: "Mon - Sat: 10:00 AM - 8:00 PM",
        instagram: "meltoravibes",
        facebook: "meltoravibes"
    })
    const [adminAuth, setAdminAuth] = useState<AdminAuth>({
        userId: "admin",
        password: "password123"
    })
    const [isMounted, setIsMounted] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        setIsMounted(true)
        const loadSavedData = () => {
            try {
                const savedProducts = localStorage.getItem("meltoravibes-products")
                if (savedProducts) {
                    const parsed = JSON.parse(savedProducts)
                    if (Array.isArray(parsed)) setProducts(parsed)
                }

                const savedCategories = localStorage.getItem("meltoravibes-categories")
                if (savedCategories) {
                    const parsed = JSON.parse(savedCategories)
                    if (Array.isArray(parsed)) setCategories(parsed)
                }

                const savedPromo = localStorage.getItem("meltoravibes-promo")
                if (savedPromo) {
                    const parsed = JSON.parse(savedPromo)
                    setPromoData(prev => ({
                        ...prev,
                        landingText: parsed.landingText !== undefined ? parsed.landingText : (parsed.text || ""),
                        shopText: parsed.shopText !== undefined ? parsed.shopText : "",
                        collectionText: parsed.collectionText !== undefined ? parsed.collectionText : "",
                        format: parsed.format || 'modern',
                        isActive: parsed.isActive ?? false
                    }))
                }

                const savedAbout = localStorage.getItem("meltoravibes-about")
                if (savedAbout) {
                    setAboutData(JSON.parse(savedAbout))
                }

                const savedEmail = localStorage.getItem("meltoravibes-seller-email")
                if (savedEmail) {
                    setSellerEmail(savedEmail)
                }

                const savedFallback = localStorage.getItem("meltoravibes-shop-fallback")
                if (savedFallback) {
                    setShopFallbackText(savedFallback)
                }

                const savedHeroImages = localStorage.getItem("meltoravibes-hero-images")
                if (savedHeroImages) {
                    const parsed = JSON.parse(savedHeroImages)
                    if (Array.isArray(parsed)) setHeroImages(parsed)
                }

                const savedContact = localStorage.getItem("meltoravibes-contact")
                if (savedContact) {
                    setContactData(JSON.parse(savedContact))
                }

                const savedAuth = localStorage.getItem("meltoravibes-admin-auth")
                if (savedAuth) {
                    setAdminAuth(JSON.parse(savedAuth))
                }
            } catch (e) {
                console.error("Failed to load data from localStorage:", e)
            } finally {
                setHasLoaded(true)
            }
        }
        loadSavedData()
    }, [])

    // Listen for storage events to sync across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "meltoravibes-promo" && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue)
                    setPromoData(prev => ({
                        ...prev,
                        landingText: parsed.landingText !== undefined ? parsed.landingText : (parsed.text || ""),
                        shopText: parsed.shopText !== undefined ? parsed.shopText : "",
                        collectionText: parsed.collectionText !== undefined ? parsed.collectionText : "",
                        format: parsed.format || 'modern',
                        isActive: parsed.isActive ?? false
                    }))
                } catch (err) {
                    console.error("Failed to sync promo data across tabs", err)
                }
            }
            if (e.key === "meltoravibes-products" && e.newValue) {
                try {
                    setProducts(JSON.parse(e.newValue))
                } catch (err) {
                    console.error("Failed to sync products across tabs", err)
                }
            }
            if (e.key === "meltoravibes-categories" && e.newValue) {
                try {
                    setCategories(JSON.parse(e.newValue))
                } catch (err) {
                    console.error("Failed to sync categories across tabs", err)
                }
            }
            if (e.key === "meltoravibes-seller-email" && e.newValue) {
                setSellerEmail(e.newValue)
            }
            if (e.key === "meltoravibes-shop-fallback" && e.newValue) {
                setShopFallbackText(e.newValue)
            }
            if (e.key === "meltoravibes-hero-images" && e.newValue) {
                try {
                    setHeroImages(JSON.parse(e.newValue))
                } catch (err) {
                    console.error("Failed to sync hero images across tabs", err)
                }
            }
            if (e.key === "meltoravibes-about" && e.newValue) {
                try {
                    setAboutData(JSON.parse(e.newValue))
                } catch (err) {
                    console.error("Failed to sync about data across tabs", err)
                }
            }
            if (e.key === "meltoravibes-contact" && e.newValue) {
                try {
                    setContactData(JSON.parse(e.newValue))
                } catch (err) {
                    console.error("Failed to sync contact data across tabs", err)
                }
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    // Combined persistence effect to ensure order and catch errors
    useEffect(() => {
        if (isMounted && hasLoaded) {
            try {
                localStorage.setItem("meltoravibes-products", JSON.stringify(products))
                localStorage.setItem("meltoravibes-categories", JSON.stringify(categories))
                localStorage.setItem("meltoravibes-promo", JSON.stringify(promoData))
                localStorage.setItem("meltoravibes-about", JSON.stringify(aboutData))
                localStorage.setItem("meltoravibes-seller-email", sellerEmail)
                localStorage.setItem("meltoravibes-shop-fallback", shopFallbackText)
                localStorage.setItem("meltoravibes-hero-images", JSON.stringify(heroImages))
                localStorage.setItem("meltoravibes-contact", JSON.stringify(contactData))
                localStorage.setItem("meltoravibes-admin-auth", JSON.stringify(adminAuth))
            } catch (e) {
                console.error("Failed to save data to localStorage:", e)
                if (e instanceof Error && e.name === 'QuotaExceededError') {
                    console.warn("Storage quota exceeded! Image data might be too large.")
                }
            }
        }
    }, [products, categories, promoData, aboutData, isMounted, hasLoaded, sellerEmail, shopFallbackText, heroImages, contactData, adminAuth])

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

    const addCategory = (category: string) => {
        if (!categories.includes(category)) {
            setCategories((prev) => [...prev, category])
        }
    }

    const deleteCategory = (category: string) => {
        setCategories((prev) => prev.filter(c => c !== category))
    }

    const updateProductFeaturedStatus = (id: number, featured: boolean) => {
        setProducts((prev) => prev.map(p => p.id === id ? { ...p, featured } : p))
    }

    const updatePromoData = (data: PromoData) => {
        setPromoData(data)
    }

    const updateSellerEmail = (email: string) => {
        setSellerEmail(email)
    }

    const updateShopFallbackText = (text: string) => {
        setShopFallbackText(text)
    }

    const updateHeroImages = (images: string[]) => {
        setHeroImages(images)
    }

    return (
        <ProductContext.Provider value={{
            products,
            categories,
            addProduct,
            deleteProduct,
            addCategory,
            deleteCategory,
            updateProductFeaturedStatus,
            promoData,
            updatePromoData,
            aboutData,
            updateAboutData: setAboutData,
            hasLoaded,
            sellerEmail,
            updateSellerEmail,
            shopFallbackText,
            updateShopFallbackText,
            heroImages,
            updateHeroImages,
            contactData,
            updateContactData: setContactData,
            adminAuth,
            updateAdminAuth: setAdminAuth
        }}>
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
