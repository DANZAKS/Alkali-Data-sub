import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVTU } from "../../vtuContext";
import { ArrowLeft, CheckCircle, ShieldCheck, AlertCircle } from "lucide-react";

interface VTUAirtimeProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const VTUAirtime: React.FC<VTUAirtimeProps> = ({ onBack, showToast }) => {
  const { buyAirtime, currentUser } = useVTU();
  const [network, setNetwork] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successResult, setSuccessResult] = useState<any | null>(null);
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const networks = [
    { name: "MTN", color: "bg-amber-400 text-black border-amber-500/20" },
    { name: "Airtel", color: "bg-red-600 text-white border-red-700/20" },
    { name: "Glo", color: "bg-emerald-600 text-white border-emerald-700/20" },
    { name: "9mobile", color: "bg-green-900 text-white border-green-950/20" }
  ];

  const presets = [100, 200, 500, 1000, 2000, 5000];

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInput(null);

    if (!network) {
      setErrorInput("Please select a telecommunication network provider.");
      return;
    }
    if (phone.length < 11 || !/^\d+$/.test(phone)) {
      setErrorInput("Please enter a valid 11-digit mobile phone number.");
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount < 50) {
      setErrorInput("Minimum airtime purchase is ₦50.");
      return;
    }
    if (parsedAmount > 50000) {
      setErrorInput("Maximum single airtime purchase is ₦50,000.");
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
      const tx = await buyAirtime(network, phone, parseFloat(amount));
      setSuccessResult(tx);
      showToast("Airtime dispatched successfully!");
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
        /* SUCCESS RESULT BOX VIEW */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Top-Up Successful</h2>
          <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase block mb-4">Dispatched</span>
          
          <div className="bg-white/5 rounded-xl p-4 text-left space-y-2.5 mb-6 text-xs text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Service</span>
              <span className="font-bold text-white">{successResult.network} Airtime</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Phone Number</span>
              <span className="font-mono font-bold text-white">{successResult.recipient}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Value Paid</span>
              <span className="font-mono font-bold text-white">₦{successResult.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Reference No</span>
              <span className="font-mono text-gray-400 uppercase">{successResult.reference}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSuccessResult(null);
              setPhone("");
              setAmount("");
              setNetwork("");
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Buy Another Airtime
          </button>
        </motion.div>
      ) : (
        /* AIRTIME ORDER FORM VIEW */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md relative"
        >
          <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-amber-400" />
          <h2 className="text-xl font-bold text-white mb-2">Buy Airtime</h2>
          <p className="text-xs text-gray-400 mb-6">Dispatched instantly to any MTN, Airtel, Glo or 9mobile cell.</p>

          {errorInput && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-none" />
              <span className="leading-relaxed">{errorInput}</span>
            </div>
          )}

          <form onSubmit={handleValidate} className="space-y-5">
            {/* 1. Telco Buttons */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Select Network Provider
              </label>
              <div className="grid grid-cols-4 gap-2">
                {networks.map((net) => (
                  <button
                    key={net.name}
                    type="button"
                    onClick={() => setNetwork(net.name)}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-xs font-black transition-all cursor-pointer ${
                      network === net.name 
                        ? `${net.color} border-white shadow-lg scale-105` 
                        : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <span>{net.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Destination Phone */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Recieving Phone Number
              </label>
              <input
                type="tel"
                required
                maxLength={11}
                placeholder="e.g. 08031234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono text-white placeholder:text-white/20 outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 3. Amount top up inputs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Airtime Value (₦)
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
                min="50"
                placeholder="₦ Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-base font-bold font-mono text-white placeholder:text-white/20 outline-none focus:border-amber-400 transition-colors"
              />

              <div className="grid grid-cols-6 gap-1.5 mt-3">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold hover:bg-white/10 hover:border-white/20 text-gray-300 cursor-pointer"
                  >
                    ₦{val}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Action Launcher Button */}
            <button
              type="submit"
              className="w-full py-4 bg-amber-400 text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              Verify & Complete Top-Up
            </button>
          </form>
        </motion.div>
      )}

      {/* CONFIRMATION POPUP OVERLAY */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
            >
              <h3 className="text-lg font-bold text-white mb-2">Confirm Airtime Order</h3>
              <p className="text-gray-400 text-xs mb-5">Please double check the recipient phone number to prevent loss of funds. Airtime transactions are irreversible.</p>

              <div className="bg-white/5 rounded-xl p-4 text-xs space-y-3 mb-6 text-gray-300">
                <div className="flex justify-between pb-1 border-b border-white/5">
                  <span className="text-gray-500">Service</span>
                  <span className="font-mono font-bold text-white">{network} Recharge</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-white/5">
                  <span className="text-gray-500">Phone Number</span>
                  <span className="font-mono font-bold text-white">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Debit Amount</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">₦{parseFloat(amount).toLocaleString()}</span>
                </div>
              </div>

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
                  className="py-3 bg-amber-400 hover:scale-105 active:scale-95 rounded-xl text-black font-extrabold text-xs flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Confirm Payment <ShieldCheck className="w-4 h-4" /></>
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
