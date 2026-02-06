
import { MenuItem } from './types';

export const INITIAL_MENU_DATA: MenuItem[] = [
  {
    id: "1",
    name: "কম্বো-০১ (চুই হাঁস + রুটি)",
    description: "১ প্লেট চুই ঝালের হাঁসের মাংস (১:১) এবং ৩টি চালের আটার রুটি।",
    price: 150,
    category: "কম্বো অফার",
    isSpicy: true,
    isBestSeller: true
  },
  {
    id: "2",
    name: "কম্বো-০২ (থাই সুপ + অনথন)",
    description: "মাশরুম অথবা প্রন থাই সুপ (১:১) এবং ২ পিস অনথন।",
    price: 100,
    category: "কম্বো অফার"
  },
  {
    id: "3",
    name: "কম্বো-০৩ (সুপ + অনথন + মোমো)",
    description: "থাই সুপ (১:১), ২ পিস অনথন এবং ২ পিস মোমো।",
    price: 150,
    category: "কম্বো অফার"
  },
  {
    id: "4",
    name: "মোমো (চিকেন রেগুলার)",
    description: "চিকেন স্টাফড মোমো (রেগুলার)।",
    price: 100,
    category: "মোমো ও পাস্তা"
  },
  {
    id: "6",
    name: "মোমো (হোয়াইট সস)",
    description: "ক্রিমি হোয়াইট সসে ডুবানো বিশেষ মোমো।",
    price: 130,
    category: "মোমো ও পাস্তা",
    isBestSeller: true
  },
  {
    id: "8",
    name: "নাচোস",
    price: "৩০/৫০",
    category: "স্ন্যাকস ও সাইডস",
    options: [
      { label: "হাফ", price: 30 },
      { label: "ফুল", price: 50 }
    ]
  },
  {
    id: "10",
    name: "চিকেন চিজ বল (৪ পিস)",
    description: "চিজ এবং চিকেন ভরা মচমচে বল।",
    price: 100,
    category: "স্ন্যাকস ও সাইডস",
    isBestSeller: true
  }
];

export const INITIAL_CATEGORIES = ["কম্বো অফার", "মোমো ও পাস্তা", "স্ন্যাকস ও সাইডস", "পানীয়"];

export const INITIAL_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1544333346-64e4fe18274b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=2000&auto=format&fit=crop",
];
