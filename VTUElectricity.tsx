import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVTU } from "../../vtuContext";
import { ArrowLeft, CheckCircle, Lightbulb, ShieldCheck, AlertCircle, Search, User } from "lucide-react";

interface VTUElectricityProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const VTUElectricity: React.FC<VTUElectricityProps> = ({ onBack, showToast }) => {
  const { payElectricity, verifyMeter, currentUser } = useVTU();
  const [disco, setDisco] = useState<string>("");
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // API Verification States
  const [isVerifyingMeter, setIsVerifyingMeter] = useState(false);
  const [verifiedCust, setVerifiedCust] = useState<{ customerName: string; address: string } | null>(null);
  
  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successResult, setSuccessResult] = useState<any | null>(null);
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const discos = [
    "AEDC (Abuja Disco)",
    "EKEDC (Eko Disco)",
    "IKEDC (Ikeja Disco)",
    "KAEDCO (Kaduna Disco)",
    "KEDCO (Kano Disco)",
    "PHED (Port Harcourt Disco)"
  ];

  const handleVerify = async () => {
    setErrorInput(null);
    setVerifiedCust(null);

    if (!disco) {
      setErrorInput("Please select an electricity distribution company first.");
      return;
    }
    if (meterNumber.length < 6) {
      setErrorInput("Meter number must be at least 6 digits long.");
      return;
    }

    setIsVerifyingMeter(true);
    try {
      const resp = await verifyMeter(disco, meterNumber);
      if (resp) {
        setVerifiedCust(resp);
        showToast("Meter verified! Customer records matched.");
      } else {
        setErrorInput("Invalid meter credentials. Verify values and try again.");
      }
    } catch (err: any) {
      setErrorInput(err.message || "Failed to contact distribution gateway.");
    } finally {
      setIsVerifyingMeter(false);
    }
  };

  const handleValidateForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInput(null);

    if (!disco || !meterNumber) {
      setErrorInput("Please fully fill your meter credentials.");
      return;
    }
    if (!verifiedCust) {
      setErrorInput("Please execute meter validation before completing billing.");
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount < 1000) {
      setErrorInput("Minimum utility electricity purchase is ₦1,000.");
      return;
    }
    if (parsedAmount > 200000) {
      setErrorInput("Maximum single utility transaction is ₦200,000.");
      return;
    }
    if (currentUser && currentUser.walletBalance < parsedAmount) {
      setErrorInput("Insufficient wallet balance. Please fund your wallet first.");
      return;
    }

    setShowConfirm(true);
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setErrorInput(null);
    try {
      const tx = await payElectricity(disco, meterNumber, parseFloat(amount));
      setSuccessResult(tx);
      showToast("Electricity payment completed! Token disbursed.");
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
        /* SUCCESS RECEIPT */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Utility Payment Success</h2>
          <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase block mb-4">Token Disbursed</span>

          {/* Generated meter token display box */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">Electricity Prepaid Token</span>
            <div className="text-white text-lg font-black font-mono tracking-wider">
              {successResult.details.replace(disco + " Postpaid validation. Token generated: ", "")}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(successResult.details.replace(disco + " Postpaid validation. Token generated: ", ""));
                showToast("Prepaid meter token copied!");
              }}
              className="text-[10px] text-gray-400 font-bold underline mt-1 block w-full hover:text-white transition-all cursor-pointer"
            >
              Copy Meter Token
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-left space-y-2.5 mb-6 text-xs text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Distribution Disco</span>
              <span className="font-bold text-white">{successResult.network}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Prepaid Meter Number</span>
              <span className="font-mono font-bold text-white">{successResult.recipient}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Cost Value</span>
              <span className="font-mono font-bold text-white">₦{successResult.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bill Invoice Ref</span>
              <span className="font-mono text-gray-400 uppercase">{successResult.reference}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSuccessResult(null);
              setMeterNumber("");
              setAmount("");
              setDisco("");
              setVerifiedCust(null);
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Pay Another Electricity Bill
          </button>
        </motion.div>
      ) : (
        /* BILL PAYMENT FORM */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md relative"
        >
          <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-emerald-400" />
          <h2 className="text-xl font-bold text-white mb-2">Pay Electricity Bill</h2>
          <p className="text-xs text-gray-400 mb-6">Instantly generate prepaid meter tokens for any Nigerian Disco network.</p>

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
                Select Distribution Company (DISCO)
              </label>
              <select
                value={disco}
                onChange={(e) => {
                  setDisco(e.target.value);
                  setVerifiedCust(null);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-emerald-400 transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#121212] text-gray-500">-- Choose Utility Provider --</option>
                {discos.map((d) => (
                  <option key={d} value={d} className="bg-[#121212] text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Meter input & Verification Trigger bar */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Prepaid Meter ID / Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. 54110399120"
                  value={meterNumber}
                  onChange={(e) => {
                    setMeterNumber(e.target.value.replace(/\D/g, ""));
                    setVerifiedCust(null);
                  }}
                  className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono text-white placeholder:text-white/20 outline-none focus:border-emerald-400 transition-colors flex-1"
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifyingMeter}
                  className="px-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-1.5 text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  {isVerifyingMeter ? (
                    <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><Search className="w-4 h-4" /> Verify</>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic Customer Verification feedback card */}
            {verifiedCust && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/20 flex gap-3 text-xs leading-relaxed"
              >
                <User className="w-4 h-4 text-emerald-400 flex-none mt-0.5" />
                <div>
                  <div className="text-emerald-400 font-bold uppercase tracking-wider text-[9px]">Verified Account Holder</div>
                  <div className="text-white font-bold mt-0.5">{verifiedCust.customerName}</div>
                  <div className="text-gray-400 text-[10px] mt-0.5">{verifiedCust.address}</div>
                </div>
              </motion.div>
            )}

            {/* 3. Prepayment budget */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Bill Amount (₦)
                </label>
                {currentUser && (
                  <span className="text-[10px] font-semibold text-gray-500">
                    Wallet: ₦{currentUser.walletBalance.toLocaleString()}
                  </span>
                )}
              </div>
              <input
                type="number"
                required
                min="1000"
                placeholder="₦ e.g. 5,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-base font-bold font-mono text-white placeholder:text-white/20 outline-none focus:border-emerald-400 transition-colors"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Charges: ₦0.00 (Zero conv. fee)</span>
            </div>

            {/* 4. Action Trigger */}
            <button
              type="submit"
              className="w-full py-4 bg-emerald-400 text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              Confirm Prepaid Billing
            </button>
          </form>
        </motion.div>
      )}

      {/* CONFIRMATION POPUP */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
            >
              <h3 className="text-lg font-bold text-white mb-2">Confirm Electricity Bill</h3>
              <p className="text-gray-400 text-xs mb-5">By confirming, you authorize direct wallet debit for electricity token generation.</p>

              {verifiedCust && (
                <div className="bg-white/5 rounded-xl p-4 text-xs space-y-3 mb-6 text-gray-300">
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Utility Disco</span>
                    <span className="font-bold text-white">{disco}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Verified Holder</span>
                    <span className="font-bold text-white">{verifiedCust.customerName}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Meter Number</span>
                    <span className="font-mono font-bold text-white">{meterNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Debit Cost</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">₦{parseFloat(amount).toLocaleString()}</span>
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
                  className="py-3 bg-emerald-400 hover:scale-105 active:scale-95 rounded-xl text-black font-extrabold text-xs flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Disburse Bill <ShieldCheck className="w-4 h-4" /></>
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
