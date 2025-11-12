// src/pages/Dashboard.tsx
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  Pill,
  FileText,
  Calendar,
  Package,
  CreditCard,
  Settings,
  Bell,
  Home,
  User as UserIcon,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  Users,
  DollarSign,
  Activity,
  ShoppingBag,
  BarChart3,
  Shield,
  Menu,
  X
} from "lucide-react";
import styles from "./Dashboard.module.css";
import { getUser, type User as RemoteUser } from "../utils/getUser";

/**
 * Notes:
 * - We import the external User type (RemoteUser) from ../utils/getUser so setUser(...) accepts that value.
 * - For UI logic we continue to use a local Role type ("customer" | "admin") and normalize remote "user" -> "customer".
 * - This avoids the TS type mismatch between the local User interface and the remote one.
 */

/* Local role type used for UI rendering and switching */
type Role = "customer" | "admin";

/* State for user uses the remote User type to be compatible with getUser() */
type User = RemoteUser;

interface Prescription {
  id: string;
  medication: string;
  status: "active" | "expired" | "pending";
  refillsLeft: number;
  expiryDate: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "processing" | "shipped";
  items: number;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: string;
}

interface StatItem {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

interface AdminStat {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend: string;
  trendLabel: string;
}

interface AdminControl {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
}

/* --- Mock data --- */
const mockPrescriptions: Prescription[] = [
  {
    id: "RX-2024-001",
    medication: "Metformin 500mg",
    status: "active",
    refillsLeft: 3,
    expiryDate: "2025-06-15",
  },
  {
    id: "RX-2024-002",
    medication: "Lisinopril 10mg",
    status: "active",
    refillsLeft: 1,
    expiryDate: "2025-04-20",
  },
  {
    id: "RX-2023-045",
    medication: "Atorvastatin 20mg",
    status: "expired",
    refillsLeft: 0,
    expiryDate: "2024-12-01",
  },
];

const mockOrders: Order[] = [
  {
    id: "ORD-10234",
    date: "2024-11-05",
    total: 45.99,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-10189",
    date: "2024-10-28",
    total: 89.5,
    status: "delivered",
    items: 5,
  },
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* activeRole is the normalized role used for UI: "customer" | "admin" */
  const [activeRole, setActiveRole] = useState<Role>("customer");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* Quick actions */
  const quickActions: QuickAction[] = useMemo(
    () => [
      { id: "refill", title: "Refill Prescription", icon: <Pill size={24} />, action: "refill" },
      { id: "upload", title: "Upload Prescription", icon: <FileText size={24} />, action: "upload" },
      { id: "consult", title: "Book Consultation", icon: <Calendar size={24} />, action: "consult" },
      { id: "history", title: "View History", icon: <Activity size={24} />, action: "history" },
    ],
    []
  );

  /* Admin stats and controls */
  const adminStats: AdminStat[] = useMemo(
    () => [
      {
        icon: <Users size={24} />,
        value: "1,247",
        label: "Active Patients",
        trend: "+12%",
        trendLabel: "up 12 percent",
      },
      {
        icon: <Pill size={24} />,
        value: "342",
        label: "Pending Prescriptions",
        trend: "-",
        trendLabel: "no change",
      },
      {
        icon: <Package size={24} />,
        value: "89",
        label: "Orders Today",
        trend: "+8%",
        trendLabel: "up 8 percent",
      },
      {
        icon: <DollarSign size={24} />,
        value: "$12,450",
        label: "Revenue Today",
        trend: "+15%",
        trendLabel: "up 15 percent",
      },
    ],
    []
  );

  const adminControls: AdminControl[] = useMemo(
    () => [
      {
        id: "prescriptions",
        icon: <Pill size={28} />,
        title: "Prescription Management",
        description:
          "Review, approve, and manage patient prescriptions. View prescription history and handle refill requests.",
        primaryAction: "Review Prescriptions",
        secondaryAction: "Download Reports",
      },
      {
        id: "inventory",
        icon: <ShoppingBag size={28} />,
        title: "Inventory & Products",
        description:
          "Manage medication inventory, pricing, and product catalog. Monitor stock levels and reorder supplies.",
        primaryAction: "Manage Inventory",
        secondaryAction: "Update Pricing",
      },
      {
        id: "orders",
        icon: <Package size={28} />,
        title: "Order Processing",
        description: "Process orders, manage shipments, and track deliveries. Handle customer inquiries and returns.",
        primaryAction: "Process Orders",
        secondaryAction: "Track Shipments",
      },
      {
        id: "patients",
        icon: <Users size={28} />,
        title: "Patient Management",
        description: "Manage patient accounts, view medical histories, and handle account-related requests.",
        primaryAction: "View Patients",
        secondaryAction: "Export Data",
      },
      {
        id: "analytics",
        icon: <BarChart3 size={28} />,
        title: "Analytics & Reports",
        description: "Access business intelligence, generate reports, and analyze sales and operational metrics.",
        primaryAction: "View Analytics",
        secondaryAction: "Generate Report",
      },
      {
        id: "settings",
        icon: <Settings size={28} />,
        title: "System Settings",
        description: "Configure system settings, manage backups, view logs, and control user permissions.",
        primaryAction: "System Settings",
        secondaryAction: "View Logs",
      },
    ],
    []
  );

  /* Helper: normalize external role into our UI role */
  const normalizeRole = useCallback((remoteRole: string | undefined): Role => {
    if (!remoteRole) return "customer";
    // remote role may be "user" or "admin"; normalize "user" -> "customer"
    if (remoteRole === "admin") return "admin";
    return "customer";
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const userData = getUser();
        setUser(userData);

        // Normalize the role coming from getUser() to our internal Role type
        const normalized = normalizeRole(userData?.role as string);
        setActiveRole(normalized);

        // If the user is logged in and we treat them as customer, populate customer-specific data
        if (userData?.isLoggedIn && normalized === "customer") {
          setPrescriptions(mockPrescriptions);
          setOrders(mockOrders);
        } else {
          // admin default mock data (if needed) — keep small & safe
          setPrescriptions([]);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setPrescriptions([]);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [normalizeRole]);

  /* Listen for storage changes to reflect auth changes across tabs */
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const userData = getUser();
        setUser(userData);
        setActiveRole(normalizeRole(userData?.role as string));

        // keep customer-specific data up to date
        const normalized = normalizeRole(userData?.role as string);
        if (userData?.isLoggedIn && normalized === "customer") {
          setPrescriptions(mockPrescriptions);
          setOrders(mockOrders);
        } else {
          setPrescriptions([]);
          setOrders([]);
        }
      } catch (err) {
        console.error("Error handling storage change:", err);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [normalizeRole]);

  /* Sidebar: close when clicking outside or pressing Escape */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      // trap scroll on body while sidebar is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleRoleSwitch = useCallback((role: Role) => {
    setActiveRole(role);
    setSidebarOpen(false);
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    // lightweight router / action dispatcher placeholder
    console.log(`Quick action triggered: ${action}`);
    // TODO: replace with navigation or modal triggers
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 size={16} aria-hidden="true" />;
      case "shipped":
        return <Truck size={16} aria-hidden="true" />;
      case "processing":
        return <Clock size={16} aria-hidden="true" />;
      default:
        return <Package size={16} aria-hidden="true" />;
    }
  }, []);

  const formatDate = useCallback((dateString: string, format: "long" | "short" = "long") => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions =
      format === "long" ? { month: "short", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }, []);

  const getTrendClass = useCallback((trend: string): string => {
    if (trend.startsWith("+")) return styles.trendUp;
    if (trend === "-") return styles.trendNeutral;
    return styles.trendDown;
  }, []);

  const activePrescriptions = useMemo(() => prescriptions.filter((rx) => rx.status === "active"), [prescriptions]);

  const availableRefills = useMemo(() => prescriptions.filter((rx) => rx.refillsLeft > 0).length, [prescriptions]);

  const healthStats: StatItem[] = useMemo(
    () => [
      {
        icon: <FileText size={20} />,
        value: prescriptions.length,
        label: "Prescriptions",
      },
      {
        icon: <Package size={20} />,
        value: orders.length,
        label: "Orders",
      },
      {
        icon: <CheckCircle2 size={20} />,
        value: availableRefills,
        label: "Available Refills",
      },
    ],
    [prescriptions.length, orders.length, availableRefills]
  );

  /* Loading state */
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper} role="status" aria-live="polite">
          <div className={styles.loadingSpinner} aria-hidden="true" />
          <span className={styles.loadingText}>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  /* If not logged in */
  if (!user?.isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.loginPrompt}>
          <Shield size={64} className={styles.loginIcon} aria-hidden="true" />
          <h2 className={styles.loginTitle}>Secure Access Required</h2>
          <p className={styles.loginMessage}>Please log in to access your health dashboard and prescription information.</p>
          <button className={styles.loginButton} aria-label="Sign in securely">
            <UserIcon size={20} aria-hidden="true" />
            Sign In Securely
          </button>
        </div>
      </div>
    );
  }

  /* Main UI */
  return (
    <div className={styles.container}>
      {sidebarOpen && <div className={styles.overlay} aria-hidden="true" />}

      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon} aria-hidden="true">
              <Pill size={28} strokeWidth={2.5} />
            </div>
            <span className={styles.logoText}>HealthRx</span>
          </div>
          <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)} aria-label="Close navigation menu">
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${activeRole === "customer" ? styles.navItemActive : ""}`}
            onClick={() => handleRoleSwitch("customer")}
            aria-current={activeRole === "customer" ? "page" : undefined}
          >
            <Home size={20} aria-hidden="true" />
            <span>Dashboard</span>
            <ChevronRight size={16} className={styles.navArrow} aria-hidden="true" />
          </button>

          <button className={styles.navItem}>
            <Pill size={20} aria-hidden="true" />
            <span>Prescriptions</span>
            <ChevronRight size={16} className={styles.navArrow} aria-hidden="true" />
          </button>

          <button className={styles.navItem}>
            <Package size={20} aria-hidden="true" />
            <span>Orders</span>
            <ChevronRight size={16} className={styles.navArrow} aria-hidden="true" />
          </button>

          <button className={styles.navItem}>
            <CreditCard size={20} aria-hidden="true" />
            <span>Payments</span>
            <ChevronRight size={16} className={styles.navArrow} aria-hidden="true" />
          </button>

          <button className={styles.navItem}>
            <Settings size={20} aria-hidden="true" />
            <span>Settings</span>
            <ChevronRight size={16} className={styles.navArrow} aria-hidden="true" />
          </button>

          {/* Only show Admin Panel toggle if the remote user role is admin */}
          {user?.role === "admin" && (
            <button
              className={`${styles.navItem} ${activeRole === "admin" ? styles.navItemActive : ""}`}
              onClick={() => handleRoleSwitch("admin")}
              aria-current={activeRole === "admin" ? "page" : undefined}
            >
              <Shield size={20} aria-hidden="true" />
              <span>Admin Panel</span>
              <ChevronRight size={16} className={styles.navArrow} aria-hidden="true" />
            </button>
          )}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar} aria-hidden="true">
              <UserIcon size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.role}</div>
            </div>
            <button className={styles.logoutButton} aria-label="Log out">
              <LogOut size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
            aria-expanded={sidebarOpen}
          >
            <Menu size={24} aria-hidden="true" />
          </button>

          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.greeting}>Hello, {user.name.split(" ")[0]} 👋</h1>
              <p className={styles.subGreeting}>
                {activeRole === "admin" ? "Admin Dashboard" : "Here's your health overview"}
              </p>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.headerButton} aria-label="View 3 notifications">
                <Bell size={20} aria-hidden="true" />
                <span className={styles.notificationBadge} aria-hidden="true">
                  3
                </span>
              </button>
              <button className={styles.headerButton} aria-label="View calendar">
                <Calendar size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        {/* CUSTOMER VIEW */}
        {activeRole === "customer" && (
          <>
            <section className={styles.section} aria-labelledby="quick-actions-title">
              <h2 id="quick-actions-title" className={styles.sectionTitle}>
                Quick Actions
              </h2>
              <div className={styles.quickActionsGrid}>
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className={styles.quickActionCard}
                    onClick={() => handleQuickAction(action.action)}
                    aria-label={action.title}
                  >
                    <div className={styles.quickActionIcon} aria-hidden="true">
                      {action.icon}
                    </div>
                    <span className={styles.quickActionTitle}>{action.title}</span>
                    <ChevronRight size={18} className={styles.quickActionArrow} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            <div className={styles.dashboardGrid}>
              <section className={styles.prescriptionsSection} aria-labelledby="prescriptions-title">
                <div className={styles.sectionHeader}>
                  <h2 id="prescriptions-title" className={styles.sectionTitleLarge}>
                    Active Prescriptions
                  </h2>
                  <button className={styles.viewAllButton} aria-label="View all prescriptions">
                    View All
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>

                <div className={styles.prescriptionsList}>
                  {activePrescriptions.length === 0 ? (
                    <div className={styles.emptyState}>No active prescriptions found.</div>
                  ) : (
                    activePrescriptions.map((prescription) => (
                      <article key={prescription.id} className={styles.prescriptionCard}>
                        <div className={styles.prescriptionHeader}>
                          <div className={styles.prescriptionIconWrapper} aria-hidden="true">
                            <Pill size={20} />
                          </div>
                          <span className={styles.prescriptionId}>{prescription.id}</span>
                        </div>

                        <h3 className={styles.prescriptionName}>{prescription.medication}</h3>

                        <div className={styles.prescriptionDetails}>
                          <div className={styles.prescriptionInfo}>
                            <span className={styles.infoLabel}>Refills Left</span>
                            <span className={styles.infoValue}>
                              <span className={styles.refillBadge}>{prescription.refillsLeft}</span>
                            </span>
                          </div>
                          <div className={styles.prescriptionInfo}>
                            <span className={styles.infoLabel}>Expires</span>
                            <span className={styles.infoValue}>{formatDate(prescription.expiryDate)}</span>
                          </div>
                        </div>

                        <button className={styles.refillButton} aria-label={`Refill ${prescription.medication}`}>
                          <Pill size={16} aria-hidden="true" />
                          Refill Now
                        </button>
                      </article>
                    ))
                  )}
                </div>
              </section>

              <aside className={styles.dashboardSidebar} aria-label="Recent orders and health stats">
                <section className={styles.recentOrdersSection} aria-labelledby="orders-title">
                  <h2 id="orders-title" className={styles.sectionTitleSmall}>
                    Recent Orders
                  </h2>

                  <div className={styles.ordersList}>
                    {orders.length === 0 ? (
                      <div className={styles.emptyState}>No recent orders.</div>
                    ) : (
                      orders.map((order) => (
                        <article key={order.id} className={styles.orderItem}>
                          <div className={styles.orderItemHeader}>
                            <span className={styles.orderItemId}>{order.id}</span>
                            <span
                              className={`${styles.orderStatus} ${
                                styles[
                                  `orderStatus${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`
                                ]
                              }`}
                            >
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </div>

                          <div className={styles.orderItemDetails}>
                            <span className={styles.orderDate}>{formatDate(order.date, "short")}</span>
                            <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
                          </div>
                        </article>
                      ))
                    )}
                  </div>

                  <button className={styles.viewAllButtonSecondary} aria-label="View all orders">
                    View All Orders
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </section>

                <section className={styles.healthStatsSection} aria-labelledby="health-title">
                  <h2 id="health-title" className={styles.sectionTitleSmall}>
                    Health Overview
                  </h2>

                  <div className={styles.statsList}>
                    {healthStats.map((stat, index) => (
                      <div key={index} className={styles.statItem}>
                        <div className={styles.statIcon} aria-hidden="true">
                          {stat.icon}
                        </div>
                        <div className={styles.statContent}>
                          <span className={styles.statValue}>{stat.value}</span>
                          <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </>
        )}

        {/* ADMIN VIEW */}
        {activeRole === "admin" && user.role === "admin" && (
          <>
            <section className={styles.section} aria-labelledby="system-overview-title">
              <h2 id="system-overview-title" className={styles.sectionTitle}>
                System Overview
              </h2>

              <div className={styles.adminStatsGrid}>
                {adminStats.map((stat, index) => (
                  <div key={index} className={styles.adminStatCard}>
                    <div className={styles.adminStatIcon} aria-hidden="true">
                      {stat.icon}
                    </div>

                    <div className={styles.adminStatContent}>
                      <span className={styles.adminStatValue}>{stat.value}</span>
                      <span className={styles.adminStatLabel}>{stat.label}</span>
                    </div>

                    <div className={styles.adminStatTrend}>
                      <span className={getTrendClass(stat.trend)} aria-label={stat.trendLabel}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="admin-controls-title">
              <h2 id="admin-controls-title" className={styles.sectionTitle}>
                Administrative Controls
              </h2>

              <div className={styles.adminGrid}>
                {adminControls.map((control) => (
                  <article key={control.id} className={styles.adminCard}>
                    <div className={styles.adminCardIcon} aria-hidden="true">
                      {control.icon}
                    </div>

                    <h3 className={styles.adminCardTitle}>{control.title}</h3>
                    <p className={styles.adminCardDescription}>{control.description}</p>

                    <div className={styles.adminCardActions}>
                      <button className={styles.buttonPrimary}>
                        {control.primaryAction}
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>

                      <button className={styles.buttonSecondary}>{control.secondaryAction}</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
