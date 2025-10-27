import {
  DollarSign,
  Home,
  CreditCard,
  BarChart3,
  PieChart,
  MessageCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from "lucide-react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  userData,
  onShowProfile,
  onLogout,
}) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    // { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "budgets", label: "Budgets", icon: PieChart },
    { id: "assistant", label: "AI Assistant", icon: MessageCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-gray-900">
                    FinanceFlow
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-full flex justify-center p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={!sidebarOpen ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4 flex-shrink-0">
            <button
              onClick={onShowProfile}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors mb-2"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {userData?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email || "user@example.com"}
                  </p>
                </div>
              )}
            </button>

            {/* Logout Button - Always Visible */}
            <button
              onClick={onLogout}
              className={`w-full flex items-center ${
                sidebarOpen ? "gap-2" : "justify-center"
              } px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
              title={!sidebarOpen ? "Logout" : ""}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
