// ===============================================================
// ✨ App.tsx — Optimized React Router v6+ Architecture (2025)
// ===============================================================

import { Suspense, lazy, useEffect, type FC, memo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./theme/ThemeProvider";
import appStyles from "./App.module.css";

// ===============================================================
// 🎯 Core Layout Components (Always Loaded)
// ===============================================================
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BottomNav from "./components/footer/BottomNav";

// ===============================================================
// 🏠 Home Page Components (Eagerly Loaded for FCP)
// ===============================================================
import Hero from "./components/header/Hero";
import Shop from "./components/Shop";
import ShopByCategory from "./pages/ShopByCategory";
import BestSellers from "./pages/BestSellers";
import BeautyProducts from "./pages/BeautyProducts";
import ProductCarousel from "./pages/ProductCarousel";
import Offers1 from "./pages/Offers1";
import PromoBanners from "./promo/PromoBanners";
import WellnessBanner from "./promo/WellnessBanner";
import BlogSection from "./blog/BlogSection";

// ===============================================================
// 🔄 Lazy-Loaded Routes (Code-Splitting for Performance)
// ===============================================================
const ProductsWrapper = lazy(() => import("./components/ProductsWrapper"));
const Cart = lazy(() => import("./components/Cart"));
const Wishlist = lazy(() => import("./components/WishList"));
const Order = lazy(() => import("./outer/Order"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Category Pages
const OTC = lazy(() => import("./dropdowns/OTC"));
const Vitamins = lazy(() => import("./dropdowns/Vitamins"));
const Equipment = lazy(() => import("./dropdowns/Equipment"));
const SkinCare1 = lazy(() => import("./pages/Derma"));
const Offers2 = lazy(() => import("./pages/Hygiene"));

// Condition Pages
const DM = lazy(() => import("./dropdowns/Diabetes"));
const CVS = lazy(() => import("./categories/Cadiovascular"));
const HTN = lazy(() => import("./conditions/Hypertension"));
const CoughFluCold = lazy(() => import("./conditions/CoughFluCold"));
const UTI = lazy(() => import("./conditions/Uti"));
const EyeEar = lazy(() => import("./conditions/EyeEar"));
const OralCare = lazy(() => import("./conditions/Oral"));
const SkinDrugs = lazy(() => import("./conditions/SkinInfection"));
const WomenHealthShop = lazy(() => import("./dropdowns/Women"));
const MensHealth = lazy(() => import("./dropdowns/Men"));

// System Pages
const Resp = lazy(() => import("./categories/Respiratory"));
const GIT = lazy(() => import("./categories/Gastrointestinal"));
const Renal = lazy(() => import("./categories/Renal"));
const Sexual = lazy(() => import("./categories/Sexual"));
const CNS = lazy(() => import("./categories/Nervous"));
const MSK = lazy(() => import("./categories/Musculosketal"));
const SkinCare = lazy(() => import("./dropdowns/Skincare"));

// Prescription Pages
const PrescriptionUpload = lazy(() => import("./dropdowns/PrescriptionUpload"));
const RequestPrescription = lazy(() => import("./dropdowns/RequestPrescription"));
const Prescription = lazy(() => import("./dropdowns/Prescription"));

// About Pages
const AboutUs = lazy(() => import("./outer/AboutUs"));
const OurStory = lazy(() => import("./outer/OurStory"));
const OurTeam = lazy(() => import("./outer/OurTeam"));
const OurMissionVision = lazy(() => import("./outer/OurMissionVision"));
const ContactUs = lazy(() => import("./outer/ContactUs"));

// Offers Pages
const OffersWrapper = lazy(() => import("./pages/OffersWrapper"));
const Offers = lazy(() => import("./pages/Offers"));
const NewArrivals = lazy(() => import("./dropdowns/NewArrivals"));
const NewArrivals1 = lazy(() => import("./dropdowns/NewArrivals2"));

// ===============================================================
// 🎨 Optimized Loading Component
// ===============================================================
const LoadingFallback: FC = memo(() => (
  <div
    role="status"
    aria-live="polite"
    aria-busy="true"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      padding: "2rem",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid #f3f4f6",
          borderTopColor: "#7a0c2e",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 1rem",
        }}
      />
      <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
        Loading content...
      </p>
    </div>
  </div>
));

LoadingFallback.displayName = "LoadingFallback";

// ===============================================================
// 🧭 Scroll Restoration (Memoized for Performance)
// ===============================================================
const ScrollToTop: FC = memo(() => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  
  return null;
});

ScrollToTop.displayName = "ScrollToTop";

// ===============================================================
// 🏠 Home Page Component (Memoized)
// ===============================================================
const HomePage: FC = memo(() => (
  <>
    <Hero />
    <Offers1 />
    <PromoBanners />
    <Shop />
    <WellnessBanner />
    <Suspense fallback={<LoadingFallback />}>
      <Offers />
    </Suspense>
    <ProductCarousel />
    <BestSellers />
    <Suspense fallback={<LoadingFallback />}>
      <SkinDrugs />
    </Suspense>
    <Offers1 />
    <ShopByCategory />
    <BeautyProducts />
    <BlogSection />
  </>
));

HomePage.displayName = "HomePage";

// ===============================================================
// 🚫 404 Not Found Component (Memoized)
// ===============================================================
const NotFound: FC = memo(() => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    aria-labelledby="not-found-title"
    style={{
      textAlign: "center",
      padding: "4rem 1.5rem",
      maxWidth: "600px",
      margin: "0 auto",
      minHeight: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h1
      id="not-found-title"
      style={{
        fontSize: "clamp(2rem, 5vw, 3rem)",
        marginBottom: "1rem",
        color: "#7a0c2e",
        fontWeight: 700,
      }}
    >
      404
    </h1>
    <h2
      style={{
        fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
        marginBottom: "1rem",
        color: "#374151",
        fontWeight: 600,
      }}
    >
      Page Not Found
    </h2>
    <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.6 }}>
      The page you're looking for doesn't exist or may have been moved.
    </p>
  </motion.section>
));

NotFound.displayName = "NotFound";

// ===============================================================
// 🏥 Root Application Component
// ===============================================================
const App: FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />

          {/* === Global Toast Notifications === */}
          <Toaster
            position="top-center"
            duration={3000}
            closeButton
            richColors
            theme="light"
          />

          {/* === Fixed Header === */}
          <Header />

          {/* === Main Content === */}
          <main className={appStyles.mainContent}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* === Home === */}
                <Route path="/" element={<HomePage />} />

                {/* === Product Routes === */}
                <Route path="/products/prescription" element={<ProductsWrapper />} />
                <Route path="/products/otc" element={<OTC />} />
                <Route path="/products/supplements" element={<Vitamins />} />
                <Route path="/products/equipment" element={<Equipment />} />

                {/* === Category Routes === */}
                <Route path="/categories/beauty-care-cosmetics" element={<BeautyProducts />} />
                <Route path="/categories/vitamins-supplements" element={<Vitamins />} />
                <Route path="/categories/medicine" element={<ProductsWrapper />} />
                <Route path="/categories/skin-care" element={<SkinCare1 />} />
                <Route path="/categories/general-hygiene" element={<Offers2 />} />
                <Route path="/categories/home-healthcare" element={<ProductCarousel />} />

                {/* === Condition Routes === */}
                <Route path="/condition/heart" element={<CVS />} />
                <Route path="/condition/diabetes" element={<DM />} />
                <Route path="/condition/women" element={<WomenHealthShop />} />
                <Route path="/condition/men" element={<MensHealth />} />
                <Route path="/conditions/htn" element={<HTN />} />
                <Route path="/conditions/flu" element={<CoughFluCold />} />
                <Route path="/conditions/uti-infections" element={<UTI />} />
                <Route path="/conditions/ear-eye-care" element={<EyeEar />} />
                <Route path="/conditions/oral-hygiene" element={<OralCare />} />
                <Route path="/conditions/skin-treatment" element={<SkinDrugs />} />

                {/* === System Routes === */}
                <Route path="/system/respiratory" element={<Resp />} />
                <Route path="/system/git" element={<GIT />} />
                <Route path="/system/oral-hygiene" element={<OralCare />} />
                <Route path="/system/renal" element={<Renal />} />
                <Route path="/system/reproductive" element={<Sexual />} />
                <Route path="/system/nervous" element={<CNS />} />
                <Route path="/system/diabetes" element={<DM />} />
                <Route path="/system/ent" element={<EyeEar />} />
                <Route path="/system/skin-treatment" element={<SkinCare />} />
                <Route path="/system/msk" element={<MSK />} />

                {/* === Prescription Workflow === */}
                <Route path="/prescription/upload" element={<PrescriptionUpload />} />
                <Route path="/prescription/refill" element={<RequestPrescription />} />
                <Route path="/prescription" element={<Prescription />} />

                {/* === About Section === */}
                <Route path="/about/story" element={<OurStory />} />
                <Route path="/about/team" element={<OurTeam />} />
                <Route path="/about/vision" element={<OurMissionVision />} />
                <Route path="/about-us" element={<AboutUs />} />

                {/* === Contact === */}
                <Route path="/contact-us" element={<ContactUs />} />

                {/* === Shop === */}
                <Route path="/shop" element={<Shop />} />

                {/* === Offers & Specials === */}
                <Route path="/offers" element={<OffersWrapper />} />
                <Route path="/best-sellers" element={<BestSellers />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/trending" element={<NewArrivals1 />} />

                {/* === Cart & Wishlist === */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />

                {/* === Checkout === */}
                <Route path="/checkout" element={<Order />} />

                {/* === Authentication === */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* === 404 Not Found === */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* === Global Footer === */}
          <Footer />
          <BottomNav />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;