import React, { useState } from "react";
import { motion } from "motion/react";
import { useVTU } from "../../vtuContext";
import { 
  Phone, 
  Wifi, 
  Lightbulb, 
  Tv, 
  Plus, 
  ArrowUpRight, 
  Eye, 
  EyeOff, 
  Wallet, 
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Copy,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { VTUTransaction } from "../../types";

interface VTUDashboardProps {
  onSelectAction: (action: "airtime" | "data" | "electricity" | "tv" | "fund" | "transactions") => void;
  onViewTransactionDetails: (tx: VTUTransaction) => void;
  showToast: (msg: string) => void;
}

export const VTUDashboard: React.FC<VTUDashboardProps> = ({
  onSelectAction,
  onViewTransactionDetails,
  showToast
}) => {
  const { currentUser, transactions, logout } = useVTU();
  const [hideBalance, setHideBalance] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!currentUser) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsRefreshing(false);
    showToast("Wallet balance and LEDGER transactions synced with CBN gateway");
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("08050444411");
    showToast("Alkali virtual bank account copied!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "pending": return <Clock className="w-4 h-4 text-amber-400" />;
      default: return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5";
    switch (status) {
      case "success": return `${base} bg-emerald-500/10 border border-emerald-500/20 text-emerald-400`;
      case "pending": return `${base} bg-amber-500/10 border border-amber-500/20 text-amber-400`;
      default: return `${base} bg-red-500/10 border border-red-500/20 text-red-400`;
    }
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case "airtime": return <Phone className="w-4 h-4 text-amber-400" />;
      case "data": return <Wifi className="w-4 h-4 text-[#D4AF37]" />;
      case "electricity": return <Lightbulb className="w-4 h-4 text-emerald-400" />;
      case "tv": return <Tv className="w-4 h-4 text-fuchsia-400" />;
      default: return <Plus className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-sans">
      
      {/* 1. Header Greeting section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
            Federal Republic of Nigeria
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1 flex items-center gap-2">
            Salaam, {currentUser.fullName} <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Account Status: <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">CBN VERIFIED Tier 3</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300 transition-all cursor-pointer ${
              isRefreshing ? "animate-spin" : ""
            }`}
            title="Reload Wallet Balance"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              logout();
              showToast("Wallet session signed out.");
            }}
            className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl text-red-400 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* 2. Primary Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Banking Card Balance and fast top-ups */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Card Module */}
          <div className="relative bg-gradient-to-br from-[#121212] via-[#2A2A2A] to-[#D4AF37] rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden text-white flex flex-col justify-between h-56 md:h-64 border border-white/15">
            {/* Glow overlays */}
            <div className="absolute right-[-20%] bottom-[-20%] w-[300px] h-[300px] bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <Wallet className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/70 block">Digital Wallet</span>
                  <span className="font-extrabold text-xs tracking-tighter uppercase">Alkali Trust Bank</span>
                </div>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard logo"
                className="w-12 h-8 object-contain opacity-80"
              />
            </div>

            <div className="z-10 mt-2">
              <div className="flex items-center gap-2 text-white/70 text-xs font-mono uppercase tracking-widest">
                Available Wallet Balance
                <button 
                  onClick={() => setHideBalance(!hideBalance)}
                  className="text-white hover:text-[#D4AF37] transition-colors"
                >
                  {hideBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-3xl md:text-4xl font-black mt-1.5 font-mono tracking-tight text-white flex items-baseline">
                {hideBalance ? "₦ ••••••••" : `₦${currentUser.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              </div>
            </div>

            <div className="flex justify-between items-end z-10 border-t border-white/10 pt-4 mt-2">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-white/50 block">Virtual Account (WEMA)</span>
                <button 
                  onClick={copyAccountNumber}
                  className="font-mono text-xs font-bold tracking-wider text-white hover:text-[#D4AF37] flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 mt-1 cursor-pointer"
                >
                  08050444411 <Copy className="w-3" />
                </button>
              </div>
              <button
                onClick={() => onSelectAction("fund")}
                className="px-4 py-2 bg-white text-black font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Fund Wallet
              </button>
            </div>
          </div>

          {/* Service Shortcuts Quick actions list */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 font-mono">
              Bills Payment Shortcuts
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Buy Airtime", icon: Phone, id: "airtime" as const, color: "text-amber-400 bg-amber-400/10 border-amber-500/20 hover:border-amber-400/50" },
                { label: "Buy Data", icon: Wifi, id: "data" as const, color: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20 hover:border-[#D4AF37]/50" },
                { label: "Electricity", icon: Lightbulb, id: "electricity" as const, color: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20 hover:border-emerald-400/50" },
                { label: "TV Premium", icon: Tv, id: "tv" as const, color: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-500/20 hover:border-fuchsia-400/50" }
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => onSelectAction(act.id)}
                  className={`flex flex-col items-center justify-center p-5 bg-white/[0.02] border rounded-2xl cursor-pointer transition-all ${act.color}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 bg-white/5">
                    <act.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white text-center">{act.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Recent Transactions and Quick Account Ledger info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                Recent Transactions
              </h3>
              <button
                onClick={() => onSelectAction("transactions")}
                className="text-xs font-mono font-bold text-[#D4AF37] hover:underline cursor-pointer"
              >
                View Ledger
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <h4 className="text-gray-300 text-xs font-bold">No registered transactions</h4>
                <p className="text-gray-500 text-[10px] mt-1">Select an action above to perform instant secure virtual top-up actions.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                {transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => onViewTransactionDetails(tx)}
                    className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                        {getServiceTypeIcon(tx.serviceType)}
                      </div>
                      <div className="max-w-[160px] sm:max-w-xs">
                        <h4 className="text-white text-xs font-bold truncate">
                          {tx.serviceType === "deposit" ? "Wallet Deposit" : `${tx.network || "Utility"} Purchase`}
                        </h4>
                        <span className="text-gray-500 text-[9px] font-mono tracking-wide mt-0.5 block truncate">
                          {tx.recipient} • {new Date(tx.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-bold font-mono ${
                        tx.serviceType === "deposit" ? "text-emerald-400" : "text-white"
                      }`}>
                        {tx.serviceType === "deposit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                      </span>
                      <span className="block mt-0.5 text-[9px] text-[#D4AF37] uppercase tracking-wider font-mono">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer support callout */}
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-4 flex gap-4 items-start">
            <UserIcon className="w-5 h-5 text-[#D4AF37] flex-none mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-bold">Need Instant WhatsApp Assistance?</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed mt-1">
                Have questions regarding the Alkali Virtual Top-Up platform? Reach out directly via our secure helpline: <span className="text-[#D4AF37] font-bold">+234 805 044 4411</span>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
