import { AlertTriangle, X } from "lucide-react";

const BudgetAlert = ({ onClose, percentageUsed, totalSpent, limitAmount }) => {
  const isOverBudget = percentageUsed >= 100;
  const isNearLimit = percentageUsed >= 80 && percentageUsed < 100;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-slide-in">
      <div
        className={`rounded-xl shadow-2xl p-4 border-2 ${
          isOverBudget
            ? "bg-red-50 border-red-500"
            : "bg-yellow-50 border-yellow-500"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isOverBudget ? "bg-red-500" : "bg-yellow-500"
            }`}
          >
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold text-sm sm:text-base mb-1 ${
                isOverBudget ? "text-red-900" : "text-yellow-900"
              }`}
            >
              {isOverBudget ? "⚠️ Budget Exceeded!" : "⚡ Budget Alert!"}
            </h3>
            <p
              className={`text-xs sm:text-sm mb-2 ${
                isOverBudget ? "text-red-800" : "text-yellow-800"
              }`}
            >
              {isOverBudget ? (
                <>
                  You've exceeded your monthly budget by{" "}
                  <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                  {(totalSpent - limitAmount).toFixed(2)}
                </>
              ) : (
                `You've used ${percentageUsed.toFixed(
                  0
                )}% of your monthly budget`
              )}
            </p>

            <div className="bg-white rounded-lg p-2 mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Spent</span>
                <span className="font-semibold text-gray-900">
                  <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                  {totalSpent.toFixed(2)} /{" "}
                  <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                  {limitAmount.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isOverBudget ? "bg-red-500" : "bg-yellow-500"
                  }`}
                  style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  isOverBudget
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                Got it
              </button>
              <button className="text-xs font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                View Details
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-white rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BudgetAlert;
