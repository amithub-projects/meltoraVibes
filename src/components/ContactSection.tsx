"use client"

import { motion } from "framer-motion"
import { useProducts } from "@/context/ProductContext"
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react"

export function ContactSection() {
    const { contactData, hasLoaded } = useProducts()

    if (!hasLoaded) return null

    return (
        <section id="contact" className="relative py-24 bg-cream transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-gold font-sans font-bold tracking-[0.3em] uppercase text-sm block mb-4"
                        >
                            {contactData.subtitle}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="font-display text-5xl md:text-6xl text-cocoa mb-6"
                        >
                            {contactData.title}
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="bg-white p-8 rounded-3xl border border-cocoa/5 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-display text-xl text-cocoa mb-2">Email Us</h3>
                                <p className="text-cocoa/60 mb-4 text-sm">Our friendly team is here to help.</p>
                                <a href={`mailto:${contactData.email}`} className="text-gold font-bold hover:underline transition-all">
                                    {contactData.email}
                                </a>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-cocoa/5 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-display text-xl text-cocoa mb-2">Call Us</h3>
                                <p className="text-cocoa/60 mb-4 text-sm">Mon-Sat from 10am to 8pm.</p>
                                <a href={`tel:${contactData.phone}`} className="text-gold font-bold hover:underline transition-all">
                                    {contactData.phone}
                                </a>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-cocoa/5 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-display text-xl text-cocoa mb-2">Visit Us</h3>
                                <p className="text-cocoa/60 mb-4 text-sm">Come say hello at our boutique.</p>
                                <p className="text-cocoa font-bold text-sm leading-relaxed">
                                    {contactData.address}
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-cocoa/5 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Clock className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-display text-xl text-cocoa mb-2">Hours</h3>
                                <p className="text-cocoa/60 mb-4 text-sm">We are open for you.</p>
                                <p className="text-cocoa font-bold text-sm">
                                    {contactData.timing}
                                </p>
                            </div>
                        </motion.div>

                        {/* Social & Connect */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-cocoa p-10 rounded-3xl text-cream flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-display text-3xl mb-6">Stay Connected</h3>
                                <p className="text-cream/60 mb-8 leading-relaxed">
                                    Follow us on social media for new flavor launches, behind-the-scenes peaks, and exclusive offers.
                                </p>
                                <div className="space-y-4">
                                    <a
                                        href={`https://instagram.com/${contactData.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                                    >
                                        <Instagram className="w-6 h-6 text-gold" />
                                        <div>
                                            <p className="text-xs text-cream/40 uppercase tracking-widest">Instagram</p>
                                            <p className="font-bold group-hover:text-gold transition-colors">@{contactData.instagram}</p>
                                        </div>
                                    </a>
                                    <a
                                        href={`https://facebook.com/${contactData.facebook}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                                    >
                                        <Facebook className="w-6 h-6 text-gold" />
                                        <div>
                                            <p className="text-xs text-cream/40 uppercase tracking-widest">Facebook</p>
                                            <p className="font-bold group-hover:text-gold transition-colors">{contactData.facebook}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/10">
                                <p className="text-sm text-cream/40 mb-2 whitespace-pre-line">
                                    © {new Date().getFullYear()} MeltoraVibes.
                                    All Rights Reserved.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
