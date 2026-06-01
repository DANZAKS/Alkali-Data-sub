import { motion, AnimatePresence } from "motion/react";
import { X, Star, Check, ShoppingCart, Info, ListFilter, RotateCcw } from "lucide-react";
import { Product } from "../types";
import { formatNaira, calculateDiscount } from "../utils";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  
  if (!product) return null;

  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 flex h-auto max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] shadow-2xl"
        >
          {/* Close button at top corner */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 rounded-xl border border-white/10 bg-black/40 p-2 text-gray-400 hover:border-white/20 hover:text-white transition-all backdrop-blur-md"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Scrolling Content Bank */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              
              {/* Product Visual Area - Left side */}
              <div className="md:col-span-5 flex flex-col justify-start">
                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-4 aspect-square flex items-center justify-center">
                  
                  {/* Glowing core backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 to-transparent blur-md" />

                  {/* Absolute core discount badge */}
                  {discountPercent > 0 && (
                    <span className="absolute top-4 left-4 z-10 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-black tracking-wide text-white shadow-md">
                      -{discountPercent}% OFF
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full rounded-lg object-contain"
                  />
                </div>

                {/* Rating stats row */}
                <div className="mt-4 flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                    <span className="font-mono text-sm font-bold text-white">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewsCount} customer reviews)</span>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                    product.available 
                      ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/20" 
                      : "bg-red-400/15 text-red-400 border border-red-400/20"
                  }`}>
                    {product.available ? "In Stock" : "Unavailable"}
                  </span>
                </div>

                {/* Technical specs listings */}
                <div className="mt-4 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <ListFilter className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Technical Spec Sheet</span>
                  </p>
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key} className="border-b border-white/5">
                          <td className="py-2.5 font-sans font-medium text-gray-500 w-1/3">{key}</td>
                          <td className="py-2.5 font-mono text-gray-300">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Product Content Details area - Right side */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  
                   {/* Header Info */}
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    {product.category.toUpperCase()} DEPOT
                  </span>
                  
                  <h3 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                    {product.name}
                  </h3>

                  {/* Dual price box */}
                  <div className="mt-4 flex items-baseline space-x-3">
                    <span className="font-mono text-2xl font-black text-white">
                      {formatNaira(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="font-mono text-sm text-gray-500 line-through">
                        {formatNaira(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Main Paragraph Description */}
                  <p className="mt-6 font-sans text-sm leading-relaxed text-gray-400">
                    {product.description}
                  </p>

                  {/* Features Bullet Section */}
                  <div className="mt-8 space-y-3.5">
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                      Core Functional Highlights
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {product.features.map((feat, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                            <Check className="h-3 w-3 text-[#D4AF37]" />
                          </div>
                          <p className="font-sans text-xs text-gray-300">
                            {feat}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom checkout triggers */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="flex w-full sm:flex-1 items-center justify-center space-x-2.5 rounded-xl bg-[#D4AF37] py-4 px-6 font-sans text-sm font-black text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:text-black hover:shadow-[0_4px_25px_rgba(255,255,255,0.4)]"
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    <span>Collect To Cart</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded-xl border border-white/10 bg-white/5 py-4 px-6 font-sans text-sm font-bold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <span>Keep Browsing</span>
                  </button>
                </div>

                {/* Safe Delivery Alert banner */}
                <div className="mt-6 flex items-start space-x-2 rounded-xl bg-white/[0.02] p-3 border border-white/5">
                  <div className="p-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                    <Info className="h-3.5 w-3.5" />
                  </div>
                  <p className="font-sans text-[10px] leading-relaxed text-gray-500">
                    This unit undergoes comprehensive quality audits in the Dorayi store catalog before logistics dispatch to guarantee genuine packaging content.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
