"use client"

import { useState, useEffect } from "react"
import { useProducts, Product } from "@/context/ProductContext"
import { useOrders } from "@/context/OrderContext"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Trash2, Star, Plus, Package, List, ShoppingBag, Image as ImageIcon } from "lucide-react"

export default function AdminPage() {
    const {
        addProduct, products, deleteProduct, categories, addCategory, deleteCategory,
        updateProductFeaturedStatus, promoData, updatePromoData, aboutData, updateAboutData,
        contactData, updateContactData,
        sellerEmail, updateSellerEmail, shopFallbackText, updateShopFallbackText, heroImages, updateHeroImages,
        adminAuth, updateAdminAuth
    } = useProducts()
    const { orders, deleteOrder } = useOrders()
    const [activeTab, setActiveTab] = useState<"products" | "categories" | "orders" | "promotions" | "settings" | "gallery" | "about" | "contact">("products")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loginData, setLoginData] = useState({ userId: "", password: "" })

    // ... existing formData and effects ...
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        desc: "",
        category: categories[0] || "",
        featured: false
    })

    const [promoFormData, setPromoFormData] = useState(promoData)
    const [aboutFormData, setAboutFormData] = useState(aboutData)
    const [contactFormData, setContactFormData] = useState(contactData)
    const [emailFormData, setEmailFormData] = useState(sellerEmail)
    const [shopFallbackFormData, setShopFallbackFormData] = useState(shopFallbackText)
    const [authFormData, setAuthFormData] = useState(adminAuth)
    const [newCategory, setNewCategory] = useState("")

    // Sync form data when context changes
    useEffect(() => {
        setPromoFormData(promoData)
    }, [promoData])

    useEffect(() => {
        setAboutFormData(aboutData)
    }, [aboutData])

    useEffect(() => {
        setContactFormData(contactData)
    }, [contactData])

    useEffect(() => {
        setEmailFormData(sellerEmail)
    }, [sellerEmail])

    useEffect(() => {
        setShopFallbackFormData(shopFallbackText)
    }, [shopFallbackText])

    useEffect(() => {
        setAuthFormData(adminAuth)
    }, [adminAuth])

    // Sync default category when categories load or change
    useEffect(() => {
        if (!formData.category && categories.length > 0) {
            setFormData(prev => ({ ...prev, category: categories[0] }))
        }
    }, [categories, formData.category])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.image) return

        addProduct(formData)
        setFormData({ ...formData, name: "", price: "", image: "", desc: "", featured: false })
        alert("Product added successfully!")
    }

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault()
        if (newCategory.trim()) {
            addCategory(newCategory.trim())
            setNewCategory("")
        }
    }

    const quickAddProduct = (cat: string) => {
        setFormData(prev => ({ ...prev, category: cat }))
        setActiveTab("products")
    }

    const handlePromoSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updatePromoData(promoFormData)
        alert("Promotion updated successfully!")
    }

    const handleAboutSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateAboutData(aboutFormData)
        alert("About Us section updated successfully!")
    }

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateContactData(contactFormData)
        alert("Contact Us section updated successfully!")
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (loginData.userId === adminAuth.userId && loginData.password === adminAuth.password) {
            setIsAuthenticated(true)
        } else {
            alert("Invalid credentials. Please try again.")
        }
    }

    const handleAuthSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!authFormData.userId || !authFormData.password) {
            alert("User ID and Password cannot be empty.")
            return
        }
        updateAdminAuth(authFormData)
        alert("Admin credentials updated successfully!")
    }

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!emailFormData.includes("@")) {
            alert("Please enter a valid email address.")
            return
        }
        updateSellerEmail(emailFormData)
        alert("Seller email updated successfully!")
    }

    const handleShopFallbackSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateShopFallbackText(shopFallbackFormData)
        alert("Shop fallback text updated successfully!")
    }

    const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const fileArray = Array.from(files).slice(0, 6 - heroImages.length)
        if (fileArray.length === 0) {
            alert("Maximum 6 images allowed in gallery.")
            return
        }

        fileArray.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                const img = new (window as any).Image()
                img.src = reader.result
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    const MAX_WIDTH = 1200
                    const MAX_HEIGHT = 800
                    let width = img.width
                    let height = img.height

                    if (width > height) {
                        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                    } else {
                        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                    }
                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8)
                    updateHeroImages([...heroImages, compressedBase64])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const removeHeroImage = (index: number) => {
        const updated = heroImages.filter((_, i) => i !== index)
        updateHeroImages(updated)
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#2A0F0F] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gold/20"
                >
                    <div className="text-center mb-8">
                        <h2 className="font-display text-4xl text-cocoa mb-2">Admin Login</h2>
                        <p className="text-cocoa/60">Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2 ml-1">User ID</label>
                            <input
                                type="text"
                                value={loginData.userId}
                                onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-cocoa/5 border border-cocoa/10 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                placeholder="MeltoraVibes Admin"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-gold mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-cocoa/5 border border-cocoa/10 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-5 bg-gold text-cocoa font-bold text-lg rounded-2xl hover:bg-yellow-500 shadow-lg hover:shadow-xl transition-all"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FFF6EC] pt-24 pb-12 px-4 transition-colors duration-300 text-cocoa">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex-1 min-w-0">
                        <h1 className="font-display text-4xl text-cocoa dark:text-cream">MeltoraVibes Admin</h1>
                        <p className="text-cocoa/60 dark:text-cream/60">Manage your products, categories, and inventory.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-cocoa/10 dark:border-gold/20 shadow-sm text-center">
                            <span className="block text-xs font-bold uppercase tracking-widest text-gold mb-1">Total Items</span>
                            <span className="text-2xl font-display font-bold text-cocoa dark:text-cream">{products.length}</span>
                        </div>
                        <div className="bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-cocoa/10 dark:border-gold/20 shadow-sm text-center">
                            <span className="block text-xs font-bold uppercase tracking-widest text-gold mb-1">Categories</span>
                            <span className="text-2xl font-display font-bold text-cocoa dark:text-cream">{categories.length}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-12 flex-wrap gap-2">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "products" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <Package className="w-4 h-4" />
                        <span className="font-bold">Products</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("categories")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "categories" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <List className="w-4 h-4" />
                        <span className="font-bold">Categories</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("gallery")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "gallery" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <ImageIcon className="w-4 h-4" />
                        <span className="font-bold">Gallery</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "orders" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span className="font-bold">Orders</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("promotions")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "promotions" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <Star className="w-4 h-4" />
                        <span className="font-bold">Promotions</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "about" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span className="font-bold">About Us</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("contact")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "contact" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <List className="w-4 h-4" />
                        <span className="font-bold">Contact Us</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === "settings" ? "bg-gold text-cocoa shadow-md" : "text-cocoa/60 dark:text-cream/60 hover:text-cocoa dark:hover:text-cream"}`}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="font-bold">Settings</span>
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "products" && (
                    <motion.div
                        key="products"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    >
                        {/* Form Section */}
                        <div className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20 sticky top-24 self-start">
                            <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Add New Product</h2>

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
                                        <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                            required
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat} className="bg-cream dark:bg-cocoa">{cat}</option>
                                            ))}
                                        </select>
                                    </div>
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

                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Description</label>
                                    <textarea
                                        value={formData.desc}
                                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        placeholder="Describe the flavor profile..."
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>

                                <div className="flex items-center space-x-3 p-4 bg-gold/5 rounded-xl border border-gold/20">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 rounded accent-gold"
                                    />
                                    <label htmlFor="featured" className="text-cocoa dark:text-cream font-bold cursor-pointer select-none">Mark as Featured Product (Lucrative)</label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0"
                                >
                                    Add to {formData.category || "Collection"}
                                </button>
                            </form>
                        </div>

                        {/* Inventory Section */}
                        <div className="space-y-8">
                            <h3 className="font-display text-2xl text-cocoa dark:text-cream mb-2">Current Inventory ({products.length})</h3>

                            {categories.map(category => {
                                const catProducts = products.filter(p => p.category === category);
                                if (catProducts.length === 0) return null;

                                return (
                                    <div key={category} className="space-y-4">
                                        <h4 className="font-display text-xl text-gold border-b border-gold/20 pb-2">{category}</h4>
                                        <div className="space-y-3">
                                            {catProducts.slice().reverse().map(p => (
                                                <div key={p.id} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-xl border border-cocoa/5 dark:border-white/5 shadow-sm">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-14 h-14 rounded-lg overflow-hidden relative shadow-md">
                                                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-cocoa dark:text-cream flex items-center gap-2">
                                                                {p.name}
                                                                {p.featured && <Star className="w-4 h-4 fill-gold text-gold" />}
                                                            </h4>
                                                            <p className="text-xs text-cocoa/60 dark:text-cream/60">{p.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => updateProductFeaturedStatus(p.id, !p.featured)}
                                                            className={`p-2 rounded-full transition-colors ${p.featured ? "text-gold bg-gold/10" : "text-cocoa/30 dark:text-cream/30"}`}
                                                            title={p.featured ? "Remove from Featured" : "Mark as Featured"}
                                                        >
                                                            <Star className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                                                    deleteProduct(p.id)
                                                                }
                                                            }}
                                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                                            title="Delete product"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}

                            {products.length === 0 && (
                                <div className="text-center py-20 bg-white dark:bg-white/5 rounded-2xl border border-dashed border-cocoa/20 dark:border-white/20">
                                    <p className="text-cocoa/50 dark:text-cream/50">Your inventory is empty.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === "categories" && (
                    <motion.div
                        key="categories"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20 max-w-2xl mx-auto"
                    >
                        <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Manage Categories</h2>

                        <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Add new category (e.g. Brownies)"
                                className="flex-1 px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gold text-cocoa font-bold rounded-lg hover:bg-yellow-500 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </form>

                        <div className="grid grid-cols-1 gap-4">
                            {categories.map(cat => (
                                <div key={cat} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-xl border border-cocoa/10 dark:border-white/10 group animate-fadeIn">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gold/10 rounded-lg">
                                            <List className="w-4 h-4 text-gold" />
                                        </div>
                                        <div>
                                            <span className="text-cocoa dark:text-cream font-bold">{cat}</span>
                                            <p className="text-xs text-cocoa/40 dark:text-cream/40">{products.filter(p => p.category === cat).length} Products</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => quickAddProduct(cat)}
                                            className="flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-lg hover:bg-gold hover:text-cocoa transition-all"
                                        >
                                            <Plus className="w-3 h-3" /> Add Product
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm(`Are you sure you want to delete the category "${cat}"? Products in this category will remain.`)) {
                                                    deleteCategory(cat)
                                                }
                                            }}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete this category"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === "promotions" && (
                    <motion.div
                        key="promotions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-cocoa/10 max-w-2xl mx-auto"
                    >
                        <h2 className="font-display text-2xl text-cocoa mb-6">Scrolling Announcement Settings</h2>

                        <form onSubmit={handlePromoSubmit} className="space-y-6">
                            <div className="flex items-center space-x-3 p-4 bg-gold/5 rounded-xl border border-gold/20 mb-6">
                                <input
                                    type="checkbox"
                                    id="promoActive"
                                    checked={promoFormData.isActive}
                                    onChange={(e) => setPromoFormData({ ...promoFormData, isActive: e.target.checked })}
                                    className="w-5 h-5 rounded accent-gold"
                                />
                                <label htmlFor="promoActive" className="text-cocoa font-bold cursor-pointer select-none">Enable Scrolling Announcement Bars</label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 mb-1">Landing Page Announcement</label>
                                <textarea
                                    value={promoFormData.landingText}
                                    onChange={(e) => setPromoFormData({ ...promoFormData, landingText: e.target.value })}
                                    placeholder="e.g. Welcome to MeltoraVibes!"
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 border border-cocoa/10 text-cocoa focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 mb-1">Shop Section Announcement</label>
                                <textarea
                                    value={promoFormData.shopText}
                                    onChange={(e) => setPromoFormData({ ...promoFormData, shopText: e.target.value })}
                                    placeholder="e.g. Explore our premium chocolates!"
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 border border-cocoa/10 text-cocoa focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 mb-1">Collections Announcement</label>
                                <textarea
                                    value={promoFormData.collectionText}
                                    onChange={(e) => setPromoFormData({ ...promoFormData, collectionText: e.target.value })}
                                    placeholder="e.g. Discover artisanal trays and gifts!"
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 border border-cocoa/10 text-cocoa focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 mb-1">Text Style / Format</label>
                                <select
                                    value={promoFormData.format}
                                    onChange={(e) => setPromoFormData({ ...promoFormData, format: e.target.value as any })}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 border border-cocoa/10 text-cocoa focus:outline-none focus:ring-2 focus:ring-gold"
                                >
                                    <option value="modern">Modern (Sans Serif)</option>
                                    <option value="bold">Bold (Vibrant Impact)</option>
                                    <option value="elegant">Elegant (Classic Script)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all"
                            >
                                Save All Announcements
                            </button>
                        </form>
                    </motion.div>
                )}

                {activeTab === "about" && (
                    <motion.div
                        key="about"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20 max-w-2xl mx-auto"
                    >
                        <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">About Us Section Settings</h2>

                        <form onSubmit={handleAboutSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Section Title</label>
                                <input
                                    type="text"
                                    value={aboutFormData.title}
                                    onChange={(e) => setAboutFormData({ ...aboutFormData, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Subtitle (Accent Text)</label>
                                <input
                                    type="text"
                                    value={aboutFormData.subtitle}
                                    onChange={(e) => setAboutFormData({ ...aboutFormData, subtitle: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Main Description</label>
                                <textarea
                                    value={aboutFormData.description}
                                    onChange={(e) => setAboutFormData({ ...aboutFormData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70">Key Benefits / Features</label>
                                {aboutFormData.benefits.map((benefit, idx) => (
                                    <div key={idx} className="p-4 bg-gold/5 rounded-xl border border-gold/20 space-y-3">
                                        <input
                                            type="text"
                                            value={benefit.title}
                                            onChange={(e) => {
                                                const newBenefits = [...aboutFormData.benefits]
                                                newBenefits[idx].title = e.target.value
                                                setAboutFormData({ ...aboutFormData, benefits: newBenefits })
                                            }}
                                            placeholder="Benefit Title"
                                            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gold/20 text-cocoa dark:text-cream focus:outline-none focus:ring-1 focus:ring-gold"
                                        />
                                        <input
                                            type="text"
                                            value={benefit.desc}
                                            onChange={(e) => {
                                                const newBenefits = [...aboutFormData.benefits]
                                                newBenefits[idx].desc = e.target.value
                                                setAboutFormData({ ...aboutFormData, benefits: newBenefits })
                                            }}
                                            placeholder="Benefit Description"
                                            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gold/20 text-cocoa dark:text-cream focus:outline-none focus:ring-1 focus:ring-gold text-sm"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all"
                            >
                                Save About Us Content
                            </button>
                        </form>
                    </motion.div>
                )}

                {activeTab === "contact" && (
                    <motion.div
                        key="contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20 max-w-2xl mx-auto"
                    >
                        <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Contact Us Section Settings</h2>

                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={contactFormData.title}
                                        onChange={(e) => setContactFormData({ ...contactFormData, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Subtitle</label>
                                    <input
                                        type="text"
                                        value={contactFormData.subtitle}
                                        onChange={(e) => setContactFormData({ ...contactFormData, subtitle: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={contactFormData.email}
                                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={contactFormData.phone}
                                        onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Address</label>
                                <textarea
                                    value={contactFormData.address}
                                    onChange={(e) => setContactFormData({ ...contactFormData, address: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Store Timings</label>
                                <input
                                    type="text"
                                    value={contactFormData.timing}
                                    onChange={(e) => setContactFormData({ ...contactFormData, timing: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Instagram (@handle)</label>
                                    <input
                                        type="text"
                                        value={contactFormData.instagram}
                                        onChange={(e) => setContactFormData({ ...contactFormData, instagram: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Facebook (slug)</label>
                                    <input
                                        type="text"
                                        value={contactFormData.facebook}
                                        onChange={(e) => setContactFormData({ ...contactFormData, facebook: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all"
                            >
                                Save Contact Info
                            </button>
                        </form>
                    </motion.div>
                )}

                {activeTab === "settings" && (
                    <motion.div
                        key="settings"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20 max-w-2xl mx-auto"
                    >
                        <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Seller Settings</h2>

                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="p-4 bg-gold/5 rounded-xl border border-gold/20">
                                <p className="text-sm text-cocoa/60 dark:text-cream/60 mb-4">
                                    Configure the email address where you'll receive new order notifications.
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Seller Notification Email</label>
                                    <input
                                        type="email"
                                        value={emailFormData}
                                        onChange={(e) => setEmailFormData(e.target.value)}
                                        placeholder="e.g. amitchaudhary.net@gmail.com"
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20">
                                <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Shop Section Settings</h2>
                                <p className="text-cocoa/60 dark:text-cream/60 mb-6 text-sm">
                                    Control what users see in the Lucrative Collections section when no products are featured.
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-cocoa/70 dark:text-cream/70 mb-1">Shop Fallback Text (Coming Soon)</label>
                                    <input
                                        type="text"
                                        value={shopFallbackFormData}
                                        onChange={(e) => setShopFallbackFormData(e.target.value)}
                                        placeholder="e.g. Handmade Magic Coming Soon"
                                        className="w-full px-4 py-3 rounded-lg bg-cocoa/5 dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/20 mt-8 mb-8">
                                <h3 className="font-display text-xl text-cocoa dark:text-cream mb-4">Security Settings</h3>
                                <p className="text-sm text-cocoa/60 dark:text-cream/60 mb-6 font-sans">
                                    Update your Admin credentials. These are required for access.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gold dark:text-cream/70">Admin User ID</label>
                                        <input
                                            type="text"
                                            value={authFormData.userId}
                                            onChange={(e) => setAuthFormData({ ...authFormData, userId: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gold dark:text-cream/70">Admin Password</label>
                                        <input
                                            type="password"
                                            value={authFormData.password}
                                            onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/20 border border-cocoa/10 dark:border-white/10 text-cocoa dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAuthSubmit}
                                    className="mt-6 px-8 py-3 bg-cocoa text-cream font-bold rounded-xl hover:bg-cocoa/90 transition-all text-sm shadow-md"
                                >
                                    Update Credentials
                                </button>
                            </div>

                            <button
                                type="submit"
                                onClick={(e) => {
                                    handleEmailSubmit(e);
                                    handleShopFallbackSubmit(e);
                                    handleAuthSubmit(e);
                                }}
                                className="w-full py-4 bg-gold text-cocoa font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all"
                            >
                                Save All Settings
                            </button>
                        </form>
                    </motion.div>
                )}

                {activeTab === "gallery" && (
                    <motion.div
                        key="gallery"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-xl border border-cocoa/10 dark:border-gold/20 max-w-4xl mx-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-display text-2xl text-cocoa dark:text-cream">Hero Gallery (Max 6)</h2>
                            <p className="text-xs text-gold font-bold uppercase tracking-widest">{heroImages.length} / 6 Images</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="p-6 bg-gold/5 rounded-xl border-2 border-dashed border-gold/20">
                                <label className="block text-sm font-bold text-gold mb-4 uppercase tracking-wider">Upload New Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleHeroImageUpload}
                                    disabled={heroImages.length >= 6}
                                    className="w-full text-sm text-cocoa/60 dark:text-cream/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gold file:text-cocoa hover:file:bg-yellow-500 cursor-pointer disabled:opacity-50"
                                />
                                <p className="mt-4 text-xs text-cocoa/40 dark:text-cream/40 italic">
                                    Tip: You can select multiple images at once. Transparent PNGs look best!
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {heroImages.map((img, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    className="relative aspect-square rounded-xl overflow-hidden border border-cocoa/10 dark:border-white/10 group shadow-sm hover:shadow-md transition-all"
                                >
                                    <Image src={img} alt={`Gallery ${index}`} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => removeHeroImage(index)}
                                            className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transform hover:scale-110 transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                            {heroImages.length === 0 && (
                                <div className="col-span-full py-12 text-center text-cocoa/30 dark:text-cream/30 italic">
                                    No images in gallery. Upload some to see them on the landing page!
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === "orders" && (
                    <motion.div
                        key="orders"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h2 className="font-display text-2xl text-cocoa dark:text-cream mb-6">Recent Orders ({orders.length})</h2>

                        {orders.length === 0 ? (
                            <div className="text-center py-20 bg-white dark:bg-white/5 rounded-2xl border border-dashed border-cocoa/20 dark:border-white/20">
                                <ShoppingBag className="w-12 h-12 text-cocoa/20 dark:text-cream/20 mx-auto mb-4" />
                                <p className="text-cocoa/50 dark:text-cream/50">No orders placed yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.slice().reverse().map(order => (
                                    <div key={order.id} className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-md border border-cocoa/10 dark:border-gold/20 overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-cocoa/10 dark:border-white/10">
                                            <div>
                                                <span className="text-gold font-bold text-sm mb-1 block">#{order.id}</span>
                                                <h3 className="text-xl font-bold text-cocoa dark:text-cream">{order.customerName}</h3>
                                                <p className="text-sm text-cocoa/60 dark:text-cream/60">{order.date}</p>
                                            </div>
                                            <div className="text-right flex items-start gap-4">
                                                <div>
                                                    <p className="text-sm text-cocoa/60 dark:text-cream/60">Total Amount</p>
                                                    <p className="text-2xl font-display font-bold text-gold">₹{order.total}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Are you sure you want to delete order #${order.id} for ${order.customerName}? This action cannot be undone.`)) {
                                                            deleteOrder(order.id)
                                                        }
                                                    }}
                                                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                                                    title="Delete Order"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-cocoa/40 dark:text-cream/40 mb-3">Shipping Details</h4>
                                                <p className="text-cocoa dark:text-cream mb-1 font-medium">{order.email}</p>
                                                <p className="text-cocoa/70 dark:text-cream/70 text-sm mb-1">{order.phone}</p>
                                                <p className="text-cocoa/70 dark:text-cream/70 text-sm whitespace-pre-line">{order.address}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-cocoa/40 dark:text-cream/40 mb-3">Order Items</h4>
                                                <div className="space-y-2">
                                                    {order.items.map(item => (
                                                        <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-cocoa/5 dark:bg-white/5 rounded-lg">
                                                            <span className="text-cocoa/80 dark:text-cream/80">
                                                                <span className="font-bold text-cocoa dark:text-cream">{item.quantity}x</span> {item.name}
                                                            </span>
                                                            <span className="font-bold text-gold">{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
