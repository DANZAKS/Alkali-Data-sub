import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  MessageSquare, 
  RotateCcw, 
  Cpu, 
  Flame, 
  Gift, 
  Smartphone,
  CheckCircle2,
  X
} from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductFilters from "./components/ProductFilters";
import ProductCard from "./components/ProductCard";
import AboutSection from "./components/AboutSection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";

// VTU Components
import { VTULanding } from "./components/vtu/VTULanding";
import { VTUAuth } from "./components/vtu/VTUAuth";
import { VTUDashboard } from "./components/vtu/VTUDashboard";
import { VTUAirtime } from "./components/vtu/VTUAirtime";
import { VTUData } from "./components/vtu/VTUData";
import { VTUElectricity } from "./components/vtu/VTUElectricity";
import { VTUTV } from "./components/vtu/VTUTV";
import { VTUWallet } from "./components/vtu/VTUWallet";
import { VTUTransactions } from "./components/vtu/VTUTransactions";
import { useVTU } from "./vtuContext";

// Data & Types
import { PRODUCTS } from "./productsData";
import { Product, CartItem } from "./types";

export default function App() {
  // Shopping Cart & Wishlist initialized from local storage sessions
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("alkali_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const savedWishlist = localStorage.getItem("alkali_wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  // Dynamic filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // Dynamic Module Selector (Defaulting to VTU fintech portal!)
  const [activeModule, setActiveModule] = useState<"vtu" | "store">("vtu");

  // VTU Portal sub views
  const [vtuView, setVtuView] = useState<"landing" | "auth" | "dashboard" | "airtime" | "data" | "electricity" | "tv" | "wallet" | "transactions">("landing");
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [vtuSelectedTx, setVtuSelectedTx] = useState<any | null>(null);
  const [intendedService, setIntendedService] = useState<string | null>(null);

  // Hook into VTU Context to get login state
  const { currentUser } = useVTU();

  // If user signs in, automatically transition them to dashboard!
  useEffect(() => {
    if (currentUser) {
      if (intendedService) {
        setVtuView(intendedService as any);
        setIntendedService(null);
      } else if (vtuView === "landing" || vtuView === "auth") {
        setVtuView("dashboard");
      }
    } else {
      // If user logs out, return to landing
      if (vtuView !== "auth" && vtuView !== "landing") {
        setVtuView("landing");
      }
    }
  }, [currentUser]);

  // Interaction drawer overrides
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"cart" | "wishlist">("cart");

  // Detailed Modal overlay focus product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Floating notification toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Shopping lists with Local Storage
  useEffect(() => {
    localStorage.setItem("alkali_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("alkali_wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Toast notification alert helper
  const showToast = (message: string) => {
    setToastMessage(message);
    const id = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(id);
  };

  // Add item to shopping cart
  const handleAddToCart = (product: Product) => {
    if (!product.available) {
      showToast(`${product.name} is currently out of stock`);
      return;
    }
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...currentCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...currentCart, { product, quantity: 1 }];
    });
    
    showToast(`Added ${product.name} to checkout basket!`);
    
    // Automatically open checkout drawer to show state feedback
    setDrawerTab("cart");
    setIsDrawerOpen(true);
  };

  // Adjust basket numbers
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((currentCart) => {
      return currentCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Remove single line item
  const handleRemoveFromCart = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.product.id !== productId));
    showToast("Removed product item from checkout drawer");
  };

  // Clear current cart list
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your current shopping card?")) {
      setCart([]);
      showToast("Cleared active basket");
    }
  };

  // Toggle wishlist items
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((currentWishlist) => {
      const isAlreadySaved = currentWishlist.includes(productId);
      if (isAlreadySaved) {
        showToast("Removed gadget from saved wishlist");
        return currentWishlist.filter((id) => id !== productId);
      } else {
        showToast("Saved gadget to wishlist tracker");
        return [...currentWishlist, productId];
      }
    });
  };

  // Move product item from watchlist directly to shopping basket
  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    // Remove from wishlist
    setWishlistIds((current) => current.filter((id) => id !== product.id));
  };

  // Direct fast-scroll transition anchor
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Get full products matching active wishlist indicators
  const wishlistProducts = PRODUCTS.filter((product) => wishlistIds.includes(product.id));

  // Dynamic filter lists
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "" || product.category === activeCategory;
    const matchesKeyword = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  // Dynamic sorting calculations
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    // Default (recommended or matching index)
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] font-sans text-white select-none relative overflow-x-hidden">
      {/* Atmospheric / Immersive Media Glow overlays */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-[#D4AF37]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      
      {/* Dynamic Toast Alert Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 flex items-center space-x-3 rounded-2xl bg-black border border-[#D4AF37]/35 px-5 py-4 shadow-[0_4px_25px_rgba(212,175,55,0.25)] backdrop-blur-md"
          >
            <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-sans text-xs font-semibold text-white">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Aesthetic Sticky Header */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartClick={() => {
          setDrawerTab("cart");
          setIsDrawerOpen(true);
        }}
        onWishlistClick={() => {
          setDrawerTab("wishlist");
          setIsDrawerOpen(true);
        }}
        scrollToSection={scrollToSection}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />

      <div id="vtu-top" />

      {activeModule === "vtu" ? (
        <div className="py-10 min-h-[70vh]">
          {vtuView === "landing" && (
            <VTULanding
              onStartAuth={(type) => { 
                setAuthType(type); 
                setVtuView("auth"); 
              }}
              onSelectService={(service) => {
                if (!currentUser) {
                  setIntendedService(service);
                  setAuthType("login");
                  setVtuView("auth");
                  showToast("Please log in to purchase " + service);
                } else {
                  setVtuView(service as any);
                }
              }}
              isAuthenticated={currentUser !== null}
              onEnterDashboard={() => setVtuView("dashboard")}
            />
          )}

          {vtuView === "auth" && (
            <VTUAuth
              initialType={authType}
              onBack={() => setVtuView("landing")}
              showToast={showToast}
            />
          )}

          {vtuView === "dashboard" && (
            <VTUDashboard
              onSelectService={(service) => setVtuView(service as any)}
              onViewTransactions={() => setVtuView("transactions")}
              onFundWallet={() => setVtuView("wallet")}
            />
          )}

          {vtuView === "airtime" && (
            <VTUAirtime
              onBack={() => setVtuView("dashboard")}
              showToast={showToast}
            />
          )}

          {vtuView === "data" && (
            <VTUData
              onBack={() => setVtuView("dashboard")}
              showToast={showToast}
            />
          )}

          {vtuView === "electricity" && (
            <VTUElectricity
              onBack={() => setVtuView("dashboard")}
              showToast={showToast}
            />
          )}

          {vtuView === "tv" && (
            <VTUTV
              onBack={() => setVtuView("dashboard")}
              showToast={showToast}
            />
          )}

          {vtuView === "wallet" && (
            <VTUWallet
              onBack={() => setVtuView("dashboard")}
              showToast={showToast}
            />
          )}

          {vtuView === "transactions" && (
            <VTUTransactions
              onBack={() => setVtuView("dashboard")}
              selectedTx={vtuSelectedTx}
              onSelectTx={setVtuSelectedTx}
              showToast={showToast}
            />
          )}
        </div>
      ) : (
        <>
          {/* High-Fi visual interactive Hero Panel */}
          <Hero
            onShopNowClick={() => scrollToSection("products")}
            onExploreClick={() => scrollToSection("categories")}
          />

          {/* Categories interactive filter selection bar */}
          <FeaturedCategories
            activeCategory={activeCategory}
            onSelectCategory={(id) => {
              setActiveCategory(id);
              scrollToSection("products");
            }}
          />

          {/* Catalog Center Division */}
          <main id="products" className="py-20 relative">
            {/* Glow backdrop behind catalog lists */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[150px]" />

            <div className="mx-auto max-w-7xl">
              
              {/* Main sections titles */}
              <div className="flex flex-col items-center text-center mb-14 px-4 sm:px-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  Active Warehouse Inventory
                </span>
                <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Our Premium Catalog
                </h2>
                <div className="mt-3 h-1 w-12 bg-[#D4AF37]" />
                <p className="mt-4 max-w-xl font-sans text-sm text-gray-400">
                  Pick high-end headphones, braided USB lines, durable cases, and state smart watch devices with complete specifications.
                </p>
              </div>

              {/* Filtering bank bar components */}
              <ProductFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                resultsCount={sortedProducts.length}
              />

              {/* Main Catalog Products results Grid */}
              <div className="px-4 sm:px-6 lg:px-8">
                {sortedProducts.length === 0 ? (
                  /* Empty product query result views */
                  <div className="rounded-2xl border border-white/5 bg-[#0B0B0B] py-16 px-4 text-center max-w-lg mx-auto">
                    <RotateCcw className="mx-auto h-10 w-10 text-gray-700 animate-spin duration-3000" />
                    <h3 className="mt-4 font-sans text-lg font-bold text-gray-300">No products match your query</h3>
                    <p className="mt-1.5 font-sans text-xs text-gray-500">
                      Please adjust your research parameter terms, clear the tags, or select a different accessory category to populate results.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("");
                        setSortBy("recommended");
                      }}
                      className="mt-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 py-2.5 px-6 font-sans text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                    >
                      Clear Active Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onViewDetails={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </main>

          {/* Immersive story block section */}
          <AboutSection />

          {/* VIP drops drops letter */}
          <Newsletter />
        </>
      )}

      {/* Global responsive bottom footings */}
      <Footer scrollToSection={scrollToSection} />

      {/* Interactive sticky floating bottom cart widget for quick conversions */}
      {cart.length > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => {
            setDrawerTab("cart");
            setIsDrawerOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37] text-black shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:scale-105 transition-transform"
          whileHover={{ rotate: 10 }}
        >
          <ShoppingBag className="h-6 w-6 font-black" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-mono text-[9px] font-extrabold text-white border border-black shadow-md animate-bounce">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </motion.button>
      )}

      {/* Unified Side sliding drawers panel containing cart / watchlist tabs */}
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        wishlist={wishlistProducts}
        activeTab={drawerTab}
        setActiveTab={setDrawerTab}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onToggleWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
        onClearCart={handleClearCart}
      />

      {/* Full detail modal overview */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
