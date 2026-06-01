import { motion } from "motion/react";
import { Store, MapPin, Sparkles, Clock, Compass, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#0B0B0B] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative backdrop cyan spot lights */}
      <div className="absolute top-1/3 right-10 -z-10 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-[120px]" />
      <div className="absolute bottom-1/4 left-10 -z-10 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        
        {/* Container grid splits */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          
          {/* Left Block: Sleek Bento Stats Card Layout */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 rounded-2xl border border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-[#D4AF37]/10 blur-xl" />
              <div className="flex items-center space-x-3 text-[#D4AF37]">
                <Store className="h-6 w-6" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Physical Presence</span>
              </div>
              <p className="mt-4 font-sans text-base font-bold text-white">Dorayi Karama Depot</p>
              <p className="mt-1 font-sans text-xs text-gray-400">
                Garejin Kamilu block, Kano city. Visitors are welcome for pick-ups.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 text-center"
            >
              <p className="font-mono text-3xl font-extrabold text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)]">100%</p>
              <p className="mt-1 font-sans text-xs font-bold text-gray-200">Tested Devices</p>
              <p className="mt-0.5 text-[10px] text-gray-400">Zero default out-of-box</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 text-center"
            >
              <p className="font-mono text-3xl font-extrabold text-white">5k+</p>
              <p className="mt-1 font-sans text-xs font-bold text-gray-200">Local Clients</p>
              <p className="mt-0.5 text-[10px] text-gray-400">Satisfied buyers nationwide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-2 rounded-2xl border border-white/5 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-transparent p-6"
            >
              <div className="flex items-center space-x-2 text-white">
                <Clock className="h-4.5 w-4.5 text-[#D4AF37]" />
                <span className="font-mono text-xs font-extrabold tracking-wide uppercase">Operating Window</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 font-sans text-xs">
                <div>
                  <p className="text-gray-500 uppercase text-[9px]">Mon - Sat</p>
                  <p className="text-gray-300 font-semibold">8:00 AM - 9:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-[9px]">Sundays</p>
                  <p className="text-gray-300 font-semibold">1:00 PM - 7:00 PM</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Block: Narrative and details */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Tag Badging */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
              <Compass className="h-4 w-4 text-[#D4AF37] animate-pulse" />
              <span>THE ALKALI STORY</span>
            </div>

            <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Pioneering Pure Gadget <br />Authenticity
            </h2>
            <div className="mt-3 h-1 w-12 bg-[#D4AF37]" />

            <p className="mt-6 font-sans text-sm leading-relaxed text-gray-400">
              At <strong className="text-[#D4AF37]">Alkali Communication</strong>, we bridge the gap between high-end accessories and tech enthusiasts by sourcing premium, original smart devices. Founded on the principle of absolute quality, our inventory is curated directly from licensed global manufacturers.
            </p>

            <p className="mt-4 font-sans text-sm leading-relaxed text-gray-400">
              From our physical depot in Dorayi Karama, Kano, we conduct thorough multi-point testing on all Smart Watches, AirPods, fast GaN charger blocks, and long-life power banks before shipment. This thoroughness guarantees that any gadget arriving at your doorstep functions flawlessly.
            </p>

            {/* Core Values Bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              
              <div className="flex items-start space-x-2.5">
                <div className="mt-1 p-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Checked Quality</h4>
                  <p className="font-sans text-[11px] text-gray-400 mt-0.5">Every seal is audited to prevent out-of-box defaults.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="mt-1 p-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Trusted Depot</h4>
                  <p className="font-sans text-[11px] text-gray-400 mt-0.5">Physical retail headquarters based inside Kano city.</p>
                </div>
              </div>

            </div>

            {/* Live WhatsApp chat trigger */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a 
                href="https://wa.me/+2348050444411" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="rounded-xl border border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-black py-3 px-6 font-sans text-xs font-bold text-[#D4AF37] transition-all duration-300"
              >
                Inquire With Admins
              </a>
              <div className="flex flex-col text-left">
                <span className="font-mono text-xs font-bold text-white">08050444411</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Fast Tech Desk Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
