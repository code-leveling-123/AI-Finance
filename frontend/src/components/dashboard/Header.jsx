import { Menu, Search, Bell, Settings } from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  userData,
  searchQuery,
  setSearchQuery,
  notifications,
  showNotifications,
  setShowNotifications,
  markAsRead,
  removeNotification,
  clearAllNotifications, // Add this prop
  onShowSettings,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Welcome back, {userData?.name || "User"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search - Only on transactions page */}
            {activeTab === "transactions" && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-48 lg:w-64"
                />
              </div>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationsDropdown
                  notifications={notifications}
                  markAsRead={markAsRead}
                  removeNotification={removeNotification}
                  clearAllNotifications={clearAllNotifications}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* Settings */}
            <button
              onClick={onShowSettings}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
