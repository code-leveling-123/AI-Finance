import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import MonthlyLimitModal from "./components/modals/MonthlyLimitModal";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedTransactions = localStorage.getItem("transactions");
    const savedBudgets = localStorage.getItem("budgets");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Check if monthly limit is set
    const monthlyLimit = localStorage.getItem("monthlyLimit");
    if (!monthlyLimit) {
      setNewUserName(userData.name);
      setShowLimitModal(true);
    } else {
      handleNavigate("dashboard");
    }
  };

  const handleLimitComplete = () => {
    setShowLimitModal(false);
    handleNavigate("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setTransactions([]);
    setBudgets([]);
    localStorage.clear();
    handleNavigate("home");
  };

  const addTransaction = (transaction) => {
    const newTransactions = [
      ...transactions,
      { ...transaction, id: Date.now() },
    ];
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "dashboard":
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            user={user}
            transactions={transactions}
            budgets={budgets}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}

      {showLimitModal && (
        <MonthlyLimitModal
          onClose={() => setShowLimitModal(false)}
          onSetLimit={(limit) => {
            localStorage.setItem(
              "monthlyLimit",
              JSON.stringify({ amount: limit })
            );
            handleLimitComplete();
          }}
          onSkip={handleLimitComplete}
        />
      )}
    </div>
  );
}

export default App;
