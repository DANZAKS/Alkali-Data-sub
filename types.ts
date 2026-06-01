export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images?: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  specs: Record<string, string>;
  features: string[];
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // name of lucide icon
  image: string;
  description: string;
  count: number;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string; // name of lucide icon
}

export type VTUServiceType = "airtime" | "data" | "electricity" | "tv" | "deposit";
export type VTUTransactionStatus = "success" | "pending" | "failed";

export interface VTUUser {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
  role: "user" | "admin";
  createdAt: string;
}

export interface VTUTransaction {
  id: string;
  userId: string;
  serviceType: VTUServiceType;
  network?: string; // MTN, Airtel, Glo, 9mobile, or Provider name (like AEDC, DSTV)
  recipient: string; // phone number, meter number, decoder card
  amount: number;
  details: string;
  status: VTUTransactionStatus;
  createdAt: string;
  reference: string;
}

