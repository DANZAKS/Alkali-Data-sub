import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ArrowRight, Heart, MessageSquare, Plus, Minus, ShieldAlert } from "lucide-react";
import { CartItem, Product } from "../types";
import { formatNaira, compileWhatsAppOrderLink } from "../utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  wishlist: Product[];
  activeTab: "cart" | "wishlist";
  setActiveTab: (tab: "cart" | "wishlist") => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  wishlist,
  activeTab,
  setActiveTab,
  onUpdateQuantity,
  onRemoveFromCart,
  onToggleWishlist,
  onMoveToCart,
  onClearCart,
}: CartDrawerProps) {
  
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const whatsappUrl = compileWhatsAppOrderLink(cart);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Core Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/5 bg-[#0B0B0B] shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/5 p-5 md:p-6">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                  <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-sans text-lg font-extrabold tracking-wide text-white uppercase">
                  My Selection
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 hover:border-white/20 hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Selector Segment Tabs */}
            <div className="grid grid-cols-2 border-b border-white/5">
              <button
                onClick={() => setActiveTab("cart")}
                className={`relative py-4 text-center font-sans text-sm font-bold tracking-wider uppercase transition-colors duration-200 ${
                  activeTab === "cart" ? "text-[#D4AF37]" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span>Checkout Cart ({cart.length})</span>
                {activeTab === "cart" && (
                  <motion.div 
                    layoutId="activeDrawerTabDot"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-[#D4AF37]" 
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`relative py-4 text-center font-sans text-sm font-bold tracking-wider uppercase transition-colors duration-200 ${
                  activeTab === "wishlist" ? "text-[#D4AF37]" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span>My Wishlist ({wishlist.length})</span>
                {activeTab === "wishlist" && (
                  <motion.div 
                    layoutId="activeDrawerTabDot"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-[#D4AF37]" 
                  />
                )}
              </button>
            </div>

            {/* Scrollable Items Block */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
              
              {activeTab === "cart" ? (
                /* Cart Items List */
                cart.length === 0 ? (
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-700 animate-bounce" />
                    <p className="mt-4 font-sans text-base font-bold text-gray-400">Your cart is empty</p>
                    <p className="mt-1 font-sans text-xs text-gray-500 max-w-xs">
                      Pick heavy bass speakers, smart watches, case accessories, and assemble your order list!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 px-5 py-2.5 font-sans text-xs font-semibold text-[#D4AF37] transition-colors"
                    >
                      Browse Tech Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-mono">Shopping list summary</span>
                      <button 
                        onClick={onClearCart}
                        className="text-red-400 hover:text-red-500 font-semibold"
                      >
                        Clear Basket
                      </button>
                    </div>
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-4 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black border border-white/5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans text-sm font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <span className="font-mono text-xs text-[#D4AF37] font-semibold">
                            {formatNaira(item.product.price)}
                          </span>
                          
                          {/* Quantity adjustments counter */}
                          <div className="mt-2 flex items-center space-x-2.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-gray-400"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-gray-400"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Trash toggle */}
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                /* Wishlist Items List */
                wishlist.length === 0 ? (
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <Heart className="h-12 w-12 text-gray-700 animate-pulse duration-1000" />
                    <p className="mt-4 font-sans text-base font-bold text-gray-400">Wishlist empty</p>
                    <p className="mt-1 font-sans text-xs text-gray-500 max-w-xs">
                      Tap hearts on products you like to reference them here or send them directly to your selection.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-4 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black border border-white/5">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex- grow min-w-0">
                          <h4 className="font-sans text-sm font-bold text-white truncate">
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs text-white">
                            {formatNaira(product.price)}
                          </span>
                          <button
                            onClick={() => onMoveToCart(product)}
                            className="mt-2 block font-sans text-[11px] font-bold text-[#D4AF37] hover:underline"
                          >
                            Add to Cart
                          </button>
                        </div>
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="p-2 text-red-400/80 hover:text-red-500 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )
              )}

            </div>

            {/* Checkout total sum footer section */}
            {activeTab === "cart" && cart.length > 0 && (
              <div className="border-t border-white/5 bg-white/[0.01] p-5 md:p-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Cart Subtotal</span>
                    <span className="font-mono">{formatNaira(totalCartPrice)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Third-party Delivery Dispatch</span>
                    <span className="font-sans text-emerald-400 font-semibold uppercase text-[10px] tracking-wide">Pay on Delivery</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2.5">
                    <span className="font-sans text-sm font-bold text-white">Estimated Order Total</span>
                    <span className="font-mono text-base font-bold text-[#D4AF37]">{formatNaira(totalCartPrice)}</span>
                  </div>
                </div>

                {/* Secure Trust note */}
                <div className="flex items-start space-x-2 rounded-xl bg-[#D4AF37]/5 p-3 border border-[#D4AF37]/10">
                  <ShieldAlert className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <p className="font-sans text-[10px] leading-relaxed text-gray-400">
                    Our checkout securely compiles your list and translates it to WhatsApp chat. You can coordinate your dispatch address and shipping details directly with store admins!
                  </p>
                </div>

                {/* WhatsApp Action Button with Glow */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center space-x-2.5 rounded-xl bg-[#D4AF37] py-4 font-sans text-sm font-bold text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-[0_4px_25px_rgba(255,255,255,0.4)]"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-black" />
                  <span>Send Order to WhatsApp</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}

            {/* Footer with closed trigger inside tab wishlist */}
            {activeTab === "wishlist" && wishlist.length > 0 && (
              <div className="border-t border-white/5 p-5 md:p-6">
                <p className="text-center font-sans text-[11px] text-gray-500 leading-relaxed">
                  These items are saved to your local session wishlist storage. Click "Add to Cart" to compile them into order totals.
                </p>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
