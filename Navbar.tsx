import { useState } from "react";
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import { useVTU } from "../vtuContext";
import AlkaliLogo from "./AlkaliLogo";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  scrollToSection: (id: string) => void;
  activeModule: "vtu" | "store";
  setActiveModule: (mod: "vtu" | "store") => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  onCartClick,
  onWishlistClick,
  scrollToSection,
  activeModule,
  setActiveModule,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser, logout } = useVTU();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0B0B0B]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => {
            setActiveModule("vtu");
            scrollToSection("vtu-top");
          }}
          className="flex cursor-pointer items-center"
        >
          <AlkaliLogo className="h-11 w-11" showText={true} />
        </div>

        {/* Desktop Switch Pill (Fintech Module vs Gadget Store) */}
        <div className="hidden sm:flex items-center bg-white/5 border border-white/15 p-1 rounded-full scale-95 md:scale-100">
          <button
            onClick={() => {
              setActiveModule("vtu");
              scrollToSection("vtu-top");
            }}
            className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeModule === "vtu"
                ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/25"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ⚡ VTU Portal
          </button>
          <button
            onClick={() => {
              setActiveModule("store");
              scrollToSection("products");
            }}
            className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeModule === "store"
                ? "bg-white text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🛍️ Gadget Store
          </button>
        </div>

        {/* Desktop Navigation linked depending on view */}
        <nav className="hidden md:flex items-center space-x-6">
          {activeModule === "store" ? (
            ["Shop", "Categories", "Specs", "About"].map((tab) => {
              const sectionId = tab.toLowerCase() === "specs" ? "products" : tab.toLowerCase();
              return (
                <button
                  key={tab}
                  onClick={() => scrollToSection(sectionId)}
                  className="font-sans text-xs font-bold text-gray-400 transition-colors duration-200 hover:text-[#D4AF37]"
                >
                  {tab}
                </button>
              );
            })
          ) : (
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 animate-pulse flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              ● Automated Payments Gateways Active
            </span>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Desktop Search Toggle (Only shown when store is active) */}
          {activeModule === "store" && (
            <div className="relative hidden lg:flex items-center">
              <input
                type="text"
                placeholder="Search gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-10 font-sans text-xs text-white placeholder-gray-500 outline-none transition-all duration-300 focus:w-56 focus:border-[#D4AF37]/80 focus:bg-white/10"
              />
              <Search className="absolute right-3 h-3.5 w-3.5 text-gray-400" />
            </div>
          )}

          {activeModule === "store" ? (
            <>
              {/* Wishlist Button */}
              <button
                onClick={onWishlistClick}
                className="relative p-2 text-gray-400 transition-colors hover:text-[#D4AF37]"
              >
                <Heart className="h-5.5 w-5.5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#D4AF37] font-mono text-[9px] font-bold text-black shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart Trigger */}
              <button
                onClick={onCartClick}
                className="group relative flex items-center justify-center rounded-xl bg-white/5 border border-white/10 p-2.5 text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <ShoppingBag className="h-5.5 w-5.5 transition-transform group-hover:scale-110" />
                {cartCount > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] font-mono text-[10px] font-bold text-black shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </>
          ) : (
            currentUser && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 py-1.5 px-3 rounded-xl">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-bold font-mono text-white hidden sm:inline">
                  {currentUser.fullName.split(" ")[0]}
                </span>
                <button
                  onClick={logout}
                  className="text-[9px] uppercase font-mono font-black text-red-400 hover:text-red-300 transition-colors cursor-pointer border-l border-white/10 pl-2 ml-1 flex items-center gap-1"
                >
                  <LogOut className="w-2.5 h-2.5" /> Exit
                </button>
              </div>
            )
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white md:hidden transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Search Grid */}
      {showSearch && (
        <div className="border-t border-white/5 bg-[#0B0B0B] px-4 py-3 sm:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search fast-charging, power banks, premium watches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 font-sans text-xs text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
            <Search className="absolute right-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-20 right-0 z-40 h-auto w-full max-w-sm rounded-b-2xl border-b border-white/10 bg-[#0B0B0B] p-6 shadow-2xl transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-5">
          {/* Mobile Module switcher switcher */}
          <div className="grid grid-cols-2 gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => {
                setActiveModule("vtu");
                setMobileMenuOpen(false);
                scrollToSection("vtu-top");
              }}
              className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer text-center ${
                activeModule === "vtu"
                  ? "bg-[#D4AF37] text-black font-extrabold"
                  : "text-gray-400"
              }`}
            >
              ⚡ VTU Suite
            </button>
            <button
              onClick={() => {
                setActiveModule("store");
                setMobileMenuOpen(false);
                scrollToSection("products");
              }}
              className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer text-center ${
                activeModule === "store"
                  ? "bg-white text-black font-extrabold"
                  : "text-gray-400"
              }`}
            >
              🛍️ Gadgets
            </button>
          </div>

          {activeModule === "store" ? (
            <>
              {["Shop", "Categories", "Specs", "About"].map((tab) => {
                const sectionId = tab.toLowerCase() === "specs" ? "products" : tab.toLowerCase();
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection(sectionId);
                    }}
                    className="flex items-center justify-between border-b border-white/5 pb-2 text-left font-sans text-base font-medium text-gray-300 hover:text-[#D4AF37] transition-colors"
                  >
                    <span>{tab}</span>
                    <ArrowRight className="h-4 w-4 text-[#D4AF37]/50" />
                  </button>
                );
              })}
              
              <div className="flex flex-col space-y-3 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCartClick();
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-white/5 border border-white/15 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]"
                >
                  <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
                  <span>Cart ({cartCount})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onWishlistClick();
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 py-3 text-sm font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20 animate-pulse"
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block mb-2">
                ● Telecommunication Portals Live
              </span>
              {currentUser ? (
                <div className="mt-2 text-xs text-gray-400">
                  Signed in as <span className="text-white font-bold block mt-0.5">{currentUser.fullName}</span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="mt-3.5 px-4 py-2 bg-red-400 text-black rounded-lg text-[10px] font-extrabold tracking-wider font-mono uppercase block mx-auto cursor-pointer"
                  >
                    Disconnect Profile
                  </button>
                </div>
              ) : (
                <span className="text-[10px] text-gray-400 block font-mono">Secure automatic transactions enabled</span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
