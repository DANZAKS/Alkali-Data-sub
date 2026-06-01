import { Product, Category, WhyChooseUsItem } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "watches",
    name: "Smart Watches",
    icon: "Watch",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    description: "Fitness trackers, cellular smartwatches, and luxury screen styles.",
    count: 8,
  },
  {
    id: "earbuds",
    name: "AirPods & Earbuds",
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    description: "Active noise-cancelling and high-fidelity wire-free sound.",
    count: 12,
  },
  {
    id: "speakers",
    name: "Bluetooth Speakers",
    icon: "Volume2",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Rugged waterproof build and deep heavy bass acoustics.",
    count: 6,
  },
  {
    id: "powerbanks",
    name: "Power Banks",
    icon: "BatteryCharging",
    image: "https://images.unsplash.com/photo-1609592424083-d083b9c7b049?auto=format&fit=crop&w=600&q=80",
    description: "High-capacity power houses with ultra-fast PD charging.",
    count: 7,
  },
  {
    id: "chargers",
    name: "Chargers & Cables",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80",
    description: "GaN chargers, magnetic docks, and armor-braided cables.",
    count: 14,
  },
  {
    id: "gaming",
    name: "Gaming & Gadgets",
    icon: "Gamepad2",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
    description: "RGB gaming gears and innovative smart house gadgets.",
    count: 9,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "alkali-watch-ultra",
    name: "Alkali Horizon Watch Ultra 2",
    category: "watches",
    price: 48500,
    originalPrice: 55000,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    description: "Experience the pinnacle of wrist technology. Featuring a bright, high-resolution always-on AMOLED screen, aviation-grade metallic structure, multi-sport tracking, GPS mapping, and extensive 7-day backup cells.",
    rating: 4.9,
    reviewsCount: 142,
    available: true,
    features: [
      "1.96-inch Always-on AMOLED display (1000 nits brightness)",
      "Continuous heart rate monitor, SpO2 sensor & stress mapping",
      "Wireless charging dock and intelligent battery saver rules",
      "IP68 Professional Dust and Water Defense limits",
      "Bluetooth calling and voice command trigger compatibility"
    ],
    specs: {
      "Display Size": "1.96 Inches AMOLED",
      "Battery Life": "Up to 7 days active (18 days standby)",
      "Body Material": "Titanium Alloy frame",
      "Connectivity": "Bluetooth 5.3 + GPS",
      "Water Resistance": "IP68 / 5ATM swimproof"
    }
  },
  {
    id: "alkali-wireless-pods",
    name: "Alkali EchoStream ANC Pro",
    category: "earbuds",
    price: 24500,
    originalPrice: 32000,
    badge: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=600&q=80",
    description: "Unravel rich audio textures with 45dB Active Noise Cancellation. Engineered for true audiophiles, these earbuds provide low-latency connectivity, dynamic bass, and an elegant glass-like charging case with glowing parameters.",
    rating: 4.8,
    reviewsCount: 94,
    available: true,
    features: [
      "Hybrid Active Noise Cancellation (up to 45dB reduction)",
      "Hi-Res Spatial Surround sound with customized equalizer profiles",
      "Instant dual-device pairing capabilities over Bluetooth v5.4",
      "Up to 40 Hours total play session with premium LED charging holder",
      "Triple-microphone setup with clear crisp voice isolation"
    ],
    specs: {
      "Driver Unit": "12.4mm Custom Dynamic drivers",
      "Noise Control": "Active Noise Cancellation + Ambient Passthrough",
      "Battery Life": "8 Hours earbuds solely (Total 40 Hours with Case)",
      "Waterproofing": "IPX5 rating resistance",
      "Latency": "38ms Ultra-low gaming sync mode"
    }
  },
  {
    id: "alkali-speaker-cyclone",
    name: "Alkali Cyclone RGB Bass Speaker",
    category: "speakers",
    price: 36000,
    originalPrice: 45000,
    badge: "RGB SYNC",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Elevate your visual soundstage. The Cyclone speaker provides powerful sound with deep dual passive bass radiators, 30W output, and beautiful customizable neon lighting loops syncing to your music track rhythms.",
    rating: 4.7,
    reviewsCount: 68,
    available: true,
    features: [
      "Room-filling 30W high-definition premium acoustic driver system",
      "Rich dual bass radiator cones for distortion-free low values",
      "Fully syncing RGB dynamic glow ring loops (5 lighting states)",
      "Wireless Dual Connection (TWS) to pair two speakers together",
      "IPX7 waterproof armor structure suited for pools and outdoor trips"
    ],
    specs: {
      "Sound Output": "30W Premium RMS",
      "Playable Time": "Up to 15 Hours continuously",
      "Glow Control": "6 Interactive LED modes",
      "Chassis Material": "Silicon armored knit mesh",
      "Signal Ports": "Bluetooth 5.2, AUX input, TF Card slot"
    }
  },
  {
    id: "alkali-power-vault",
    name: "Alkali PowerVault 30000mAh 65W",
    category: "powerbanks",
    price: 28000,
    originalPrice: 35000,
    badge: "SUPERCHARGE",
    image: "https://images.unsplash.com/photo-1609592424083-d083b9c7b049?auto=format&fit=crop&w=600&q=80",
    description: "Unleash portable laptop charging power. Embodying 30,000mAh structural fuel, this PowerVault delivers up to 65W PD fast charging through USB-C, ensuring your phones, tablets, and MacBooks stay fully powered on long trips.",
    rating: 4.9,
    reviewsCount: 112,
    available: true,
    features: [
      "High power 65W Power Delivery (PD) to rapid charge cell laptops",
      "Monster 30000mAh volume can juice smart devices up to 7 times",
      "Live LED display tracking exact volume percentages and voltage rates",
      "Triple Output slots (2x USB-C PD, 1x USB-A QC 3.0 ultra charge)",
      "Integrated intelligent heating sensors & surge armor protections"
    ],
    specs: {
      "Energy Volume": "30,000mAh / 111Wh capacity",
      "Maximum Output": "65W USB-C Power Delivery",
      "Display Board": "Full digital LED percentages",
      "Body Shielding": "Flame-retardant Polycarbonate armor shell",
      "Supported Protocols": "PD 3.0, QC 4+, PPS, AFC smart charging"
    }
  },
  {
    id: "alkali-multi-charger",
    name: "Alkali GaN ChargeMaster 120W",
    category: "chargers",
    price: 18500,
    originalPrice: 22000,
    badge: "GaN TECH",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80",
    description: "Consolidate your charging blocks into one compact powerhouse. Powered by modern Gallium Nitride (GaN) engineering, this charger distributes up to 120W energy across four smart ports with minimal heat emission.",
    rating: 4.7,
    reviewsCount: 55,
    available: true,
    features: [
      "Advanced Gallium Nitride (GaN) architecture is 40% smaller and cooler",
      "120W combined high Output capable of fast charging two laptops at once",
      "Four dynamic ports (3x USB-C PD 3.0, 1x USB-A Quick Charge)",
      "Multi-region safety standard plugs with heat protection relays",
      "Included 100W luxury armored nylon-braided fast speed cable"
    ],
    specs: {
      "Max Power Core": "120W Smart Allocation",
      "Powering Ports": "3x USB-C Ports, 1x USB-A Port",
      "Tech Type": "GaN (Gallium Nitride) Gen 5",
      "Universal Power": "100-240V, 50/60Hz input worldwide",
      "Fast Compatibility": "MacBook Pro/Air, iPhone, Galaxy, Switch"
    }
  },
  {
    id: "alkali-gaming-keyboard",
    name: "Alkali Apex RGB Mech Keyboard",
    category: "gaming",
    price: 32500,
    originalPrice: 42000,
    badge: "CYBERPUNK",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
    description: "Re-engineered for lightning reflexes and tactical supremacy. This highly aesthetic 75% mechanical keyboard features optical blue clicky switches, customized double-shot PBT keycaps, and programmable glowing neon RGB layers.",
    rating: 4.8,
    reviewsCount: 44,
    available: true,
    features: [
      "Ultra-responsive clicky hot-swappable tactile mechanical switches",
      "Dynamic reactive per-key neon backlighting with offline patterns",
      "Premium 75% compact spatial frame featuring metal media wheels",
      "Triple connectivity formats (2.4GHz dongle, Bluetooth v5.1, custom Type-C)",
      "Massive built-in power cell supporting 200 hours continuous typing sessions"
    ],
    specs: {
      "Layout Size": "75% Minimal compact (82 tactile keycaps)",
      "Key Switches": "Outemu Custom Blue Clicky switches (50M lifespan)",
      "Light Profiles": "18 Glowing preset modes & customization arrays",
      "Core Material": "Sleek Brushed Metal Plate with ABS base shell",
      "Response Delay": "1ms ultra-low gaming polling speed keys"
    }
  },
  {
    id: "alkali-studio-phones",
    name: "Alkali SoundStage Studio ANC",
    category: "earbuds",
    price: 45000,
    originalPrice: 55000,
    badge: "HI-RES AUDIO",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Engulf yourself in deep studio acoustics. Over-ear design with plush high-comfort memory ear padding, 40mm neodymium drivers, and intelligent environmental noise cancellation filters offering full spatial soundstage depths.",
    rating: 4.9,
    reviewsCount: 82,
    available: true,
    features: [
      "Large 40mm Dynamic sound drivers for rich high-resolution details",
      "Active Environmental Hybrid cancellation blocks out hums up to 48dB",
      "Plush cooling memory foam ear cups for zero fatigue long playlists",
      "Fast charging speed: 10 mins plug-in yields 5 hours high output",
      "Collapsible premium design includes luxury carrying armored case"
    ],
    specs: {
      "Driver Unit": "40mm custom Neodymium dome dynamic",
      "Frequency Support": "20Hz - 40,000Hz (Ultra-expanded range)",
      "Active Playtime": "Up to 55 Hours (ANC off) / 40 Hours (ANC active)",
      "Chassis Quality": "Polycarbonate reinforced with steel headband",
      "Microphone Array": "Beamforming setup with wind noise filtering relays"
    }
  },
  {
    id: "alkali-armor-case",
    name: "Alkali MagCarbon Shield Case",
    category: "accessories",
    price: 9500,
    originalPrice: 12000,
    badge: "CARBON ARMOR",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    description: "Elevate your phone defense layout with premium aerospace-grade carbon weave texture. Equipped with powerful MagSafe magnetic ring matrix support and sleek drop defense shockproof technology, styled minimalist and rugged.",
    rating: 4.6,
    reviewsCount: 153,
    available: true,
    features: [
      "Genuine carbon fiber armor look with luxury tactile anti-slip coating",
      "Built-in robust N52 magnetic rings offering perfect MagSafe dock clicks",
      "Military-grade shock defense corners protecting screens and cameras",
      "Ultra-thin profile preserves lightweight elegance with perfect cutouts",
      "Acoustic routing holes maximizing phone sound speaker chambers"
    ],
    specs: {
      "Chassis Material": "DuPont Aramid weave layer combined with TPU bumper edges",
      "Magnet Grip": "360-degree N52 structural magnets (1500g hold power)",
      "Drop rating": "12ft military standard dropped certification",
      "Frame Weight": "Only 24 grams lightweight profile",
      "Color Theme": "Deep Sleek Stealth Carbon Black matte"
    }
  },
  {
    id: "alkali-braided-cable",
    name: "Alkali NanoLink 3-in-1 LED Cable",
    category: "chargers",
    price: 4500,
    originalPrice: 6000,
    badge: "SMART LED",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80",
    description: "One ultimate speed cable for all smart systems. Fitted with triple connectors (USB-C, Lightning, Micro-USB) crafted inside dual-braided ballistic nylon and complete with real-time digital power-tracking LED display panels.",
    rating: 4.7,
    reviewsCount: 198,
    available: true,
    features: [
      "Triple connectivity leads charge iPhones, Android devices, and USB systems",
      "Integrated smart digital power board shows live output charge values",
      "Heavy armor 48-strand braided ballistic nylon resists over 30,000 extreme bends",
      "Speed transfers: up to 100W Power Delivery on the main USB-C outlet",
      "Gold-plated rust resistant connection terminal heads for long-term power"
    ],
    specs: {
      "Cable Length": "1.2 Meters / 4 Feet luxury length",
      "Combined Output": "Supports up to 100W maximal single stream charging",
      "Connectors Set": "USB-C, Lightning (iOS), Micro-USB multi-tails",
      "Data Sync Rate": "480Mbps high speed database syncing capability",
      "Wiring Shield": "Inner tinned copper core wrapped in protective Kevlar"
    }
  }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: "original-products",
    title: "Original Products Only",
    description: "We source directly from official global partners to guarantee 100% authentic, high-end electronics with serial codes.",
    icon: "ShieldAlert"
  },
  {
    id: "affordable-prices",
    title: "Affordable Luxury",
    description: "Premium gadgets at highly competitive rates with flexible seasonal deals tailored for smart electronic lovers.",
    icon: "Percent"
  },
  {
    id: "third-party-delivery",
    title: "Secure Delivery Networks",
    description: "Reliable and fast third-party dispatch delivery within Kano and surrounding states in perfect secure packages.",
    icon: "Truck"
  },
  {
    id: "customer-support",
    title: "Dedicated Client Desk",
    description: "Prompt, helpful custom service assistance and troubleshooting for any technical or operation layout concerns.",
    icon: "LifeBuoy"
  },
  {
    id: "quality-guaranteed",
    title: "Quality Warranty Cover",
    description: "Comprehensive product replacement standards and store warranty support representing elite quality limits.",
    icon: "CheckCircle2"
  }
];
