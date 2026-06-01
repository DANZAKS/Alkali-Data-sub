import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVTU } from "../../vtuContext";
import { ArrowLeft, CheckCircle, Wallet, Plus, CreditCard, Landmark, Copy, Check, Lock } from "lucide-react";

interface VTUWalletProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const VTUWallet: React.FC<VTUWalletProps> = ({ onBack, showToast }) => {
  const { fundWallet, currentUser, transactions } = useVTU();
  const [fundingAmt, setFundingAmt] = useState<string>("");
  const [method, setMethod] = useState<"card" | "bank">("card");
  
  // Interactive credit card details for Paystack simulator
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // UI states
  const [isCoping, setIsCoping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fundingSuccess, setFundingSuccess] = useState<any | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  if (!currentUser) return null;

  // Filter only deposits actions
  const depositHistory = transactions.filter((tx) => tx.serviceType === "deposit");

  const copyAcct = () => {
    navigator.clipboard.writeText("08050444411");
    showToast("Virtual Wema Account copied!");
    setIsCoping(true);
    setTimeout(() => setIsCoping(false), 2000);
  };

  const handleCardFunding = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null);

    const amt = parseFloat(fundingAmt);
    if (!amt || amt < 500) {
      setErrorState("Minimum wallet funding value is ₦500.");
      return;
    }
    if (amt > 100000) {
      setErrorState("Maximum single funding top-up is ₦100,000.");
      return;
    }
    if (cardNumber.length < 16 || cardExpiry.length < 4 || cardCvv.length < 3) {
      setErrorState("Please fully complete your debit card credentials.");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate bank gateways response delay
      await new Promise((r) => setTimeout(r, 1200));
      const tx = await fundWallet(amt, "Visa Card via Paystack");
      setFundingSuccess(tx);
      showToast(`Wallet credited with ₦${amt.toLocaleString()}!`);
    } catch (err: any) {
      setErrorState("FCNB Card transaction declined by gateway.");
    } finally {
      setIsProcessing(false);
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

      {fundingSuccess ? (
        /* SUCCESS CONSOLE SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Deposit Confirmed</h2>
          <span className="text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase block mb-6">Settled Instantly</span>

          <div className="bg-white/5 rounded-xl p-4 text-left space-y-3 mb-6 text-xs text-gray-300">
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span className="text-gray-500">Credited Balance</span>
              <span className="font-bold text-emerald-400 font-mono text-sm">₦{fundingSuccess.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span className="text-gray-500">Method</span>
              <span className="text-white">Visa Card (Paystack Gateway)</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span className="text-gray-500">Status</span>
              <span className="text-emerald-400 font-bold uppercase text-[10px]">CBN Confirmed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-gray-400 uppercase">{fundingSuccess.reference}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setFundingSuccess(null);
              setFundingAmt("");
              setCardNumber("");
              setCardExpiry("");
              setCardCvv("");
            }}
            className="w-full py-4 bg-[#D4AF37] text-black font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Go Back
          </button>
        </motion.div>
      ) : (
        /* FUND WALLET INTERFACE */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* A. Current balance display indicator */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Current Wallet Balance</span>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  ₦{currentUser.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>

          {/* B. Choose Channel: Card vs Bank transfer */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="font-bold text-sm text-white mb-4">Choose Funding Gateway</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setMethod("card")}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  method === "card"
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                    : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                }`}
              >
                <CreditCard className="w-4 h-4" /> Credit/Debit Card
              </button>
              <button
                onClick={() => setMethod("bank")}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  method === "bank"
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                    : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                }`}
              >
                <Landmark className="w-4 h-4" /> Bank Transfer
              </button>
            </div>

            {errorState && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorState}
              </div>
            )}

            {method === "bank" ? (
              /* CHANNEL 1: BANK DETAILS CARD SHEET */
              <div className="space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Make a transfer directly to your custom Alkali Virtual Account. Your wallet will be credited automatically within 10 seconds.
                </p>

                <div className="bg-white/5 rounded-xl border border-white/5 p-4 space-y-3.5">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Bank Name</span>
                    <div className="text-white text-xs font-bold mt-0.5">WEMA Bank Plc (Alkali Trust)</div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Account Name</span>
                    <div className="text-white text-xs font-bold mt-0.5">Alkali VTU - {currentUser.fullName}</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Account Number</span>
                      <div className="text-white font-mono text-base font-black mt-0.5">08050444411</div>
                    </div>
                    <button
                      onClick={copyAcct}
                      className="py-1.5 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 text-white cursor-pointer"
                    >
                      {isCoping ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-emerald-400 text-[11px] font-bold">
                  ● Gateway ready: waiting for credit transfer notifications...
                </div>
              </div>
            ) : (
              /* CHANNEL 2: CARD GATEWAY FORM (VISA/MASTER CARD PAYSTACK SIMULATOR) */
              <form onSubmit={handleCardFunding} className="space-y-4">
                {/* Amount input */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Funding Amount (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    placeholder="₦ Enter Amount (Minimum ₦500)"
                    value={fundingAmt}
                    onChange={(e) => setFundingAmt(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-bold font-mono text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]"
                  />
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {[1000, 2000, 5000, 10000].map((prst) => (
                      <button
                        key={prst}
                        type="button"
                        onClick={() => setFundingAmt(prst.toString())}
                        className="py-1 bg-white/5 border border-white/5 text-[9px] font-bold text-gray-400 rounded hover:bg-white/10"
                      >
                        ₦{prst.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secure card parameters inputs */}
                <div className="space-y-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
                    <span className="text-white text-xs font-bold flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#D4AF37]" /> Paystack Secure Gateway</span>
                    <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">PCI-DSS</span>
                  </div>

                  {/* Card numbers */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Debit Card Number (16 Digits)"
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-mono text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={4}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-mono text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] text-center"
                    />
                    <input
                      type="password"
                      required
                      placeholder="CVV (3 Digits)"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-mono text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] text-center"
                    />
                  </div>
                </div>

                {/* Submitting fundings */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#D4AF37] text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  {isProcessing ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Authorize Payment & Credit ₦{fundingAmt ? parseFloat(fundingAmt).toLocaleString() : "..."}</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* D. Local Deposit Ledger Records */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
            <h4 className="text-white text-xs font-bold mb-3.5">Wallet Funding Ledger</h4>
            
            {depositHistory.length === 0 ? (
              <p className="text-gray-500 text-[10px] text-center py-4">No deposit logs registered yet.</p>
            ) : (
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                {depositHistory.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border border-white/5 text-xs">
                    <div>
                      <span className="text-white font-bold block">Wallet Credited</span>
                      <span className="text-gray-500 text-[9px] font-mono mt-0.5 block">{new Date(tx.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold font-mono">+₦{tx.amount.toLocaleString()}</span>
                      <span className="text-gray-400 block text-[9px] uppercase font-mono mt-0.5">{tx.reference}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
