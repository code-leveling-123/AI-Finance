import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const StatCard = ({ title, amount, change, icon, color }) => {
  const icons = {
    dollar: DollarSign,
    "trending-up": TrendingUp,
    "trending-down": TrendingDown,
  };

  const Icon = icons[icon] || DollarSign;

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-green-600 text-sm font-semibold">{change}</span>
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">
        <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
        {amount.toFixed(2)}
      </h3>
    </div>
  );
};

export default StatCard;
