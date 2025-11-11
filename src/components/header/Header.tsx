import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  User,
  ShoppingCart,
  Heart,
  Menu,
  X,
  MapPin,
  Search,
  ChevronDown,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "/icon.ico";
import { useCartCount } from "../../context/CartContext";

interface NavLink {
  label: string;
  path: string;
}

interface NavSection {
  label: string;
  key: string;
  path?: string;
  links?: NavLink[];
}

interface HeaderProps {
  onSearch?: (query: string) => void;
  deliveryLocation?: string;
}

const NAVIGATION_SECTIONS: readonly NavSection[] = [
  { label: "Home", key: "home", path: "/" },
  {
    label: "Shop By Category",
    key: "category",
    links: [
      { label: "Skin Care", path: "/categories/skin-care" },
      { label: "Beauty & Cosmetics", path: "/categories/beauty-care-cosmetics" },
      { label: "Vitamins & Supplements", path: "/categories/vitamins-supplements" },
      { label: "Medicine", path: "/categories/medicine" },
      { label: "Hygiene", path: "/categories/general-hygiene" },
      { label: "Home Healthcare", path: "/categories/home-healthcare" },
    ],
  },
  {
    label: "Shop By Body System",
    key: "system",
    links: [
      { label: "Reproductive", path: "/system/reproductive" },
      { label: "Respiratory", path: "/system/respiratory" },
      { label: "Diabetes", path: "/system/diabetes" },
      { label: "GIT", path: "/system/git" },
      { label: "Renal", path: "/system/renal" },
      { label: "Nervous", path: "/system/nervous" },
      { label: "ENT", path: "/system/ent" },
      { label: "Oral Hygiene", path: "/system/oral-hygiene" },
      { label: "MSK", path: "/system/msk" },
    ],
  },
  { label: "Submit a Prescription", key: "prescription", path: "/prescription" },
  {
    label: "Shop By Condition",
    key: "condition",
    links: [
      { label: "Hypertension", path: "/conditions/htn" },
      { label: "Diabetes", path: "/conditions/diabetes" },
      { label: "Cough, Cold & Flu", path: "/conditions/flu" },
      { label: "UTI", path: "/conditions/uti-infections" },
      { label: "Skin Treatment", path: "/conditions/skin-treatment" },
    ],
  },
  { label: "Our Blog", key: "blog", path: "/blog" },
  { label: "Contact Us", key: "contact", path: "/contact-us" },
  { label: "Dashboard", key: "dashboard", path: "/dashboard" },
];

const PHONE_NUMBER = "+254111054949";

const Header: React.FC<HeaderProps> = ({
  onSearch,
  deliveryLocation: initialLocation = "Detecting...",
}) => {
  const [deliveryLocation, setDeliveryLocation] = useState(initialLocation);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [mode, setMode] = useState<"Delivery" | "Pickup">("Delivery");
  const [selectedWarehouse, setSelectedWarehouse] = useState("MYDAWA Nairobi Warehouse");

  const navigate = useNavigate();
  const cartCount = useCartCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const locationMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-detect user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setDeliveryLocation("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "Unknown location";
          setDeliveryLocation(city);
        } catch {
          setDeliveryLocation("Location unavailable");
        }
      },
      () => {
        setDeliveryLocation("Location access denied");
      }
    );
  }, []);

  // Handle mobile menu outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle location menu outside click
  useEffect(() => {
    if (!showLocationMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (locationMenuRef.current && !locationMenuRef.current.contains(event.target as Node)) {
        setShowLocationMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLocationMenu]);

  // Cleanup dropdown timer
  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedQuery = searchQuery.trim();
      if (onSearch && trimmedQuery) {
        onSearch(trimmedQuery);
      }
    },
    [onSearch, searchQuery]
  );

  const handleMouseEnter = useCallback((key: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setActiveDropdown(key);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  const toggleMobileSection = useCallback((key: string) => {
    setMobileActiveSection((prev) => (prev === key ? null : key));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleLocationMenu = useCallback(() => {
    setShowLocationMenu((prev) => !prev);
  }, []);

  const renderNavItem = (section: NavSection) => {
    if (section.links) {
      return (
        <li
          key={section.key}
          className={styles.hasDropdown}
          onMouseEnter={() => handleMouseEnter(section.key)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={styles.navButton}
            aria-haspopup="true"
            aria-expanded={activeDropdown === section.key}
          >
            {section.label}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {activeDropdown === section.key && (
            <div className={styles.dropdown}>
              <ul role="menu">
                {section.links.map((link) => (
                  <li key={link.path} role="none">
                    <a href={link.path} role="menuitem">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      );
    }

    return (
      <li key={section.key}>
        <a href={section.path} className={styles.navLink}>
          {section.label}
        </a>
      </li>
    );
  };

  const renderMobileNavItem = (section: NavSection) => {
    if (section.links) {
      const isExpanded = mobileActiveSection === section.key;
      return (
        <li key={section.key}>
          <button
            className={styles.menuToggleButton}
            onClick={() => toggleMobileSection(section.key)}
            aria-expanded={isExpanded}
            aria-controls={`submenu-${section.key}`}
          >
            <span>{section.label}</span>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={isExpanded ? styles.rotated : ""}
            />
          </button>
          {isExpanded && (
            <ul className={styles.submenu} id={`submenu-${section.key}`}>
              {section.links.map((link) => (
                <li key={link.path}>
                  <a href={link.path} onClick={closeMobileMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={section.key}>
        <a href={section.path} className={styles.menuLink} onClick={closeMobileMenu}>
          {section.label}
        </a>
      </li>
    );
  };

  return (
    <>
      <header className={styles.header}>
        {/* Desktop Header */}
        <div className={styles.desktopHeader}>
          <div className={styles.topBar}>
            <div className={styles.container}>
              <div className={styles.logoLink}>
                <a href="/" aria-label="Yallah Pharmacy Home">
                  <img src={logo} alt="Yallah Pharmacy logo" className={styles.logoImage} />
                </a>
                <div className={styles.logoText}>
                  <div className={styles.brandName}>
                    <span className={styles.brandYallah}>YALLAH</span>
                    <span className={styles.brandPharmacy}>PHARMACY</span>
                  </div>
                  <span className={styles.tagline}>caring beyond drugs</span>
                </div>
              </div>

              <form className={styles.searchBar} onSubmit={handleSearchSubmit} role="search">
                <div className={styles.searchContainer}>
                  <Search size={20} className={styles.searchIcon} aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                    placeholder="Search products..."
                    aria-label="Search products"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button type="submit" className={styles.searchButton} aria-label="Submit search">
                      <Search size={18} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>

              <div className={styles.deliverToWrapper} ref={locationMenuRef}>
                <button
                  className={styles.deliverTo}
                  aria-label={`Delivery location: ${deliveryLocation}`}
                  onClick={toggleLocationMenu}
                  aria-expanded={showLocationMenu}
                >
                  <MapPin size={18} aria-hidden="true" />
                  <div className={styles.locationInfo}>
                    <span className={styles.deliverLabel}>Deliver to</span>
                    <span className={styles.locationName}>{deliveryLocation}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={showLocationMenu ? styles.chevronRotated : ""}
                  />
                </button>

                {showLocationMenu && (
                  <div className={styles.locationMenu}>
                    <div className={styles.modeToggle}>
                      <button
                        className={mode === "Delivery" ? styles.activeMode : ""}
                        onClick={() => setMode("Delivery")}
                      >
                        Delivery
                      </button>
                      <button
                        className={mode === "Pickup" ? styles.activeMode : ""}
                        onClick={() => setMode("Pickup")}
                      >
                        Pickup
                      </button>
                    </div>

                    <div className={styles.options}>
                      {mode === "Pickup" ? (
                        <>
                          <label className={styles.warehouseOption}>
                            <input
                              type="radio"
                              name="warehouse"
                              checked={selectedWarehouse === "MYDAWA Mombasa Warehouse"}
                              onChange={() => setSelectedWarehouse("MYDAWA Mombasa Warehouse")}
                            />
                            <span>MYDAWA Mombasa Warehouse</span>
                          </label>
                          <label className={styles.warehouseOption}>
                            <input
                              type="radio"
                              name="warehouse"
                              checked={selectedWarehouse === "MYDAWA Nairobi Warehouse"}
                              onChange={() => setSelectedWarehouse("MYDAWA Nairobi Warehouse")}
                            />
                            <span>MYDAWA Nairobi Warehouse</span>
                          </label>
                        </>
                      ) : (
                        <p className={styles.deliveryInfo}>
                          Express Delivery available for {deliveryLocation}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.headerActions}>
                <button
                  className={styles.iconButton}
                  onClick={() => navigate("/login")}
                  aria-label="Account"
                >
                  <User size={20} aria-hidden="true" />
                </button>
                <button className={styles.iconButton} aria-label="Wishlist">
                  <Heart size={20} aria-hidden="true" />
                </button>
                <button
                  className={styles.cartButton}
                  onClick={() => navigate("/cart")}
                  aria-label={`Shopping cart with ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
                >
                  <ShoppingCart size={22} aria-hidden="true" />
                  {cartCount > 0 && (
                    <span className={styles.cartBadge} aria-hidden="true">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <nav className={styles.mainNav} aria-label="Main navigation">
            <div className={styles.container}>
              <ul className={styles.navList}>{NAVIGATION_SECTIONS.map(renderNavItem)}</ul>
              <a href={`tel:${PHONE_NUMBER}`} className={styles.phoneLink} aria-label="Call us">
                <Phone size={16} aria-hidden="true" />
                <span>{PHONE_NUMBER.replace("+254", "+254 ")}</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileTopBar}>
            <button
              className={styles.menuToggle}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={20} />
            </button>

            <a href="/" className={styles.mobileLogo} aria-label="Yallah Pharmacy Home">
              <img src={logo} alt="Yallah Pharmacy" className={styles.mobileLogoImage} />
              <div className={styles.mobileBrandName}>
                <span className={styles.mobileBrandYallah}>YALLAH</span>
                <span className={styles.mobileBrandPharmacy}>PHARMACY</span>
              </div>
            </a>

            <button
              className={styles.mobileCartButton}
              onClick={() => navigate("/cart")}
              aria-label={`Shopping cart with ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              {cartCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <form className={styles.mobileSearch} onSubmit={handleSearchSubmit} role="search">
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mobileSearchInput}
              aria-label="Search products"
            />
            <button type="submit" className={styles.mobileSearchButton} aria-label="Search">
              <Search size={16} aria-hidden="true" />
            </button>
          </form>

          <div className={styles.mobileDeliverTo} ref={locationMenuRef}>
            <button
              className={styles.mobileDeliverButton}
              onClick={toggleLocationMenu}
              aria-expanded={showLocationMenu}
              aria-label={`Delivery location: ${deliveryLocation}`}
            >
              <MapPin size={16} aria-hidden="true" />
              <div className={styles.mobileLocationInfo}>
                <span className={styles.mobileDeliverLabel}>Deliver to</span>
                <span className={styles.mobileLocationName}>{deliveryLocation}</span>
              </div>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={showLocationMenu ? styles.chevronRotated : ""}
              />
            </button>

            {showLocationMenu && (
              <div className={styles.mobileLocationMenu}>
                <div className={styles.modeToggle}>
                  <button
                    className={mode === "Delivery" ? styles.activeMode : ""}
                    onClick={() => setMode("Delivery")}
                  >
                    Delivery
                  </button>
                  <button
                    className={mode === "Pickup" ? styles.activeMode : ""}
                    onClick={() => setMode("Pickup")}
                  >
                    Pickup
                  </button>
                </div>

                <div className={styles.options}>
                  {mode === "Pickup" ? (
                    <>
                      <label className={styles.warehouseOption}>
                        <input
                          type="radio"
                          name="warehouse"
                          checked={selectedWarehouse === "MYDAWA Mombasa Warehouse"}
                          onChange={() => setSelectedWarehouse("MYDAWA Mombasa Warehouse")}
                        />
                        <span>MYDAWA Mombasa Warehouse</span>
                      </label>
                      <label className={styles.warehouseOption}>
                        <input
                          type="radio"
                          name="warehouse"
                          checked={selectedWarehouse === "MYDAWA Nairobi Warehouse"}
                          onChange={() => setSelectedWarehouse("MYDAWA Nairobi Warehouse")}
                        />
                        <span>MYDAWA Nairobi Warehouse</span>
                      </label>
                    </>
                  ) : (
                    <p className={styles.deliveryInfo}>
                      Express Delivery available for {deliveryLocation}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.mobileActions}>
            <button className={styles.actionButton} onClick={() => navigate("/prescription")}>
              Submit Prescription
            </button>
            <button className={styles.actionButton} onClick={() => navigate("/consultation")}>
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.menuOverlay} onClick={closeMobileMenu} role="presentation">
          <nav
            ref={menuRef}
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <div className={styles.menuHeader}>
              <div className={styles.menuBrand}>
                <img src={logo} alt="" className={styles.menuLogo} />
                <div>
                  <div className={styles.menuTitle}>YALLAH PHARMACY</div>
                  <div className={styles.menuSubtitle}>caring beyond drugs</div>
                </div>
              </div>
              <button className={styles.closeButton} onClick={closeMobileMenu} aria-label="Close navigation menu">
                <X size={24} />
              </button>
            </div>

            <div className={styles.menuNav}>
              <ul>{NAVIGATION_SECTIONS.map(renderMobileNavItem)}</ul>
            </div>

            <div className={styles.menuFooter}>
              <a href={`tel:${PHONE_NUMBER}`} className={styles.menuPhoneButton} aria-label="Call us">
                <Phone size={18} aria-hidden="true" />
                <span>Call Us: {PHONE_NUMBER.replace("+254", "+254 ")}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;