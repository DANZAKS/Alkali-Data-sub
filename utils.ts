import { CartItem } from "./types";

/**
 * Formats a number to Nigerian Naira (₦) representation.
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates discount percentages.
 */
export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Encodes and compiles shopping cart details into a WhatsApp message URL.
 * Senders route to Alkali Communication desk on WhatsApp: +2348050444411
 */
export function compileWhatsAppOrderLink(cartItems: CartItem[]): string {
  const WHATSAPP_NUMBER = "+2348050444411"; // 08050444411
  
  if (cartItems.length === 0) return "";

  let message = `*ALKALI COMMUNICATION - GADGET ORDER*\n`;
  message += `---------------------------------------------------------\n\n`;
  message += `Hello! I would like to place an order for the following premium gadgets:\n\n`;

  let totalSum = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    totalSum += itemTotal;
    message += `*${index + 1}. ${item.product.name}*\n`;
    message += `   - _Category:_ ${item.product.category.toUpperCase()}\n`;
    message += `   - _Qty:_ ${item.quantity}x\n`;
    message += `   - _Price:_ ${formatNaira(item.product.price)} each\n`;
    message += `   - _Subtotal:_ ${formatNaira(itemTotal)}\n\n`;
  });

  message += `---------------------------------------------------------\n`;
  message += `*TOTAL AMOUNT:* ${formatNaira(totalSum)}\n`;
  message += `---------------------------------------------------------\n\n`;
  message += `_Delivery Address:_ _____________\n`;
  message += `_Payment Method:_ Airtime / Transfer / Cash on Delivery\n\n`;
  message += `Please confirm availability and bank details for shipping. Thanks!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
