import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVTU } from "../../vtuContext";
import { ArrowLeft, CheckCircle, Wifi, ShieldCheck, AlertCircle } from "lucide-react";

interface VTUDataProps {
  onBack: () => void;
  showToast: (msg: string) => void;
}

interface DataPlan {
  id: string;
  name: string;
  price: number;
  validity: string;
}

export const VTUData: React.FC<VTUDataProps> = ({ onBack, showToast }) => {
  const { buyData, currentUser } = useVTU();
  const [network, setNetwork] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successResult, setSuccessResult] = useState<any | null>(null);
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const networks = [
    { name: "MTN", color: "bg-amber-400 text-black" },
    { name: "Airtel", color: "bg-red-600 text-white" },
    { name: "Glo", color: "bg-emerald-600 text-white" },
    { name: "9mobile", color: "bg-green-900 text-white" }
  ];

  // Map true, real-life Nigerian cell plan products
  const PLANS_MAP: Record<string, DataPlan[]> = {
    MTN: [
      { id: "mtn-1", name: "1.2GB Monthly", price: 1000, validity: "30 Days" },
      { id: "mtn-2", name: "1.5GB Monthly", price: 1200, validity: "30 Days" },
      { id: "mtn-3", name: "3GB Monthly", price: 1600, validity: "30 Days" },
      { id: "mtn-4", name: "6GB Monthly SLOWRE", price: 2500, validity: "30 Days" },
      { id: "mtn-5", name: "12GB Heavy Daily", price: 3500, validity: "30 Days" },
      { id: "mtn-6", name: "25GB Pro Package", price: 6000, validity: "30 Days" }
    ],
    Airtel: [
      { id: "art-1", name: "1.5GB Monthly", price: 1000, validity: "30 Days" },
      { id: "art-2", name: "2GB Monthly Extra", price: 1200, validity: "30 Days" },
      { id: "art-3", name: "3GB Saver Package", price: 1500, validity: "30 Days" },
      { id: "art-4", name: "4.5GB Smart Value", price: 2000, validity: "30 Days" },
      { id: "art-5", name: "10GB Heavy Monthly", price: 3000, validity: "30 Days" },
      { id: "art-6", name: "20GB Business Force", price: 5000, validity: "30 Days" }
    ],
    Glo: [
      { id: "glo-1", name: "1.25GB Monthly", price: 900, validity: "30 Days" },
      { id: "glo-2", name: "1.8GB Monthly Plus", price: 1000, validity: "30 Days" },
      { id: "glo-3", name: "3.9GB Super Saver", price: 1500, validity: "30 Days" },
      { id: "glo-4", name: "7.5GB High Volume", price: 2500, validity: "30 Days" },
      { id: "glo-5", name: "15GB Mega Data", price: 4000, validity: "30 Days" },
      { id: "glo-6", name: "24GB Extreme Volume", price: 5000, validity: "30 Days" }
    ],
    "9mobile": [
      { id: "9m-1", name: "1.5GB Monthly", price: 1000, validity: "30 Days" },
      { id: "9m-2", name: "3GB Smart Bundle", price: 1500, validity: "30 Days" },
      { id: "9m-3", name: "7GB Power Monthly", price: 2500, validity: "30 Days" },
      { id: "9m-4", name: "15GB Heavy Streamer", price: 4000, validity: "30 Days" },
      { id: "9m-5", name: "25GB Ultimate Fiber", price: 6500, validity: "30 Days" }
    ]
  };

  const getPlans = () => (network ? PLANS_MAP[network] || [] : []);
  const getSelectedPlan = () => getPlans().find((p) => p.id === selectedPlanId);

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
    const currentPlan = getSelectedPlan();
    if (!currentPlan) {
      setErrorInput("Please specify an internet data plan package.");
      return;
    }
    if (currentUser && currentUser.walletBalance < currentPlan.price) {
      setErrorInput("Insufficient wallet balance. Please fund your wallet first.");
      return;
    }

    setShowConfirm(true);
  };

  const handleExecute = async () => {
    const plan = getSelectedPlan();
    if (!plan) return;

    setIsLoading(true);
    setErrorInput(null);
    try {
      const tx = await buyData(network, phone, plan.name, plan.price);
      setSuccessResult(tx);
      showToast(`${plan.name} bundle loaded successfully!`);
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
        /* RECEPT BOX VIEW */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Bundle Dispatched</h2>
          <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase block mb-4">Dispatched</span>

          <div className="bg-white/5 rounded-xl p-4 text-left space-y-2.5 mb-6 text-xs text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Network Connection</span>
              <span className="font-bold text-white">{successResult.network}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Destination Mobile</span>
              <span className="font-mono font-bold text-white">{successResult.recipient}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Data Plan Option</span>
              <span className="font-bold text-white">{successResult.details.replace(network, "").replace("delivered to " + successResult.recipient, "")}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Direct Cost</span>
              <span className="font-mono font-bold text-white">₦{successResult.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gateway Reference</span>
              <span className="font-mono text-gray-400 uppercase">{successResult.reference}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSuccessResult(null);
              setPhone("");
              setSelectedPlanId("");
              setNetwork("");
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Load Another Data Bundle
          </button>
        </motion.div>
      ) : (
        /* ORDER FORM VIEW */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md relative"
        >
          <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-[#D4AF37]" />
          <h2 className="text-xl font-bold text-white mb-2">Buy Data Bundle</h2>
          <p className="text-xs text-gray-400 mb-6">Select a cell network and instantly deploy modular data bundles.</p>

          {errorInput && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-none" />
              <span className="leading-relaxed">{errorInput}</span>
            </div>
          )}

          <form onSubmit={handleValidate} className="space-y-5">
            {/* 1. Telco Logos */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Select Network Provider
              </label>
              <div className="grid grid-cols-4 gap-2">
                {networks.map((net) => (
                  <button
                    key={net.name}
                    type="button"
                    onClick={() => {
                      setNetwork(net.name);
                      setSelectedPlanId("");
                    }}
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

            {/* 2. Destination Mobile Number */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Recipient Phone Number
              </label>
              <input
                type="text"
                required
                maxLength={11}
                placeholder="e.g. 08031234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {/* 3. Dropdown Selection of actual bundles */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Select Data Value Plan
              </label>
              <select
                disabled={!network}
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <option value="" className="bg-[#121212] text-gray-500">
                  {network ? "-- Click to Choose Plan option --" : "Specify Network Provider first"}
                </option>
                {getPlans().map((plan) => (
                  <option key={plan.id} value={plan.id} className="bg-[#121212] text-white">
                    {plan.name} - ₦{plan.price.toLocaleString()} ({plan.validity})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Plan Details Card Indicator */}
            {getSelectedPlan() && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center"
              >
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Billing details</span>
                  <div className="text-white text-xs font-bold mt-0.5">{getSelectedPlan()?.name}</div>
                </div>
                <div className="text-[#D4AF37] font-mono text-base font-black">
                  ₦{getSelectedPlan()?.price.toLocaleString()}
                </div>
              </motion.div>
            )}

            {/* 4. Action Launch */}
            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              Verify & Purchase Bundle
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
              <h3 className="text-lg font-bold text-white mb-2 font-sans">Confirm Data Purchase</h3>
              <p className="text-gray-400 text-xs mb-5 leading-relaxed">Ensure you specified the exact network corresponding to the recipient number to avoid activation failure.</p>

              {getSelectedPlan() && (
                <div className="bg-white/5 rounded-xl p-4 text-xs space-y-3 mb-6 text-gray-300">
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Telco Provider</span>
                    <span className="font-bold text-white">{network} Data</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Destination</span>
                    <span className="font-mono font-bold text-white">{phone}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5">
                    <span className="text-gray-500">Package Spec</span>
                    <span className="font-bold text-white">{getSelectedPlan()?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Direct Cost</span>
                    <span className="font-mono font-bold text-[#D4AF37] text-sm">₦{getSelectedPlan()?.price.toLocaleString()}</span>
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
                  className="py-3 bg-[#D4AF37] hover:scale-105 active:scale-95 rounded-xl text-black font-extrabold text-xs flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Deliver Bundle <ShieldCheck className="w-4 h-4" /></>
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
