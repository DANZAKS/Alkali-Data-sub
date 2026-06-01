import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVTU } from "../../vtuContext";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar, 
  Phone, 
  Wifi, 
  Lightbulb, 
  Tv, 
  Plus, 
  Copy, 
  Check, 
  CheckCircle,
  Clock,
  XCircle,
  X,
  Share2
} from "lucide-react";
import { VTUTransaction, VTUServiceType } from "../../types";

interface VTUTransactionsProps {
  onBack: () => void;
  selectedTx: VTUTransaction | null;
  onSelectTx: (tx: VTUTransaction | null) => void;
  showToast: (msg: string) => void;
}

export const VTUTransactions: React.FC<VTUTransactionsProps> = ({
  onBack,
  selectedTx,
  onSelectTx,
  showToast
}) => {
  const { transactions } = useVTU();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [isCopied, setIsCopied] = useState(false);

  // Filter computation
  const filteredTxs = transactions.filter((tx) => {
    // 1. Search term
    const matchesSearch = 
      tx.recipient.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.details.toLowerCase().includes(search.toLowerCase()) ||
      (tx.network && tx.network.toLowerCase().includes(search.toLowerCase()));

    // 2. Type filter
    const matchesType = typeFilter === "all" || tx.serviceType === typeFilter;

    // 3. Date range filter
    const txTime = new Date(tx.createdAt).getTime();
    const oneDay = 24 * 3600 * 1000;
    const now = Date.now();
    let matchesDate = true;

    if (dateFilter === "today") {
      matchesDate = (now - txTime) < oneDay;
    } else if (dateFilter === "week") {
      matchesDate = (now - txTime) < 7 * oneDay;
    } else if (dateFilter === "month") {
      matchesDate = (now - txTime) < 30 * oneDay;
    }

    return matchesSearch && matchesType && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 w-max";
    switch (status) {
      case "success": return `${base} bg-emerald-500/10 border border-emerald-500/25 text-emerald-400`;
      case "pending": return `${base} bg-amber-500/10 border border-amber-500/25 text-amber-400`;
      default: return `${base} bg-red-500/10 border border-red-500/25 text-red-400`;
    }
  };

  const getServiceIcon = (type: VTUServiceType) => {
    const base = "w-8 h-8 rounded-lg flex items-center justify-center bg-white/5";
    switch (type) {
      case "airtime": return <div className={base}><Phone className="w-4 h-4 text-amber-400" /></div>;
      case "data": return <div className={base}><Wifi className="w-4 h-4 text-[#D4AF37]" /></div>;
      case "electricity": return <div className={base}><Lightbulb className="w-4 h-4 text-emerald-400" /></div>;
      case "tv": return <div className={base}><Tv className="w-4 h-4 text-fuchsia-400" /></div>;
      default: return <div className={base}><Plus className="w-4 h-4 text-emerald-400" /></div>;
    }
  };

  const copyRefCode = (ref: string) => {
    navigator.clipboard.writeText(ref);
    showToast("Transaction reference copied!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </button>

      {/* Main ledger card frame */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Alkali Activity Ledger</h2>
            <p className="text-xs text-gray-400 mt-1">Audit-trail accounting of all deposits and virtual top-up actions.</p>
          </div>
        </div>

        {/* C. Control Bar: searching and filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search recipient, transaction ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-[#D4AF37] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white outline-none transition-colors font-mono"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2 bg-white/5 rounded-xl border border-white/5 py-1 px-3">
            <Filter className="w-3.5 h-3.5 text-gray-500 flex-none" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-transparent text-xs text-white outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#121212]">All Services</option>
              <option value="airtime" className="bg-[#121212]">Airtime</option>
              <option value="data" className="bg-[#121212]">Data Bundles</option>
              <option value="electricity" className="bg-[#121212]">Electricity</option>
              <option value="tv" className="bg-[#121212]">TV Subscription</option>
              <option value="deposit" className="bg-[#121212]">Deposits</option>
            </select>
          </div>

          <div className="md:col-span-3 flex items-center gap-2 bg-white/5 rounded-xl border border-white/5 py-1 px-3">
            <Calendar className="w-3.5 h-3.5 text-gray-500 flex-none" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="w-full bg-transparent text-xs text-white outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#121212]">All Time</option>
              <option value="today" className="bg-[#121212]">Today</option>
              <option value="week" className="bg-[#121212]">Past 7 Days</option>
              <option value="month" className="bg-[#121212]">Past 30 Days</option>
            </select>
          </div>
        </div>

        {/* D. Data List table / Grid */}
        {filteredTxs.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-10 h-10 text-gray-700 mx-auto mb-4" />
            <h3 className="text-sm font-bold text-gray-300">No matching activities found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">Please try modifying filter selection criteria or clear search queries to review alternative records.</p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredTxs.map((tx) => (
              <div
                key={tx.id}
                onClick={() => onSelectTx(tx)}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.012] border border-white/5 hover:border-white/10 transition-all cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  {getServiceIcon(tx.serviceType)}
                  <div>
                    <h4 className="text-white text-xs font-bold font-sans">
                      {tx.serviceType === "deposit" ? "Wallet Deposit" : `${tx.network || "Utility"} Top-up`}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-mono tracking-wide block mt-1">
                      {tx.recipient} • {new Date(tx.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-black font-mono ${
                    tx.serviceType === "deposit" ? "text-emerald-400" : "text-white"
                  }`}>
                    {tx.serviceType === "deposit" ? "+" : "-"}₦{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9px] block uppercase font-mono tracking-wider font-bold text-[#D4AF37] mt-1 text-right">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TRANSACTION OVERLAY RECEIPT MODAL */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />
              <div className="p-5 flex justify-between items-center border-b border-white/5">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400">ALKALI TRANSACTION INVOICE</span>
                <button
                  onClick={() => onSelectTx(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Transaction Value</span>
                  <div className="text-3xl font-black font-mono text-white mt-1.5">
                    ₦{selectedTx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="inline-flex justify-center mt-3 scale-95">
                    {getStatusBadge(selectedTx.status)}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 text-xs space-y-3 font-sans text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Service Gateway</span>
                    <span className="font-bold text-white uppercase">{selectedTx.serviceType}</span>
                  </div>
                  {selectedTx.network && (
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Network Provider</span>
                      <span className="font-bold text-white">{selectedTx.network}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Beneficiary / ID</span>
                    <span className="font-mono font-bold text-white">{selectedTx.recipient}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Time & Date</span>
                    <span className="font-bold text-white">{new Date(selectedTx.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">CBN Verification</span>
                    <span className="font-bold text-emerald-400 uppercase text-[10px]">VERIFIED SETTLED</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500">Reference No</span>
                    <button
                      onClick={() => copyRefCode(selectedTx.reference)}
                      className="font-mono text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
                    >
                      {selectedTx.reference} 
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 leading-relaxed text-center italic">
                  "* Alkali system disbursements are issued immediately and backed by Wema Bank automated micro-settlements."
                </p>
              </div>

              {/* Action */}
              <div className="p-5 border-t border-white/5 bg-white/5 flex gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedTx.details);
                    showToast("Receipt description text copied!");
                  }}
                  className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-bold text-xs cursor-pointer flex justify-center items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Receipt Info
                </button>
                <button
                  onClick={() => {
                    showToast("Secure PDF receipt ticket forwarded to email!");
                  }}
                  className="flex-1 py-3 bg-[#D4AF37] text-black font-extrabold rounded-xl text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex justify-center items-center gap-1.5 shadow-lg"
                >
                  <Share2 className="w-3.5 h-3.5" /> Forward Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
