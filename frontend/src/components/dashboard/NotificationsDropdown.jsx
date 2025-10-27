// components/NotificationsDropdown.jsx
import { X } from "lucide-react";

const NotificationsDropdown = ({
  notifications,
  markAsRead,
  removeNotification,
  clearAllNotifications,
  onClose,
}) => {
  // Function to format currency amounts in messages
  const formatMessage = (message) => {
    // Replace dollar signs with INR symbol (handles both $ and already existing ₹)
    return message.replace(/\$/g, "₹");
  };

  const handleRemove = (e, notifId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Removing notification:", notifId);
    removeNotification(notifId);
  };

  const handleMarkAsRead = (e, notifId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Marking as read:", notifId);
    markAsRead(notifId);
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Clearing all notifications");
    if (clearAllNotifications) {
      clearAllNotifications();
    } else {
      notifications.forEach((notif) => removeNotification(notif.id));
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-40 lg:hidden bg-black/20"
        onClick={onClose}
      ></div>

      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close notifications"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  !notif.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      !notif.read ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">
                      {notif.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatMessage(notif.message)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>

                  <button
                    onClick={(e) => handleRemove(e, notif.id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0 group"
                    title="Remove notification"
                    aria-label="Remove notification"
                    type="button"
                  >
                    <X className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>

                {!notif.read && (
                  <button
                    onClick={(e) => handleMarkAsRead(e, notif.id)}
                    className="mt-2 ml-5 text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                    type="button"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClearAll}
              className="w-full text-sm text-gray-700 hover:text-gray-900 font-medium py-2 hover:bg-gray-100 rounded transition-colors"
              type="button"
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationsDropdown;
