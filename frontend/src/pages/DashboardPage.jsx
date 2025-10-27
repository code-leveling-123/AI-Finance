import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Overview from "./Overview";
import Transactions from "./Transactions";
// import Analytics from "./Analytics";
import Budgets from "./Budgets";
import AIAssistant from "./AIAssistant";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import ReceiptScannerModal from "../components/modals/ReceiptScannerModal";
import ProfileModal from "../components/modals/ProfileModal";
import SettingsModal from "../components/modals/SettingsModal";
import BudgetAlert from "../components/alerts/BudgetAlert";

const DashboardPage = ({
  onNavigate,
  user,
  transactions,
  budgets,
  onAddTransaction,
  onDeleteTransaction,
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [userData, setUserData] = useState(user);
  // In DashboardPage.jsx - Update notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New transaction added",
      message: "Grocery Shopping - &#8377;125.50",
      time: "5m ago",
      read: false,
    },
    {
      id: 2,
      title: "Budget Alert",
      message: "You've used 80% of your Food budget",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      title: "Monthly Report Ready",
      message: "Your November report is ready to download",
      time: "2h ago",
      read: true,
    },
  ]);

  // Calculate stats
  const calculateStats = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const balance = income - expenses;

    return {
      balance,
      income,
      expenses,
      savings: balance * 0.2,
    };
  };

  const stats = calculateStats();

  // Check monthly limit
  useEffect(() => {
    const monthlyLimit = localStorage.getItem("monthlyLimit");
    if (monthlyLimit) {
      const limit = JSON.parse(monthlyLimit);
      if (!limit.skipped) {
        const percentageUsed = (stats.expenses / limit.amount) * 100;

        // Show alert if 80% or more is used
        if (percentageUsed >= 80) {
          setShowBudgetAlert(true);
        }
      }
    }
  }, [stats.expenses, transactions]);

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    console.log("Marking notification as read:", id);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Remove single notification
  const removeNotification = (id) => {
    console.log("Removing notification:", id);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    console.log("Clearing all notifications");
    setNotifications([]);
  };

  const updateUserProfile = (newData) => {
    setUserData(newData);
    const updatedUser = { ...user, ...newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Overview
            stats={stats}
            transactions={transactions}
            onAddTransaction={() => setShowAddTransactionModal(true)}
            onScanReceipt={() => setShowReceiptScanner(true)}
          />
        );
      case "transactions":
        return (
          <Transactions
            transactions={filteredTransactions}
            onDelete={onDeleteTransaction}
            onAdd={() => setShowAddTransactionModal(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        );
      // case "analytics":
      //   return <Analytics transactions={transactions} stats={stats} />;
      case "budgets":
        return <Budgets transactions={transactions} />;
      case "assistant":
        return <AIAssistant />;
      default:
        return (
          <Overview
            stats={stats}
            transactions={transactions}
            onAddTransaction={() => setShowAddTransactionModal(true)}
            onScanReceipt={() => setShowReceiptScanner(true)}
          />
        );
    }
  };

  const monthlyLimit = JSON.parse(localStorage.getItem("monthlyLimit") || "{}");
  const percentageUsed = monthlyLimit.amount
    ? (stats.expenses / monthlyLimit.amount) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
        onShowProfile={() => setShowProfileModal(true)}
        onLogout={onLogout}
      />

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          userData={userData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          markAsRead={markAsRead}
          removeNotification={removeNotification}
          clearAllNotifications={clearAllNotifications}
          onShowSettings={() => setShowSettingsModal(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>

      {/* Budget Alert */}
      {showBudgetAlert && !monthlyLimit.skipped && (
        <BudgetAlert
          onClose={() => setShowBudgetAlert(false)}
          percentageUsed={percentageUsed}
          totalSpent={stats.expenses}
          limitAmount={monthlyLimit.amount}
        />
      )}

      {/* Modals */}
      {showAddTransactionModal && (
        <AddTransactionModal
          onClose={() => setShowAddTransactionModal(false)}
          onAdd={onAddTransaction}
        />
      )}

      {showReceiptScanner && (
        <ReceiptScannerModal
          onClose={() => setShowReceiptScanner(false)}
          onAdd={onAddTransaction}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          user={userData}
          onClose={() => setShowProfileModal(false)}
          onUpdate={updateUserProfile}
        />
      )}

      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}

      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardPage;
