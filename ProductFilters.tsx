import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { CATEGORIES } from "../productsData";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resultsCount: number;
}

export default function ProductFilters({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  resultsCount,
}: ProductFiltersProps) {
  
  const handleReset = () => {
    setSearchQuery("");
    setActiveCategory("");
    setSortBy("recommended");
  };

  const hasActiveFilters = searchQuery !== "" || activeCategory !== "" || sortBy !== "recommended";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
      <div className="rounded-2xl border border-white/5 bg-[#0B0B0B] p-5 md:p-6 shadow-xl relative overflow-hidden">
        {/* Ambient background glow inside filter bank */}
        <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-[#D4AF37]/5 blur-[60px]" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Categories Horizontal Tabs */}
          <div className="flex flex-col space-y-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
              Filter by Category
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("")}
                className={`rounded-full px-4 py-2 font-sans text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === ""
                    ? "bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                    : "border border-white/5 bg-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                }`}
              >
                All Gadgets
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 font-sans text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                      : "border border-white/5 bg-white/5 text-gray-400 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Card */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6 lg:w-2/5">
            
            <div className="flex flex-1 flex-col space-y-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                Search Shop
              </span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Query names or accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 font-sans text-xs text-white placeholder-gray-500 outline-none transition-colors focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
                <Search className="absolute right-3.5 top-3 h-4 w-4 text-gray-500" />
              </div>
            </div>

            {/* Sorting controls */}
            <div className="flex flex-col space-y-2.5 sm:w-48">
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                Sort By
              </span>
              <div className="relative flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 font-sans text-xs text-white outline-none cursor-pointer focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                >
                  <option className="bg-[#0B0B0B]" value="recommended">Best Match</option>
                  <option className="bg-[#0B0B0B]" value="price-asc">Price: Low to High</option>
                  <option className="bg-[#0B0B0B]" value="price-desc">Price: High to Low</option>
                  <option className="bg-[#0B0B0B]" value="rating">Top Rated</option>
                </select>
                <SlidersHorizontal className="absolute right-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>

        {/* Filters Metadata and reset state */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
          <p className="font-sans text-xs text-gray-400">
            Showing <span className="font-mono font-bold text-[#D4AF37]">{resultsCount}</span> premium solutions in stock
          </p>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
