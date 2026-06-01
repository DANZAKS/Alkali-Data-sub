import { Phone, MapPin, Mail, MessageSquare, ShieldCheck, Heart, ArrowUp } from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const WHATSAPP_NUMBER = "08050444411";
  const DISPLAY_WHATSAPP = "+234 805 044 4411";

  return (
    <footer className="relative border-t border-white/5 bg-[#070707] pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative cyber ambient dot */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 -z-10 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        
        {/* Core footer Grid divisions */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-white/5">
          
          {/* Section 1: Logo and brand pitch */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <div 
              onClick={handleScrollTop}
              className="flex cursor-pointer items-center space-x-2"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <span className="font-mono text-base font-bold text-black">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-base font-extrabold tracking-wider text-white uppercase">
                  Alkali
                </span>
                <span className="font-mono text-[9px] tracking-wider text-[#D4AF37] uppercase">
                  Communication
                </span>
              </div>
            </div>
            
            <p className="font-sans text-xs leading-relaxed text-gray-500">
              Your elite, premium destination for authentic accessories, wearables, and speakers. Based in Kano State, we inspect every parcel to ensure absolute quality.
            </p>

            {/* Authenticity seal badge */}
            <div className="inline-flex items-center space-x-2 rounded-lg bg-white/5 p-2 border border-white/10 w-fit">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              <span className="font-mono text-[9px] font-bold text-gray-400 tracking-wider uppercase">
                100% Guaranteed Genuine
              </span>
            </div>
          </div>

          {/* Section 2: Internal Quick Navigation Links */}
          <div className="col-span-2 flex flex-col space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-gray-400">
              {["Shop", "Categories", "Specs", "About"].map((tab) => {
                const sectionId = tab.toLowerCase() === "specs" ? "products" : tab.toLowerCase();
                return (
                  <button
                    key={tab}
                     onClick={() => scrollToSection(sectionId)}
                    className="text-left hover:text-[#D4AF37] transition-colors duration-250 cursor-pointer"
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Physical Locations and details */}
          <div className="col-span-3 flex flex-col space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Storage Depot
            </h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Dorayi karama Garejin Kamilu,<br />
                  Kano State, Nigeria.
                </p>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-mono">{WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-sans">support@alkaligeads.com</span>
              </div>
            </div>
          </div>

          {/* Section 4: Hot Dial-Out buttons */}
          <div className="col-span-3 flex flex-col space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Customer Care Link
            </h4>
            <p className="font-sans text-xs text-gray-500">
              Got product questions? Drop us a prompt chat line on WhatsApp.
            </p>
            
            {/* Custom WhatsApp checkout portal */}
            <a
              href={`https://wa.me/+2348050444411`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center space-x-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 py-3 text-center text-xs font-bold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.35)]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Store Admins</span>
            </a>

            {/* General Direct call button */}
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-white/5 border border-white/15 py-3 text-center text-xs font-semibold text-gray-300 transition-colors hover:text-white hover:bg-white/10"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Direct Dial: {DISPLAY_WHATSAPP}</span>
            </a>
          </div>

        </div>

        {/* Dynamic bottom copyrights */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} <strong className="text-white">Alkali Communication</strong>. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Crafted for true smart device lovers</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
            </span>
            <button
              onClick={handleScrollTop}
              className="flex items-center space-x-1.5 rounded-lg border border-white/5 bg-white/5 py-1 px-2.5 text-[10px] font-mono hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>TOP OF PAGE</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
