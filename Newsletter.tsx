import { useState, FormEvent } from "react";
import { Send, CheckCircle, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    
    // Simulate premium registration
    setSubmitted(true);
    setEmail("");
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="newsletter" className="bg-[#0B0B0B] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Absolute ambient backing lights */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        {/* Glowing border effects */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

        <div className="flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1 text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>VIP Tech drops</span>
          </div>

          <h2 className="mt-5 font-sans text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Never Miss An Exclusive Drop
          </h2>
          <p className="mt-3 max-w-lg font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
            Get instant notifications on wholesale stock arrivals, seasonal accessory discounts, and limited edition smartwatch releases at Alkali Communication.
          </p>

          {/* Interactive Form Trigger */}
          <div className="mt-8 w-full max-w-md">
            {submitted ? (
              <div className="flex items-center justify-center space-x-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 py-3.5 px-4 text-xs font-semibold text-emerald-400">
                <CheckCircle className="h-4.5 w-4.5" />
                <span>Subscription successful! High-fi tech VIP emails are on their way.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-black/40 py-3.5 px-4 font-sans text-xs text-white placeholder-gray-500 outline-none transition-colors focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 rounded-xl bg-[#D4AF37] hover:bg-white text-black py-3.5 px-6 font-sans text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-[1.01]"
                >
                  <span>Subscribe</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-wider text-gray-600">
            • ZERO SPAM • OPT-OUT AT ANY TIME • SECURED LOGS
          </p>

        </div>
      </div>
    </section>
  );
}
