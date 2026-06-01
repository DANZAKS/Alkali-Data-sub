import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVTU } from "../../vtuContext";
import { ArrowLeft, CheckCircle, Tv, ShieldCheck, AlertCircle, Search, User } from "lucide-react";

interface VTUTVProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

interface Bouquet {
  id: string;
  name: string;
  price: number;
}

export const VTUTV: React.FC<VTUTVProps> = ({ onBack, showToast }) => {
  const { payTV, verifyDecoder, currentUser } = useVTU();
  const [provider, setProvider] = useState<string>("");
  const [smartCard, setSmartCard] = useState<string>("");
  const [selectedBouquetId, setSelectedBouquetId] = useState<string>("");

  // Customer Verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedDec, setVerifiedDec] = useState<{ customerName: string; currentBouquet: string } | null>(null);

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successResult, setSuccessResult] = useState<any | null>(null);
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const providers = ["DSTV", "GOTV", "StarTimes"];

  // Real premium Nigerian satellite bouquets models
  const BOUQUETS_MAP: Record<string, Bouquet[]> = {
    DSTV: [
      { id: "dstv-yanga", name: "DStv Yanga Package", price: 5100 },
      { id: "dstv-confam", name: "DStv Confam Package", price: 9350 },
      { id: "dstv-compact", name: "DStv Compact Premium", price: 15700 },
      { id: "dstv-compact-plus", name: "DStv Compact Plus", price: 25000 },
      { id: "dstv-premium", name: "DStv Premium Package", price: 37000 }
    ],
    GOTV: [
      { id: "gotv-smallie", name: "GOtv Smallie Lite", price: 1800 },
      { id: "gotv-jinja", name: "GOtv Jinja Standard", price: 3300 },
      { id: "gotv-jolli", name: "GOtv Jolli Extra", price: 4850 },
      { id: "gotv-max", name: "GOtv Max Premium", price: 7200 },
      { id: "gotv-supa", name: "GOtv Supa Plus Entertainment", price: 9600 }
    ],
    StarTimes: [
      { id: "st-nova", name: "StarTimes Nova Monthly", price: 1500 },
      { id: "st-basic", name: "StarTimes Basic Monthly", price: 3300 },
      { id: "st-smart", name: "StarTimes Smart Bouquet", price: 4700 },
      { id: "st-super", name: "StarTimes Super Bouquet", price: 8200 }
    ]
  };

  const getBouquets = () => (provider ? BOUQUETS_MAP[provider] || [] : []);
  const getSelectedBouquet = () => getBouquets().find((b) => b.id === selectedBouquetId);

  const handleVerify = async () => {
    setErrorInput(null);
    setVerifiedDec(null);

    if (!provider) {
      setErrorInput("Please select a TV subscription provider first.");
      return;
    }
    if (smartCard.length < 5) {
      setErrorInput("Smart card / IUC ID must be at least 5 digits.");
      return;
    }

    setIsVerifying(true);
    try {
      const resp = await verifyDecoder(provider, smartCard);
      if (resp) {
        setVerifiedDec(resp);
        showToast("Decoder linked! Customer matched.");
      } else {
        setErrorInput("Smart card matching failed. Verify criteria.");
      }
    } catch (err: any) {
      setErrorInput(err.message || "Failed to contact cable gateway.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleValidateForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInput(null);

    if (!provider || !smartCard) {
      setErrorInput("Please fully specify decoder characteristics.");
      return;
    }
    if (!verifiedDec) {
      setErrorInput("Please perform smart card/IUC identification verification first.");
      return;
    }
    const bouquet = getSelectedBouquet();
    if (!bouquet) {
      setErrorInput("Please choose a renewable bouquet pack.");
      return;
    }
    if (currentUser && currentUser.walletBalance < bouquet.price) {
      setErrorInput("Insufficient wallet balance. Please fund your wallet first.");
      return;
    }

    setShowConfirm(true);
  };

  const handleExecute = async () => {
    const bouquet = getSelectedBouquet();
    if (!bouquet) return;

    setIsLoading(true);
    setErrorInput(null);
    try {
      const tx = await payTV(provider, smartCard, bouquet.name, bouquet.price);
      setSuccessResult(tx);
      showToast(`${provider} bouquet renewed instantly!`);
    } catch (err: any) {
      setErrorInput(err.message || "Financial processor error occurred.");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 font-sans">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </button>

      {successResult ? (
        /* RECEIPT SCREEN OVERLAY */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Cable Bouquet Renewed</h2>
          <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase block mb-4">Renewed</span>

          <div className="bg-white/5 rounded-xl p-4 text-left space-y-2.5 mb-6 text-xs text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Cable Provider</span>
              <span className="font-bold text-white">{successResult.network}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Smart Card Number</span>
              <span className="font-mono font-bold text-white">{successResult.recipient}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Bouquet Option</span>
              <span className="font-bold text-white">{successResult.details.replace(provider + " (", "").replace(") bundle renewed for smartcard " + smartCard, "")}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Subscription Cost</span>
              <span className="font-bold text-white">₦{successResult.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Billing Order Ref</span>
              <span className="font-mono text-gray-400 uppercase">{successResult.reference}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSuccessResult(null);
              setSmartCard("");
              setSelectedBouquetId("");
              setProvider("");
              setVerifiedDec(null);
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Renew Another Decoder Card
          </button>
        </motion.div>
      ) : (
        /* ORDER REGULAR FORM */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md relative"
        >
          <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-fuchsia-400" />
          <h2 className="text-xl font-bold text-white mb-2">Cable TV Subscription</h2>
          <p className="text-xs text-gray-400 mb-6">Instantly dispatch billing activations for DSTV, GOTV or StarTimes decoders.</p>

          {errorInput && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-none" />
              <span className="leading-relaxed">{errorInput}</span>
            </div>
          )}

          <form onSubmit={handleValidateForm} className="space-y-5">
            {/* 1. Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Select Provider
              </label>
              <div className="grid grid-cols-3 gap-2">
                {providers.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setProvider(p);
                      setVerifiedDec(null);
                      setSelectedBouquetId("");
                    }}
                    className={`p-3 rounded-xl border font-black text-xs transition-all cursor-pointer ${
                      provider === p
                        ? "bg-fuchsia-400 text-black border-white shadow-lg scale-105"
                        : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Decoders details and Verification links */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Smart Card / IUC Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. 10459312201"
                  value={smartCard}
                  onChange={(e) => {
                    setSmartCard(e.target.value.replace(/\D/g, ""));
                    setVerifiedDec(null);
                  }}
                  className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono text-white placeholder:text-white/20 outline-none focus:border-fuchsia-400 transition-colors flex-1"
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="px-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl text-fuchsia-400 hover:bg-fuchsia-400 hover:text-black transition-all flex items-center gap-1.5 text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  {isVerifying ? (
                    <span className="w-4 h-4 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><Search className="w-4 h-4" /> Link</>
                  )}
                </button>
              </div>
            </div>

            {/* Account holder verification card */}
            {verifiedDec && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 bg-fuchsia-500/5 rounded-xl border border-fuchsia-500/20 flex gap-3 text-xs leading-relaxed"
              >
                <User className="w-4 h-4 text-fuchsia-400 flex-none mt-0.5" />
                <div>
                  <div className="text-fuchsia-400 font-bold uppercase tracking-wider text-[9px]">Linked Decoder Profile</div>
                  <div className="text-white font-bold mt-0.5">{verifiedDec.customerName}</div>
                  <div className="text-gray-400 text-[10px] mt-0.5">Current plan: {verifiedDec.currentBouquet}</div>
                </div>
              </motion.div>
            )}

            {/* 3. Bouquet Selection Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Choose Renewing Bouquet Pack
              </label>
              <select
                disabled={!provider}
                value={selectedBouquetId}
                onChange={(e) => setSelectedBouquetId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-fuchsia-400 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <option value="" className="bg-[#121212] text-gray-500">
                  {provider ? "-- Click to Select Bouquet --" : "Select TV Provider first"}
                </option>
                {getBouquets().map((bq) => (
                  <option key={bq.id} value={bq.id} className="bg-[#121212] text-white">
                    {bq.name} - ₦{bq.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Bill Info display */}
            {getSelectedBouquet() && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center"
              >
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Review total billing</span>
                  <div className="text-white text-xs font-bold mt-0.5">{getSelectedBouquet()?.name}</div>
                </div>
                <div className="text-fuchsia-400 font-mono text-base font-black">
                  ₦{getSelectedBouquet()?.price.toLocaleString()}
                </div>
              </motion.div>
            )}

            {/* 4. Complete button */}
            <button
              type="submit"
              className="w-full py-4 bg-fuchsia-400 text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              Verify & Complete bouquet Activation
            </button>
          </form>
        </motion.div>
      )}

      {/* CONFIRM CONSOLE */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
            >
              <h3 className="text-lg font-bold text-white mb-2">Confirm Renewal</h3>
              <p className="text-gray-400 text-xs mb-5">Are you sure you want to recharge this cable television pack? Smart renewed signals disburse in 2-5 minutes.</p>

              {verifiedDec && getSelectedBouquet() && (
                <div className="bg-white/5 rounded-xl p-4 text-xs space-y-3 mb-6 text-gray-300">
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">TV Provider</span>
                    <span className="font-bold text-white">{provider}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Decoder Owner</span>
                    <span className="font-bold text-white">{verifiedDec.customerName}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">IUC / Smart Card</span>
                    <span className="font-mono font-bold text-white">{smartCard}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Bouquet Selection</span>
                    <span className="font-bold text-white">{getSelectedBouquet()?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cost Debit</span>
                    <span className="font-mono font-bold text-fuchsia-400 text-sm">₦{getSelectedBouquet()?.price.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecute}
                  disabled={isLoading}
                  className="py-3 bg-fuchsia-400 hover:scale-105 active:scale-95 rounded-xl text-black font-extrabold text-xs flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Confirm Bouquet <ShieldCheck className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
