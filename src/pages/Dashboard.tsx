import { useEffect, useState, useCallback } from "react";
import { 
  Pill, FileText, Calendar, Package, CreditCard, 
  Settings, Bell, Home, User, LogOut, 
  ChevronRight, Clock, CheckCircle2, Truck,
  Users, DollarSign, Activity,
  ShoppingBag, BarChart3, Shield, Menu, X
} from "lucide-react";
import styles from "./Dashboard.module.css";

type Role = "customer" | "admin";

interface User {
  isLoggedIn: boolean;
  role: Role;
  name: string;
  memberSince?: string;
}

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

const getUser = (): User => ({
  isLoggedIn: true,
  role: "admin",
  name: "Sarah Johnson",
  memberSince: "2022",
});

const getCustomerPrescriptions = (): Prescription[] => [
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

const getCustomerOrders = (): Order[] => [
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
    total: 89.50,
    status: "delivered",
    items: 5,
  },
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<Role>("customer");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const quickActions: QuickAction[] = [
    { id: "refill", title: "Refill Prescription", icon: <Pill size={24} />, action: "refill" },
    { id: "upload", title: "Upload Prescription", icon: <FileText size={24} />, action: "upload" },
    { id: "consult", title: "Book Consultation", icon: <Calendar size={24} />, action: "consult" },
    { id: "history", title: "View History", icon: <Activity size={24} />, action: "history" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userData = getUser();
        setUser(userData);
        setActiveRole("customer");

        if (userData.isLoggedIn && userData.role === "customer") {
          setPrescriptions(getCustomerPrescriptions());
          setOrders(getCustomerOrders());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRoleSwitch = useCallback((role: Role) => {
    setActiveRole(role);
    setSidebarOpen(false);
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    console.log(`Quick action triggered: ${action}`);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user || !user.isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.loginPrompt}>
          <Shield size={64} className={styles.loginIcon} />
          <h2 className={styles.loginTitle}>Secure Access Required</h2>
          <p className={styles.loginMessage}>
            Please log in to access your health dashboard and prescription information.
          </p>
          <button className={styles.loginButton}>
            <User size={20} />
            Sign In Securely
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 size={16} />;
      case "shipped":
        return <Truck size={16} />;
      case "processing":
        return <Clock size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Pill size={28} strokeWidth={2.5} />
            </div>
            <span className={styles.logoText}>HealthRx</span>
          </div>
          <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${activeRole === "customer" ? styles.navItemActive : ""}`}
            onClick={() => handleRoleSwitch("customer")}
          >
            <Home size={20} />
            <span>Dashboard</span>
            <ChevronRight size={16} className={styles.navArrow} />
          </button>
          <button className={styles.navItem}>
            <Pill size={20} />
            <span>Prescriptions</span>
            <ChevronRight size={16} className={styles.navArrow} />
          </button>
          <button className={styles.navItem}>
            <Package size={20} />
            <span>Orders</span>
            <ChevronRight size={16} className={styles.navArrow} />
          </button>
          <button className={styles.navItem}>
            <CreditCard size={20} />
            <span>Payments</span>
            <ChevronRight size={16} className={styles.navArrow} />
          </button>
          <button className={styles.navItem}>
            <Settings size={20} />
            <span>Settings</span>
            <ChevronRight size={16} className={styles.navArrow} />
          </button>
          {user.role === "admin" && (
            <button
              className={`${styles.navItem} ${activeRole === "admin" ? styles.navItemActive : ""}`}
              onClick={() => handleRoleSwitch("admin")}
            >
              <Shield size={20} />
              <span>Admin Panel</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>
          )}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.role}</div>
            </div>
            <button className={styles.logoutButton}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <button className={styles.menuButton} onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.greeting}>Hello, {user.name.split(" ")[0]} 👋</h1>
              <p className={styles.subGreeting}>
                {activeRole === "admin" ? "Admin Dashboard" : "Here's your health overview"}
              </p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.headerButton}>
                <Bell size={20} />
                <span className={styles.notificationBadge}>3</span>
              </button>
              <button className={styles.headerButton}>
                <Calendar size={20} />
              </button>
            </div>
          </div>
        </header>

        {activeRole === "customer" && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.quickActionsGrid}>
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className={styles.quickActionCard}
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <div className={styles.quickActionIcon}>{action.icon}</div>
                    <span className={styles.quickActionTitle}>{action.title}</span>
                    <ChevronRight size={18} className={styles.quickActionArrow} />
                  </button>
                ))}
              </div>
            </section>

            <div className={styles.dashboardGrid}>
              <section className={styles.prescriptionsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitleLarge}>Active Prescriptions</h2>
                  <button className={styles.viewAllButton}>
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className={styles.prescriptionsList}>
                  {prescriptions
                    .filter((rx) => rx.status === "active")
                    .map((prescription) => (
                      <article key={prescription.id} className={styles.prescriptionCard}>
                        <div className={styles.prescriptionHeader}>
                          <div className={styles.prescriptionIconWrapper}>
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
                            <span className={styles.infoValue}>
                              {new Date(prescription.expiryDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        <button className={styles.refillButton}>
                          <Pill size={16} />
                          Refill Now
                        </button>
                      </article>
                    ))}
                </div>
              </section>

              <aside className={styles.dashboardSidebar}>
                <section className={styles.recentOrdersSection}>
                  <h2 className={styles.sectionTitleSmall}>Recent Orders</h2>
                  <div className={styles.ordersList}>
                    {orders.map((order) => (
                      <article key={order.id} className={styles.orderItem}>
                        <div className={styles.orderItemHeader}>
                          <span className={styles.orderItemId}>{order.id}</span>
                          <span className={`${styles.orderStatus} ${styles[`orderStatus${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`]}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                        <div className={styles.orderItemDetails}>
                          <span className={styles.orderDate}>
                            {new Date(order.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button className={styles.viewAllButtonSecondary}>
                    View All Orders
                    <ChevronRight size={16} />
                  </button>
                </section>

                <section className={styles.healthStatsSection}>
                  <h2 className={styles.sectionTitleSmall}>Health Overview</h2>
                  <div className={styles.statsList}>
                    <div className={styles.statItem}>
                      <div className={styles.statIcon}>
                        <FileText size={20} />
                      </div>
                      <div className={styles.statContent}>
                        <span className={styles.statValue}>{prescriptions.length}</span>
                        <span className={styles.statLabel}>Prescriptions</span>
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statIcon}>
                        <Package size={20} />
                      </div>
                      <div className={styles.statContent}>
                        <span className={styles.statValue}>{orders.length}</span>
                        <span className={styles.statLabel}>Orders</span>
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statIcon}>
                        <CheckCircle2 size={20} />
                      </div>
                      <div className={styles.statContent}>
                        <span className={styles.statValue}>
                          {prescriptions.filter((rx) => rx.refillsLeft > 0).length}
                        </span>
                        <span className={styles.statLabel}>Available Refills</span>
                      </div>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </>
        )}

        {activeRole === "admin" && user.role === "admin" && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>System Overview</h2>
              <div className={styles.adminStatsGrid}>
                <div className={styles.adminStatCard}>
                  <div className={styles.adminStatIcon}>
                    <Users size={24} />
                  </div>
                  <div className={styles.adminStatContent}>
                    <span className={styles.adminStatValue}>1,247</span>
                    <span className={styles.adminStatLabel}>Active Patients</span>
                  </div>
                  <div className={styles.adminStatTrend}>
                    <span className={styles.trendUp}>+12%</span>
                  </div>
                </div>
                <div className={styles.adminStatCard}>
                  <div className={styles.adminStatIcon}>
                    <Pill size={24} />
                  </div>
                  <div className={styles.adminStatContent}>
                    <span className={styles.adminStatValue}>342</span>
                    <span className={styles.adminStatLabel}>Pending Prescriptions</span>
                  </div>
                  <div className={styles.adminStatTrend}>
                    <span className={styles.trendNeutral}>-</span>
                  </div>
                </div>
                <div className={styles.adminStatCard}>
                  <div className={styles.adminStatIcon}>
                    <Package size={24} />
                  </div>
                  <div className={styles.adminStatContent}>
                    <span className={styles.adminStatValue}>89</span>
                    <span className={styles.adminStatLabel}>Orders Today</span>
                  </div>
                  <div className={styles.adminStatTrend}>
                    <span className={styles.trendUp}>+8%</span>
                  </div>
                </div>
                <div className={styles.adminStatCard}>
                  <div className={styles.adminStatIcon}>
                    <DollarSign size={24} />
                  </div>
                  <div className={styles.adminStatContent}>
                    <span className={styles.adminStatValue}>$12,450</span>
                    <span className={styles.adminStatLabel}>Revenue Today</span>
                  </div>
                  <div className={styles.adminStatTrend}>
                    <span className={styles.trendUp}>+15%</span>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Administrative Controls</h2>
              <div className={styles.adminGrid}>
                <article className={styles.adminCard}>
                  <div className={styles.adminCardIcon}>
                    <Pill size={28} />
                  </div>
                  <h3 className={styles.adminCardTitle}>Prescription Management</h3>
                  <p className={styles.adminCardDescription}>
                    Review, approve, and manage patient prescriptions. View prescription history and handle refill requests.
                  </p>
                  <div className={styles.adminCardActions}>
                    <button className={styles.buttonPrimary}>
                      Review Prescriptions
                      <ChevronRight size={16} />
                    </button>
                    <button className={styles.buttonSecondary}>Download Reports</button>
                  </div>
                </article>

                <article className={styles.adminCard}>
                  <div className={styles.adminCardIcon}>
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className={styles.adminCardTitle}>Inventory & Products</h3>
                  <p className={styles.adminCardDescription}>
                    Manage medication inventory, pricing, and product catalog. Monitor stock levels and reorder supplies.
                  </p>
                  <div className={styles.adminCardActions}>
                    <button className={styles.buttonPrimary}>
                      Manage Inventory
                      <ChevronRight size={16} />
                    </button>
                    <button className={styles.buttonSecondary}>Update Pricing</button>
                  </div>
                </article>

                <article className={styles.adminCard}>
                  <div className={styles.adminCardIcon}>
                    <Package size={28} />
                  </div>
                  <h3 className={styles.adminCardTitle}>Order Processing</h3>
                  <p className={styles.adminCardDescription}>
                    Process orders, manage shipments, and track deliveries. Handle customer inquiries and returns.
                  </p>
                  <div className={styles.adminCardActions}>
                    <button className={styles.buttonPrimary}>
                      Process Orders
                      <ChevronRight size={16} />
                    </button>
                    <button className={styles.buttonSecondary}>Track Shipments</button>
                  </div>
                </article>

                <article className={styles.adminCard}>
                  <div className={styles.adminCardIcon}>
                    <Users size={28} />
                  </div>
                  <h3 className={styles.adminCardTitle}>Patient Management</h3>
                  <p className={styles.adminCardDescription}>
                    Manage patient accounts, view medical histories, and handle account-related requests.
                  </p>
                  <div className={styles.adminCardActions}>
                    <button className={styles.buttonPrimary}>
                      View Patients
                      <ChevronRight size={16} />
                    </button>
                    <button className={styles.buttonSecondary}>Export Data</button>
                  </div>
                </article>

                <article className={styles.adminCard}>
                  <div className={styles.adminCardIcon}>
                    <BarChart3 size={28} />
                  </div>
                  <h3 className={styles.adminCardTitle}>Analytics & Reports</h3>
                  <p className={styles.adminCardDescription}>
                    Access business intelligence, generate reports, and analyze sales and operational metrics.
                  </p>
                  <div className={styles.adminCardActions}>
                    <button className={styles.buttonPrimary}>
                      View Analytics
                      <ChevronRight size={16} />
                    </button>
                    <button className={styles.buttonSecondary}>Generate Report</button>
                  </div>
                </article>

                <article className={styles.adminCard}>
                  <div className={styles.adminCardIcon}>
                    <Settings size={28} />
                  </div>
                  <h3 className={styles.adminCardTitle}>System Settings</h3>
                  <p className={styles.adminCardDescription}>
                    Configure system settings, manage backups, view logs, and control user permissions.
                  </p>
                  <div className={styles.adminCardActions}>
                    <button className={styles.buttonPrimary}>
                      System Settings
                      <ChevronRight size={16} />
                    </button>
                    <button className={styles.buttonSecondary}>View Logs</button>
                  </div>
                </article>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;