import { useState, useEffect } from "react";
import {
  X,
  Bell,
  Moon,
  DollarSign,
  Globe,
  Shield,
  CheckCircle,
} from "lucide-react";

const SettingsModal = ({ onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    currency: "USD",
    language: "English",
  });
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("settings", JSON.stringify(settings));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Bell className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-500">
                  Enable push notifications
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  notifications: !settings.notifications,
                })
              }
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                settings.notifications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Moon className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
            </div>
            <button
              onClick={() =>
                setSettings({ ...settings, darkMode: !settings.darkMode })
              }
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                settings.darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.darkMode ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* Currency */}
          <div>
            <label className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="font-medium text-gray-900">Currency</span>
            </label>
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="font-medium text-gray-900">Language</span>
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>

          {/* Security */}
          <div>
            <label className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="font-medium text-gray-900">Security</span>
            </label>
            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-left">
              Change Password
            </button>
          </div>

          {saved && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                Settings saved successfully!
              </span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
