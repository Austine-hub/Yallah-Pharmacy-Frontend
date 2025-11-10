// src/App.tsx
// ===============================================================
// ✨ App.tsx — Refactored, cleaned and updated (2025)
// ===============================================================

import { Suspense, lazy, useEffect, type FC, memo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./theme/ThemeProvider";
import appStyles from "./App.module.css";

// Core layout (eager)
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BottomNav from "./components/footer/BottomNav";
import Dashboard from "./pages/Dashboard";

// Lazy pages & route components
const HomePage = lazy(() => import("./pages/Home"));
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

// Offers & Auxiliary
const OffersWrapper = lazy(() => import("./pages/OffersWrapper"));
const NewArrivals = lazy(() => import("./dropdowns/NewArrivals"));
const NewArrivals1 = lazy(() => import("./dropdowns/NewArrivals2"));

// Product detail pages
const BeautyDetails = lazy(() => import("./productDetails/BeautyDetails"));
const OffersD = lazy(() => import("./productDetails/OffersD"));
const Offers1D = lazy(() => import("./productDetails/Offers1D"));
const ShopDetails = lazy(() => import("./productDetails/ShopDetails"));
const HomeDetails = lazy(() => import("./productDetails/HomeDetails"));
const BestSellersDetails = lazy(() => import("./productDetails/BestSellersDetails"));
const SkincareDetails = lazy(() => import("./productDetails/SkincareDetails"));
const VitaminDetails = lazy(() => import("./productDetails/VitaminDetails"));
const OBGYNDetails = lazy(() => import("./productDetails/ObgynDetails"));
const DiabetesDetails = lazy(() => import("./productDetails/DiabetesDetails"));
const RespiratoryDetails = lazy(() => import("./productDetails/RespiratoryDetails"));
const HTNDetails = lazy(() => import("./productDetails/HTNDetails"));

// ===============================================================
// 🎨 Small, accessible loading fallback
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
          width: 48,
          height: 48,
          border: "4px solid #f3f4f6",
          borderTopColor: "#7a0c2e",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 1rem",
        }}
      />
      <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>Loading content...</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
));
LoadingFallback.displayName = "LoadingFallback";

// ===============================================================
// 🧭 Scroll restoration
// ===============================================================
const ScrollToTop: FC = memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
});
ScrollToTop.displayName = "ScrollToTop";

// ===============================================================
// 🚫 NotFound component
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
      maxWidth: 600,
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
    <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)", marginBottom: "1rem", color: "#374151", fontWeight: 600 }}>
      Page Not Found
    </h2>
    <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.6 }}>
      The page you're looking for doesn't exist or may have been moved.
    </p>
  </motion.section>
));
NotFound.displayName = "NotFound";

// ===============================================================
// 🏥 Root App
// ===============================================================
const App: FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />

          {/* Global toaster */}
          <Toaster position="top-center" duration={3000} closeButton richColors theme="light" />

          {/* Header (eager) */}
          <Header />

          {/* Main */}
          <main className={appStyles.mainContent}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard/>} />

                {/* Products */}
                <Route path="/products/prescription" element={<ProductsWrapper />} />
                <Route path="/products/otc" element={<OTC />} />
                <Route path="/products/supplements" element={<Vitamins />} />
                <Route path="/products/equipment" element={<Equipment />} />

                {/* Categories */}
                <Route path="/categories/beauty-care-cosmetics" element={<SkinCare1 />} />
                <Route path="/categories/vitamins-supplements" element={<Vitamins />} />
                <Route path="/categories/medicine" element={<ProductsWrapper />} />
                <Route path="/categories/skin-care" element={<SkinCare1 />} />
                <Route path="/categories/general-hygiene" element={<Offers2 />} />
                <Route path="/categories/home-healthcare" element={<Resp />} />

                {/* Conditions */}
                <Route path="/condition/heart" element={<CVS />} />
                <Route path="/conditions/diabetes" element={<DM />} />
                <Route path="/condition/women" element={<WomenHealthShop />} />
                <Route path="/condition/men" element={<MensHealth />} />
                <Route path="/conditions/htn" element={<HTN />} />
                <Route path="/conditions/flu" element={<CoughFluCold />} />
                <Route path="/conditions/uti-infections" element={<UTI />} />
                <Route path="/conditions/ear-eye-care" element={<EyeEar />} />
                <Route path="/conditions/oral-hygiene" element={<OralCare />} />

                {/* Systems */}
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

                {/* Prescription */}
                <Route path="/prescription/upload" element={<PrescriptionUpload />} />
                <Route path="/prescription/refill" element={<RequestPrescription />} />
                <Route path="/prescription" element={<Prescription />} />

                {/* About */}
                <Route path="/about/story" element={<OurStory />} />
                <Route path="/about/team" element={<OurTeam />} />
                <Route path="/about/vision" element={<OurMissionVision />} />
                <Route path="/about-us" element={<AboutUs />} />

                <Route path="/contact-us" element={<ContactUs />} />

                {/* Shop */}
                <Route path="/shop" element={<ProductsWrapper />} />

                {/* Offers */}
                <Route path="/offers" element={<OffersWrapper />} />
                <Route path="/best-sellers" element={<NewArrivals />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/trending" element={<NewArrivals1 />} />

                {/* Cart, Wishlist, Checkout */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Order />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Product details */}
                <Route path="/beauty-products" element={<SkinCare1 />} />
                <Route path="/product/:id" element={<BeautyDetails />} />
                <Route path="/offers/:id" element={<OffersD />} />
                <Route path="/offers1/:id" element={<Offers1D />} />
                <Route path="/shop/:id" element={<ShopDetails />} />
                <Route path="/home-product/:id" element={<HomeDetails />} />
                <Route path="/bestsellers/:id" element={<BestSellersDetails />} />
                <Route path="/skin/:id" element={<SkincareDetails />} />
                <Route path="/vitamin-product/:id" element={<VitaminDetails />} />
                <Route path="/sexual-product/:id" element={<OBGYNDetails />} />
                <Route path="/diabetes/:id" element={<DiabetesDetails />} />
                <Route path="/diabetes-product/:id" element={<DiabetesDetails />} />
                <Route path="/respiratory/:id" element={<RespiratoryDetails />} />
                <Route path="/htn-product/:id" element={<HTNDetails />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer (eager) */}
          <Footer />
          <BottomNav />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;








