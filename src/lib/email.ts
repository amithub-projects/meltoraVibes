"use client"

import { Order } from "@/context/OrderContext"

/**
 * Note: To enable actual email sending, you'll need to install emailjs-com:
 * npm install @emailjs/browser
 * 
 * Then, configure your Service ID, Template ID, and Public Key below.
 */

export async function sendOrderEmail(order: Order, sellerEmail: string) {
    const templateParams = {
        to_name: order.customerName,
        to_email: order.email,
        customer_phone: order.phone,
        order_id: order.id,
        order_date: order.date,
        shipping_address: order.address,
        order_items: order.items.map(item => `${item.name} (x${item.quantity}) - ${item.price}`).join("\n"),
        total_amount: `₹${order.total.toFixed(2)}`,
        admin_email: sellerEmail
    }

    console.log("Preparing to send email notification:", templateParams)

    try {
        // In a real implementation with @emailjs/browser:
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')

        console.log("Email notification simulated successfully!")
        return { success: true }
    } catch (error) {
        console.error("Failed to send email notification:", error)
        return { success: false, error }
    }
}
