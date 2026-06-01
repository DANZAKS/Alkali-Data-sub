import React from "react";
import { motion } from "motion/react";
import { 
  Phone, 
  Wifi, 
  Lightbulb, 
  Tv, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Smartphone, 
  Zap, 
  Award, 
  Smile 
} from "lucide-react";

interface VTULandingProps {
  onStartAuth: (view: "login" | "register") => void;
  onSelectService: (service: "airtime" | "data" | "electricity" | "tv") => void;
  isAuthenticated: boolean;
  onEnterDashboard: () => void;
}

export const VTULanding: React.FC<VTULandingProps> = ({
  onStartAuth,
  onSelectService,
  isAuthenticated,
  onEnterDashboard
}) => {
  return (
    <div className="w-full relative py-6">
      {/* Immersive glow grids in background */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-[350px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-3/4 right-1/4 -z-10 w-[420px] h-[420px] bg-[#AA7C11]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. Hero Title Division */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase mb-6"
        >
          <Zap className="w-3.5 h-3.5" /> Fast, Automatic Virtual Top-Ups
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
        >
          Supercharge Your Payments with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]">
            Alkali VTU Suite
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Instant airtime top-up, high-speed internet data bundles, electricity token generation, and satellite decoder renewals. Seamless utilities, zero delay.
        </motion.p>

        {/* Hero CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {isAuthenticated ? (
            <button
              onClick={onEnterDashboard}
              className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-xl shadow-[0_10px_35px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              Enter VTU Wallet Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={() => onStartAuth("register")}
                className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-xl shadow-[0_10px_35px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-sans"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onStartAuth("login")}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer font-sans"
              >
                Log In to Wallet
              </button>
            </>
          )}
        </motion.div>
      </section>

      {/* 2. Core Airtime & Utilities Service cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Our Fast Payment Gateways</h2>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-3" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "airtime" as const,
              title: "Buy Airtime",
              desc: "Top up MTN, Airtel, Glo, & 9mobile instantaneously.",
              icon: Phone,
              color: "text-amber-400 bg-amber-400/10",
              accent: "hover:border-amber-400/50"
            },
            {
              id: "data" as const,
              title: "Data Bundles",
              desc: "High-speed gigabytes for heavy download speeds.",
              icon: Wifi,
              color: "text-[#D4AF37] bg-[#D4AF37]/10",
              accent: "hover:border-[#D4AF37]/50"
            },
            {
              id: "electricity" as const,
              title: "Electricity Disco",
              desc: "Instant meter validation and electric tokens.",
              icon: Lightbulb,
              color: "text-emerald-400 bg-emerald-400/10",
              accent: "hover:border-emerald-400/50"
            },
            {
              id: "tv" as const,
              title: "TV Subscription",
              desc: "DStv, GOtv, & StarTimes decoder renewals.",
              icon: Tv,
              color: "text-fuchsia-400 bg-fuchsia-400/10",
              accent: "hover:border-fuchsia-400/50"
            }
          ].map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => onSelectService(item.id)}
              className={`bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md cursor-pointer transition-all ${item.accent}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Launch App <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Features USP indicators */}
      <section className="bg-white/[0.02] border-y border-white/5 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex gap-4">
              <div className="flex-none w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-2">Immutable Security</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Military-grade encryption for funds, integrated with secure Multi-Factor Firebase validation.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-none w-10 h-10 bg-emerald-400/10 rounded-lg flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-2">Automated Execution</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Zero downtime. Airtime, data, and bill payments are disbursed dynamically under 3 seconds.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-2">Guaranteed Lowest Rates</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Enjoy custom discounts on bulk data transactions and zero fees on airtime-to-wallet top ups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Loved by Nigerians Everywhere</h2>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Amara Okeke",
              role: "FCT Abuja Retailer",
              text: "I run my VTU reselling business entirely on Alkali! Transactions are lightning-fast and I get instant automated tokens for meters.",
              avatar: "AO",
              color: "bg-purple-600"
            },
            {
              name: "Musa Ibrahim",
              role: "Kano Gadget Supplier",
              text: "Extremely clean product dashboards. I load airtime and heavy data bundles for my delivery team easily. Highly recommended!",
              avatar: "MI",
              color: "bg-emerald-600"
            },
            {
              name: "Tunde Balogun",
              role: "Software Dev, Lagos",
              text: "The payment reliability is flawless. The TV package auto-refreshes GOTV in under seconds. Absolutely top tier fintech build.",
              avatar: "TB",
              color: "bg-blue-600"
            }
          ].map((user, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.12 }}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed mb-6">
                "{user.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center font-bold text-white text-xs`}>
                  {user.avatar}
                </div>
                <div>
                  <h5 className="text-white font-bold text-xs">{user.name}</h5>
                  <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest">{user.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Direct Footer Call To Action Box */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-br from-[#121212] to-[#070707] border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#D4AF37]/20 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white">
            Ready to experience elite payment speed?
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
            Register your active wallet now. Get started in less than 30 seconds. No card required to register.
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={onEnterDashboard}
                className="px-6 py-3 bg-[#D4AF37] text-black font-extrabold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer"
              >
                Go to Wallet Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => onStartAuth("register")}
                  className="px-6 py-3 bg-[#D4AF37] text-black font-extrabold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer"
                >
                  Sign Up & Top-Up
                </button>
                <button
                  onClick={() => onStartAuth("login")}
                  className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Access Account
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
