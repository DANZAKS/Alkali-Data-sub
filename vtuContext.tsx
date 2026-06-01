import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  VTUUser, 
  VTUTransaction, 
  VTUServiceType, 
  VTUTransactionStatus 
} from "./types";
import { isFirebaseConfigured, auth as firebaseAuth, db as firebaseDb } from "./firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from "firebase/firestore";

interface VTUContextType {
  currentUser: VTUUser | null;
  transactions: VTUTransaction[];
  isLoading: boolean;
  isFirebaseActive: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (fullName: string, email: string, phoneNumber: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  buyAirtime: (network: string, phone: string, amount: number) => Promise<VTUTransaction>;
  buyData: (network: string, phone: string, planName: string, amount: number) => Promise<VTUTransaction>;
  payElectricity: (disco: string, meterNumber: string, amount: number) => Promise<VTUTransaction>;
  payTV: (provider: string, smartCard: string, bouquetName: string, amount: number) => Promise<VTUTransaction>;
  fundWallet: (amount: number, method: string) => Promise<VTUTransaction>;
  verifyMeter: (disco: string, meterNumber: string) => Promise<{ customerName: string; address: string } | null>;
  verifyDecoder: (provider: string, smartCard: string) => Promise<{ customerName: string; currentBouquet: string } | null>;
}

const VTUContext = createContext<VTUContextType | undefined>(undefined);

// Initial mock transactions to make the prototype look gorgeous and production-ready
const INITIAL_MOCK_TRANSACTIONS: VTUTransaction[] = [
  {
    id: "tx-1",
    userId: "mock-user-123",
    serviceType: "deposit",
    recipient: "Wallet Balance",
    amount: 10000,
    details: "Wallet self-funded via Card (Paystack)",
    status: "success",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    reference: "ALK_DEP_77819E"
  },
  {
    id: "tx-2",
    userId: "mock-user-123",
    serviceType: "airtime",
    network: "MTN",
    recipient: "08034112938",
    amount: 1500,
    details: "MTN Airtime purchase successful",
    status: "success",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    reference: "ALK_AIR_88192A"
  },
  {
    id: "tx-3",
    userId: "mock-user-123",
    serviceType: "data",
    network: "Airtel",
    recipient: "09012488123",
    amount: 2000,
    details: "Airtel 7GB Monthly Data Bundle loaded",
    status: "success",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    reference: "ALK_DAT_99212C"
  },
  {
    id: "tx-4",
    userId: "mock-user-123",
    serviceType: "electricity",
    network: "AEDC (Abuja Disco)",
    recipient: "54110399120",
    amount: 5000,
    details: "AEDC Postpaid token generated: 9021-3312-4011-5411",
    status: "success",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    reference: "ALK_ELE_10123D"
  }
];

export const VTUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<VTUUser | null>(null);
  const [transactions, setTransactions] = useState<VTUTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage backup for persistent mock state
  useEffect(() => {
    if (!isFirebaseConfigured) {
      const savedUser = localStorage.getItem("alkali_vtu_user");
      const savedTxs = localStorage.getItem("alkali_vtu_txs");
      
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Set up custom default profile so user has a perfect walkthrough without signing up
        const defaultProfile: VTUUser = {
          uid: "mock-user-123",
          fullName: "Kamilu Adamu",
          email: "abdulrazakhassanadam66@gmail.com",
          phoneNumber: "08050444411",
          walletBalance: 53500, // starting balance ₦53,500
          role: "user",
          createdAt: new Date().toISOString()
        };
        setCurrentUser(defaultProfile);
        localStorage.setItem("alkali_vtu_user", JSON.stringify(defaultProfile));
      }

      if (savedTxs) {
        setTransactions(JSON.parse(savedTxs));
      } else {
        setTransactions(INITIAL_MOCK_TRANSACTIONS);
        localStorage.setItem("alkali_vtu_txs", JSON.stringify(INITIAL_MOCK_TRANSACTIONS));
      }
      setIsLoading(false);
    } else {
      // Setup real Firebase Auth observation
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          try {
            // Fetch profile data from Firestore
            const docRef = doc(firebaseDb, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setCurrentUser({
                uid: user.uid,
                fullName: userData.fullName || user.displayName || "Fintech User",
                email: user.email || "",
                phoneNumber: userData.phoneNumber || "",
                walletBalance: userData.walletBalance || 0,
                role: userData.role || "user",
                createdAt: userData.createdAt ? new Date(userData.createdAt.seconds * 1000).toISOString() : new Date().toISOString()
              });
            } else {
              // Create user profile on-the-fly if missing
              const newProfile: VTUUser = {
                uid: user.uid,
                fullName: user.displayName || "Fintech User",
                email: user.email || "",
                phoneNumber: "",
                walletBalance: 20000, // ₦20,000 sign-up bonus for testing!
                role: "user",
                createdAt: new Date().toISOString()
              };
              await setDoc(docRef, {
                fullName: newProfile.fullName,
                email: newProfile.email,
                phoneNumber: newProfile.phoneNumber,
                walletBalance: newProfile.walletBalance,
                role: newProfile.role,
                createdAt: serverTimestamp()
              });
              setCurrentUser(newProfile);
            }

            // Load user's live transactions
            const txQuery = query(
              collection(firebaseDb, "transactions"),
              where("userId", "==", user.uid),
              orderBy("createdAt", "desc")
            );
            const querySnap = await getDocs(txQuery);
            const liveTxs: VTUTransaction[] = [];
            querySnap.forEach((txDoc) => {
              const d = txDoc.data();
              liveTxs.push({
                id: txDoc.id,
                userId: d.userId,
                serviceType: d.serviceType,
                network: d.network,
                recipient: d.recipient,
                amount: d.amount,
                details: d.details,
                status: d.status,
                createdAt: d.createdAt ? new Date(d.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
                reference: d.reference
              });
            });
            setTransactions(liveTxs);
          } catch (err) {
            console.error("Firestore read error:", err);
          }
        } else {
          setCurrentUser(null);
          setTransactions([]);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  // Synchronize dynamic mock storage writes
  const syncLocalMock = (usr: VTUUser | null, txs: VTUTransaction[]) => {
    if (!isFirebaseConfigured) {
      if (usr) localStorage.setItem("alkali_vtu_user", JSON.stringify(usr));
      localStorage.setItem("alkali_vtu_txs", JSON.stringify(txs));
    }
  };

  // 1. Log In Action
  const login = async (email: string, pass: string) => {
    if (isFirebaseConfigured) {
      await signInWithEmailAndPassword(firebaseAuth, email, pass);
    } else {
      // Mock log in: find default or create
      const mockUser: VTUUser = {
        uid: "mock-user-123",
        fullName: "Kamilu Adamu",
        email: email,
        phoneNumber: "08050444411",
        walletBalance: 53500,
        role: "user",
        createdAt: new Date().toISOString()
      };
      setCurrentUser(mockUser);
      syncLocalMock(mockUser, transactions);
    }
  };

  // 2. Registration Action
  const register = async (fullName: string, email: string, phoneNumber: string, pass: string) => {
    if (isFirebaseConfigured) {
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, pass);
      await updateProfile(userCred.user, { displayName: fullName });
      
      const newProfile = {
        fullName,
        email,
        phoneNumber,
        walletBalance: 25000, // ₦25,000 sign-up budget for testing!
        role: "user",
        createdAt: serverTimestamp()
      };
      await setDoc(doc(firebaseDb, "users", userCred.user.uid), newProfile);
    } else {
      // Mock registration
      const newProfile: VTUUser = {
        uid: `mock-u-${Date.now()}`,
        fullName,
        email,
        phoneNumber,
        walletBalance: 25000,
        role: "user",
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newProfile);
      setTransactions([]);
      syncLocalMock(newProfile, []);
    }
  };

  // 3. Log Out Action
  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(firebaseAuth);
    } else {
      setCurrentUser(null);
      localStorage.removeItem("alkali_vtu_user");
    }
  };

  // Helper: record a generic transaction in DB/LocalStorage
  const recordTransaction = async (
    serviceType: VTUServiceType,
    amount: number,
    details: string,
    recipient: string,
    network?: string
  ): Promise<VTUTransaction> => {
    if (!currentUser) throw new Error("Requires authenticated login session.");
    if (currentUser.walletBalance < amount) throw new Error("Insufficient wallet balance.");

    const reference = `ALK_${serviceType.slice(0, 3).toUpperCase()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const newTx: Omit<VTUTransaction, "id" | "createdAt"> = {
      userId: currentUser.uid,
      serviceType,
      network,
      recipient,
      amount,
      details,
      status: "success",
      reference
    };

    if (isFirebaseConfigured) {
      // 1. Update user balance
      const newBalance = currentUser.walletBalance - amount;
      const userRef = doc(firebaseDb, "users", currentUser.uid);
      await setDoc(userRef, { walletBalance: newBalance }, { merge: true });
      
      // 2. Create the transaction
      const txRef = await addDoc(collection(firebaseDb, "transactions"), {
        ...newTx,
        createdAt: serverTimestamp()
      });

      // Update state
      const resolvedTx: VTUTransaction = {
        id: txRef.id,
        ...newTx,
        createdAt: new Date().toISOString()
      };

      setCurrentUser(prev => prev ? { ...prev, walletBalance: newBalance } : null);
      setTransactions(prev => [resolvedTx, ...prev]);
      return resolvedTx;
    } else {
      // Mock mode
      const newBalance = currentUser.walletBalance - amount;
      const resolvedTx: VTUTransaction = {
        id: `tx-${Date.now()}`,
        ...newTx,
        createdAt: new Date().toISOString()
      };
      
      const updatedUser = { ...currentUser, walletBalance: newBalance };
      const updatedTxs = [resolvedTx, ...transactions];
      
      setCurrentUser(updatedUser);
      setTransactions(updatedTxs);
      syncLocalMock(updatedUser, updatedTxs);
      return resolvedTx;
    }
  };

  // 4. Airtime top up implementation
  const buyAirtime = async (network: string, phone: string, amount: number) => {
    const details = `₦${amount.toLocaleString()} ${network} Airtime top-up loaded to ${phone}`;
    return await recordTransaction("airtime", amount, details, phone, network);
  };

  // 5. Data Purchase implementation
  const buyData = async (network: string, phone: string, planName: string, amount: number) => {
    const details = `${network} Data (${planName}) delivered to ${phone}`;
    return await recordTransaction("data", amount, details, phone, network);
  };

  // 6. Electricity utility payment implementation
  const payElectricity = async (disco: string, meterNumber: string, amount: number) => {
    const token = Math.floor(1000 + Math.random() * 9000) + "-" + 
                  Math.floor(1000 + Math.random() * 9000) + "-" + 
                  Math.floor(1000 + Math.random() * 9000) + "-" + 
                  Math.floor(1000 + Math.random() * 9000);
    const details = `${disco} Postpaid validation. Token generated: ${token}`;
    return await recordTransaction("electricity", amount, details, meterNumber, disco);
  };

  // 7. TV subscription payment implementation
  const payTV = async (provider: string, smartCard: string, bouquetName: string, amount: number) => {
    const details = `${provider} (${bouquetName}) bundle renewed for smartcard ${smartCard}`;
    return await recordTransaction("tv", amount, details, smartCard, provider);
  };

  // 8. Fund Wallet engine
  const fundWallet = async (amount: number, method: string) => {
    if (!currentUser) throw new Error("Requires session user.");
    
    const reference = `ALK_DEP_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const resolvedTx: VTUTransaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.uid,
      serviceType: "deposit",
      recipient: "Wallet Balance",
      amount,
      details: `Wallet funded with ₦${amount.toLocaleString()} via ${method}`,
      status: "success",
      createdAt: new Date().toISOString(),
      reference
    };

    const newBalance = currentUser.walletBalance + amount;

    if (isFirebaseConfigured) {
      const userRef = doc(firebaseDb, "users", currentUser.uid);
      await setDoc(userRef, { walletBalance: newBalance }, { merge: true });
      await addDoc(collection(firebaseDb, "transactions"), {
        ...resolvedTx,
        createdAt: serverTimestamp()
      });
    }

    const updatedUser = { ...currentUser, walletBalance: newBalance };
    const updatedTxs = [resolvedTx, ...transactions];

    setCurrentUser(updatedUser);
    setTransactions(updatedTxs);
    syncLocalMock(updatedUser, updatedTxs);

    return resolvedTx;
  };

  // Utility verifiers (imulates remote API integration lookup instantly)
  const verifyMeter = async (disco: string, meterNumber: string) => {
    await new Promise(r => setTimeout(r, 600)); // Simulate API delay
    if (meterNumber.length < 5) return null;
    return {
      customerName: "ALHAJI BILAMINU LAWAL",
      address: "Plot 419 Gwarinpa Estate Bypass, near Aminu Kano Way, Abuja."
    };
  };

  const verifyDecoder = async (provider: string, smartCard: string) => {
    await new Promise(r => setTimeout(r, 600)); // Simulate API delay
    if (smartCard.length < 5) return null;
    return {
      customerName: "MRS. KHADIJAT SHU'AIBU",
      currentBouquet: provider === "DSTV" ? "DSTV Yanga (₦5,100)" : "GOTV Max (₦7,200)"
    };
  };

  return (
    <VTUContext.Provider value={{
      currentUser,
      transactions,
      isLoading,
      isFirebaseActive: isFirebaseConfigured,
      login,
      register,
      logout,
      buyAirtime,
      buyData,
      payElectricity,
      payTV,
      fundWallet,
      verifyMeter,
      verifyDecoder
    }}>
      {children}
    </VTUContext.Provider>
  );
};

export const useVTU = () => {
  const context = useContext(VTUContext);
  if (context === undefined) {
    throw new Error("useVTU must be used inside a VTUProvider");
  }
  return context;
};
