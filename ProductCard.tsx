import { Product } from "../types";
import { formatNaira, calculateDiscount } from "../utils";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (p: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onViewDetails: (p: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onViewDetails,
}: ProductCardProps) {
  
  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-4 transition-all duration-300 hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
      style={{ contentVisibility: "auto" }}
    >
      {/* Absolute Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className="rounded-md bg-[#D4AF37] px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            {product.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="rounded-md bg-red-500 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button Core */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        className={`absolute top-6 right-6 z-10 flex h-9.5 w-9.5 items-center justify-center rounded-xl border transition-all duration-300 backdrop-blur-md ${
          isWishlisted
            ? "border-red-500/50 bg-red-500/20 text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:bg-red-500/30"
            : "border-white/10 bg-black/40 text-gray-400 hover:border-white/30 hover:text-white"
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      {/* Main Product Interactive Image Layout */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative flex h-52 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5"
      >
        {/* Ambient cyan glow behind the image (subtle, beautiful) */}
        <div className="absolute inset-0 -z-10 rounded-full bg-[#D4AF37]/5 blur-lg max-w-xs mx-auto my-auto" />

        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover action slide up drawer to fast-view */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 rounded-full bg-white px-5 py-2.5 font-sans text-xs font-bold text-black shadow-lg"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </motion.div>
        </div>
      </div>

      {/* Product Rating & Code */}
      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
          Ref: {product.id.split("-").pop()?.toUpperCase()}
        </span>
        <div className="flex items-center space-x-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-mono text-xs font-semibold text-gray-300">{product.rating}</span>
          <span className="text-[10px] text-gray-500">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Title Detail */}
      <h3 
        onClick={() => onViewDetails(product)}
        className="mt-2.5 cursor-pointer line-clamp-1 font-sans text-base font-bold text-white tracking-wide transition-colors group-hover:text-[#D4AF37]"
      >
        {product.name}
      </h3>

      {/* OneLine truncated Description */}
      <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-gray-400">
        {product.description}
      </p>

      {/* Action panel: Prices and Basket button */}
      <div className="mt-auto pt-5 flex items-center justify-between border-t border-white/5">
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="font-mono text-[11px] text-gray-500 line-through">
              {formatNaira(product.originalPrice)}
            </span>
          )}
          <span className="font-mono text-sm font-bold text-white">
            {formatNaira(product.price)}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          title="Add to basket"
        >
          <ShoppingCart className="h-4.5 w-4.5" />
        </button>
      </div>
    </motion.div>
  );
}
