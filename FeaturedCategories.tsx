import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Category } from "../types";
import { CATEGORIES } from "../productsData";

interface FeaturedCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function FeaturedCategories({
  activeCategory,
  onSelectCategory,
}: FeaturedCategoriesProps) {
  
  // Dynamic Lucide icon renderer
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="h-5 w-5 text-[#D4AF37]" />;
    }
    return <Icons.Layers className="h-5 w-5 text-[#D4AF37]" />;
  };

  return (
    <section id="categories" className="bg-[#0B0B0B] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Shop By Class
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Featured Categories
          </h2>
          <div className="mt-3 h-1 w-12 bg-[#D4AF37]" />
          <p className="mt-4 max-w-xl font-sans text-sm text-gray-400">
            Uncover engineered perfection. Browse through our premium selections of authentic smart instruments and audio devices.
          </p>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => onSelectCategory(isActive ? "" : category.id)}
                whileHover={{ y: -6 }}
                className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border bg-gradient-to-b p-4 text-center cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-[#D4AF37] from-[#D4AF37]/15 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    : "border-white/5 from-white/[0.03] to-transparent hover:border-[#D4AF37]/40 hover:from-[#D4AF37]/5"
                }`}
                style={{ contentVisibility: "auto" }}
              >
                {/* Background image preview with blur & hover zoom */}
                <div className="absolute inset-0 -z-10 bg-black opacity-30 md:opacity-20 transition-opacity group-hover:opacity-40" />
                <div className="absolute inset-0 -z-20">
                  <img
                    src={category.image}
                    alt={category.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-15 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-25 group-hover:grayscale-0"
                  />
                  {/* Glassmorphic backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-90" />
                </div>

                {/* Aesthetic hover radial glow item */}
                <div className="absolute -inset-10 -z-30 rounded-full bg-[#D4AF37]/10 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Floating Core Icon Frame */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                    : "bg-white/5 text-white border border-white/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10"
                }`}>
                  {isActive ? (
                    (() => {
                      const IconComponent = (Icons as any)[category.icon];
                      return IconComponent ? <IconComponent className="h-5 w-5 text-black" /> : <Icons.Layers className="h-5 w-5 text-black" />;
                    })()
                  ) : (
                    renderIcon(category.icon)
                  )}
                </div>

                {/* Name & Count */}
                <h3 className="mt-4 font-sans text-sm font-bold text-white tracking-wide transition-colors duration-200 group-hover:text-[#D4AF37]">
                  {category.name}
                </h3>
                <span className="mt-1 font-mono text-[10px] uppercase text-gray-500 tracking-wider">
                  {category.count} Products
                </span>

                {/* Select Border Dot indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Clear Filter Prompt */}
        {activeCategory && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => onSelectCategory("")}
              className="text-xs font-mono tracking-wider text-[#D4AF37] border border-[#D4AF37]/20 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/15 px-4 py-2 rounded-full transition-colors flex items-center space-x-1"
            >
              <span>Showing filtered items. Click here to reset categories.</span>
              <Icons.RotateCcw className="h-3.5 w-3.5 ml-1" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
