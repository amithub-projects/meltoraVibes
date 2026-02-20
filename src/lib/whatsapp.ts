import { Order } from "@/context/OrderContext";

export function getWhatsAppUrl(order: Order, sellerPhone: string) {
    const itemsList = order.items
        .map(item => `• ${item.name} (x${item.quantity}) - ${item.price}`)
        .join("\n");

    const message = `*New Order from MeltoraVibes!* 🍫\n\n` +
        `*Order ID:* ${order.id}\n` +
        `*Customer:* ${order.customerName}\n` +
        `*Phone:* ${order.phone}\n` +
        `*Address:* ${order.address}\n\n` +
        `*Items:*\n${itemsList}\n\n` +
        `*Total Amount:* ₹${order.total.toFixed(2)}\n\n` +
        `Thank you for shopping with MeltoraVibes! ✨`;

    const encodedMessage = encodeURIComponent(message);
    // Remove '+' and other non-numeric chars from phone
    const cleanPhone = sellerPhone.replace(/\D/g, "");

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
