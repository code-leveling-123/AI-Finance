// components/modals/MonthlyLimitModal.jsx
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const MonthlyLimitModal = ({ onClose, onSetLimit, onSkip }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    onSetLimit(parseFloat(amount));
  };

  const handleSkip = () => {
    if (
      window.confirm(
        "Are you sure you want to skip setting a monthly limit? You can set it later from settings."
      )
    ) {
      onSkip();
    }
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Set Monthly Spending Limit
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-900">
              💡 Setting a monthly limit helps you track your spending and stay
              within budget. You'll receive alerts when you're approaching your
              limit.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="monthly-limit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Monthly Limit Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                id="monthly-limit"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Set Limit
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-gray-500 text-center">
          You can always change this limit later from your profile settings
        </p>
      </div>
    </div>
  );
};

export default MonthlyLimitModal;
