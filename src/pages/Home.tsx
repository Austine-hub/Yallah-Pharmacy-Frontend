// ===============================================================
// 🏠 Home.tsx — Optimized Home Page Component (2025)
// ===============================================================

import {type FC, Suspense, lazy } from "react";

// ===============================================================
// 🧩 Eagerly Loaded Components (Critical for FCP)
// ===============================================================
import Hero from "../components/header/Hero";
import Shop from "../components/Shop";
import PromoBanners from "../promo/PromoBanners";
import WellnessBanner from "../promo/WellnessBanner";
import ProductCarousel from "../pages/ProductCarousel";

// ===============================================================
// 💤 Lazy Loaded Components (Non-Critical Sections)
// ===============================================================
const Offers1 = lazy(() => import("../pages/Offers1"));
const ShopByCategory = lazy(() => import("../pages/ShopByCategory"));
const BestSellers = lazy(() => import("../pages/BestSellers"));
const BeautyProducts = lazy(() => import("../pages/BeautyProducts"));
const BlogSection = lazy(() => import("../blog/BlogSection"));

// ===============================================================
// ⏳ Loading Fallback Component
// ===============================================================
const LoadingFallback: FC = () => (
  <div className="py-16 text-gray-500 animate-pulse text-lg font-medium">
    Loading content, please wait...
  </div>
);

// ===============================================================
// 🏠 Home Page
// ===============================================================
const Home: FC = () => {
  return (
    <main className="p-8 text-center">
      <Hero />
      <ProductCarousel />
      <PromoBanners />
      <Shop />
      <WellnessBanner />

      <Suspense fallback={<LoadingFallback />}>
        <Offers1 />
        <BestSellers />
        <ShopByCategory />
        <BeautyProducts />
        <BlogSection />
      </Suspense>
    </main>
  );
};

export default Home;
