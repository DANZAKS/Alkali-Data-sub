import React, { useState } from "react";
import { motion } from "motion/react";
import { useVTU } from "../../vtuContext";
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

interface VTUAuthProps {
  initialView: "login" | "register";
  onBack: () => void;
  onSuccess: () => void;
  showToast: (msg: string) => void;
}

export const VTUAuth: React.FC<VTUAuthProps> = ({
  initialView,
  onBack,
  onSuccess,
  showToast
}) => {
  const { login, register } = useVTU();
  const [view, setView] = useState<"login" | "register">(initialView);
  
  // Form fields state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // UI feedback states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Core Authentication Submit handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Common validations
    if (!email || !password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsLoadingForm(true);

    try {
      if (view === "login") {
        await login(email, password);
        showToast("Welcome back! Logged in successfully.");
        onSuccess();
      } else {
        // Registration validations
        if (!fullName || !phoneNumber) {
          setErrorMessage("Please fill out your full name and phone number.");
          setIsLoadingForm(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match!");
          setIsLoadingForm(false);
          return;
        }
        if (password.length < 6) {
          setErrorMessage("Password must be at least 6 characters.");
          setIsLoadingForm(false);
          return;
        }
        if (!acceptTerms) {
          setErrorMessage("Please accept our terms and conditions to proceed.");
          setIsLoadingForm(false);
          return;
        }

        await register(fullName, email, phoneNumber, password);
        showToast("Registration successful! Account wallet created.");
        onSuccess();
      }
    } catch (err: any) {
      console.error(err);
      let readableError = "Authentication failed. Please verify credentials.";
      if (err.message) {
        if (err.message.includes("auth/user-not-found") || err.message.includes("auth/wrong-password")) {
          readableError = "Invalid email or password password.";
        } else if (err.message.includes("auth/email-already-in-use")) {
          readableError = "This email is already registered on our servers.";
        } else {
          readableError = err.message;
        }
      }
      setErrorMessage(readableError);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Landing Page
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative"
      >
        {/* Neon accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />
        
        <div className="text-center mb-8">
          <span className="text-xl font-bold uppercase tracking-tighter text-white">
            Alkali <span className="text-[#D4AF37]">VTU Core</span>
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-3">
            {view === "login" ? "Welcome Back" : "Register Wallet"}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {view === "login" 
              ? "Access your digital wallet balance and pay utility bills." 
              : "Create an instant Nigerian virtual account in less than 30 seconds."}
          </p>
        </div>

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex gap-2 items-start"
          >
            <ShieldAlert className="w-4 h-4 mt-0.5 flex-none" />
            <span className="leading-relaxed">{errorMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === "register" && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kamilu Adamu"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08050444411"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Password
              </label>
              {view === "login" && (
                <button 
                  type="button"
                  onClick={() => showToast("Password reset link forwarded to fallback portal.")}
                  className="text-[10px] font-mono text-[#D4AF37] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-11 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {view === "register" && (
            <>
              {/* Confirm Password */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* T&C checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded border-white/10 text-[#D4AF37] focus:ring-0 focus:ring-offset-0 bg-white/5 cursor-pointer"
                />
                <label htmlFor="acceptTerms" className="text-gray-400 text-xs leading-relaxed select-none cursor-pointer">
                  I agree to Alkali VTU's and Central Bank of Nigeria's (CBN) regulatory compliance of terms & conditions.
                </label>
              </div>
            </>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoadingForm}
            className="w-full py-4 bg-[#D4AF37] text-black font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {isLoadingForm ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : view === "login" ? (
              "Log In to Secure Wallet"
            ) : (
              "Complete Register & Create Wallet"
            )}
          </button>
        </form>

        {/* Toggle between registrations and logins */}
        <div className="text-center mt-6 pt-6 border-t border-white/5">
          <button
            type="button"
            onClick={() => setView(view === "login" ? "register" : "login")}
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {view === "login" ? (
              <>Don't have an account? <span className="text-[#D4AF37] hover:underline">Register Wallet</span></>
            ) : (
              <>Already have a wallet? <span className="text-[#D4AF37] hover:underline">Sign In</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
