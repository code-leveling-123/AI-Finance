import { Edit2, AlertCircle, CheckCircle } from "lucide-react";

const MonthlyLimitCard = ({ limit, totalSpent, onEdit }) => {
  const percentageUsed =
    limit.amount > 0 ? (totalSpent / limit.amount) * 100 : 0;
  const remaining = limit.amount - totalSpent;

  const getStatusColor = () => {
    if (percentageUsed >= 100) return "red";
    if (percentageUsed >= 80) return "orange";
    if (percentageUsed >= 60) return "yellow";
    return "green";
  };

  const statusColor = getStatusColor();

  const colorClasses = {
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      progress: "bg-red-500",
      text: "text-red-600",
      icon: "text-red-500",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      progress: "bg-orange-500",
      text: "text-orange-600",
      icon: "text-orange-500",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      progress: "bg-yellow-500",
      text: "text-yellow-600",
      icon: "text-yellow-500",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      progress: "bg-green-500",
      text: "text-green-600",
      icon: "text-green-500",
    },
  };

  const colors = colorClasses[statusColor];

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {percentageUsed >= 80 ? (
            <AlertCircle className={`w-6 h-6 ${colors.icon}`} />
          ) : (
            <CheckCircle className={`w-6 h-6 ${colors.icon}`} />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Spending Limit
            </h3>
            <p className="text-sm text-gray-600">
              {percentageUsed >= 100
                ? "You've exceeded your monthly limit!"
                : percentageUsed >= 80
                ? "You're approaching your monthly limit"
                : "You are within your monthly limit"}
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Edit limit"
          type="button"
        >
          <Edit2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-600">Progress</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${colors.progress} transition-all duration-500 rounded-full`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-xs text-gray-500">Spent</p>
            <p className="text-lg font-bold text-gray-900">
              <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
              {totalSpent.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {remaining >= 0 ? "Remaining" : "Over Budget"}
            </p>
            <p
              className={`text-lg font-bold ${
                remaining >= 0 ? "text-gray-900" : colors.text
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
              {Math.abs(remaining).toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Limit</p>
            <p className="text-lg font-bold text-gray-900">
              <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
              {limit.amount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyLimitCard;
