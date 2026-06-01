import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShoppingCart, Info } from "lucide-react";
import heroImage from "../assets/images/hero_gadget_banner_1779488875705.png";

interface HeroProps {
  onShopNowClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onShopNowClick, onExploreClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#0B0B0B] py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* High-Fi Background Glowing Effects */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-[120px]" />
      
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        
        {/* Left column: Text Controls */}
        <div className="z-10 flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center space-x-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase shadow-[0_0_15px_rgba(212,175,55,0.1)]"
          >
            <Sparkles className="h-4.5 w-4.5 animate-spin text-[#D4AF37]" />
            <span>Futuristic Gadget Hub</span>
          </motion.div>

          {/* Large display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-none"
          >
            Premium Gadgets & <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-white via-gray-200 to-[#D4AF37] bg-clip-text text-transparent">
                Accessories
              </span>
              <span className="absolute bottom-1.5 left-0 h-2 w-full bg-[#D4AF37]/30 blur-sm -z-10" />
            </span>
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            Your trusted destination for quality accessories and smart devices. Step into tomorrow with elite wearable tech, robust power systems, and high-fidelity sound.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <button
              onClick={onShopNowClick}
              className="group flex items-center space-x-2 rounded-full bg-[#D4AF37] px-8 py-4 font-sans text-sm font-bold text-black shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              <span>Shop Now</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExploreClick}
              className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-sans text-sm font-bold text-gray-300 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Info className="h-4.5 w-4.5 text-[#D4AF37]" />
              <span>Explore Products</span>
            </button>
          </motion.div>

          {/* Mini trust indices */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8 text-left w-full max-w-md"
          >
            <div>
              <p className="font-mono text-xl font-bold text-white">100%</p>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-gray-500">Original Goods</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-[#D4AF37]">F-PD</p>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-gray-500">Fast Delivery</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-white">24/7</p>
              <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-gray-500">Client Care</p>
            </div>
          </motion.div>

        </div>

        {/* Right column: Rotating and Hovering visual image */}
        <div className="relative flex items-center justify-center lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex w-full max-w-md items-center justify-center sm:max-w-lg"
          >
            {/* Soft background light projection */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-2xl -z-10 animate-pulse duration-10000" />
            
            {/* Outer neon tech loop */}
            <div className="absolute h-[105%] w-[105%] rounded-[2.5rem] border border-[#D4AF37]/20 bg-transparent -z-10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute h-[109%] w-[109%] rounded-[2.5rem] border border-dashed border-[#D4AF37]/10 bg-transparent -z-10 animate-[spin_40s_linear_infinite_reverse]" />

            {/* Glowing metallic border frame enclosing the image */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-2.5 shadow-2xl backdrop-blur-3xl"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2.5xl sm:h-80 md:h-96">
                <img
                  src={heroImage}
                  alt="Alkali Communication Premium Gadget Displays"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
                />
                
                {/* Visual reflections on screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute -inset-x-20 top-0 h-40 bg-gradient-to-b from-white/[0.05] to-transparent rotate-12" />
              </div>
            </motion.div>

            {/* Floating glowing pill labels */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-2 flex items-center space-x-2 rounded-2xl border border-[#D4AF37]/30 bg-black/80 py-2.5 px-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-md"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="flex h-2.5 w-2.5 absolute left-4 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs font-semibold text-white pl-1">In Stock Now</span>
            </motion.div>


          </motion.div>
        </div>

      </div>
    </section>
  );
}
