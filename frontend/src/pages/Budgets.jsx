import { useState } from "react";
import { Plus, TrendingDown, AlertCircle } from "lucide-react";
import PieChart from "../components/charts/PieChart";

const Budgets = ({ transactions }) => {
  const [budgets] = useState([
    {
      category: "Food & Dining",
      limit: 600,
      spent: 0,
      color: "bg-blue-600",
    },
    { category: "Shopping", limit: 400, spent: 0, color: "bg-purple-600" },
    {
      category: "Transportation",
      limit: 250,
      spent: 0,
      color: "bg-green-600",
    },
    {
      category: "Entertainment",
      limit: 150,
      spent: 0,
      color: "bg-yellow-600",
    },
    { category: "Utilities", limit: 300, spent: 0, color: "bg-red-600" },
    { category: "Healthcare", limit: 200, spent: 0, color: "bg-pink-600" },
  ]);

  // Calculate spent amounts
  const updatedBudgets = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.type === "expense" && t.category === budget.category)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { ...budget, spent };
  });

  const totalBudget = updatedBudgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = updatedBudgets.reduce((sum, b) => sum + b.spent, 0);
  const pieChartData = updatedBudgets.map((b) => ({
    label: b.category,
    value: b.spent,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                {totalBudget.toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                {totalSpent.toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-gray-900">
                <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                {(totalBudget - totalSpent).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
          Budget Distribution
        </h2>
        {pieChartData.filter((d) => d.value > 0).length > 0 ? (
          <PieChart data={pieChartData.filter((d) => d.value > 0)} />
        ) : (
          <p className="text-center text-gray-500 py-12">
            No spending data available
          </p>
        )}
      </div>

      {/* Budget Cards */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Monthly Budgets
            </h2>
            <p className="text-sm text-gray-500">Track your spending limits</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Add Budget</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {updatedBudgets.map((budget, index) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80 && percentage <= 100;

            return (
              <div
                key={index}
                className={`p-4 sm:p-6 border-2 rounded-xl transition-all ${
                  isOverBudget
                    ? "border-red-200 bg-red-50"
                    : isNearLimit
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${budget.color}`}
                    ></div>
                    <h3 className="font-semibold text-gray-900">
                      {budget.category}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                    {budget.spent.toFixed(0)} /{" "}
                    <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                    {budget.limit}
                  </span>
                </div>

                {(isOverBudget || isNearLimit) && (
                  <div
                    className={`flex items-center gap-2 mb-3 p-2 rounded-lg ${
                      isOverBudget ? "bg-red-100" : "bg-yellow-100"
                    }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 flex-shrink-0 ${
                        isOverBudget ? "text-red-600" : "text-yellow-600"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isOverBudget ? "text-red-700" : "text-yellow-700"
                      }`}
                    >
                      {isOverBudget ? "Over budget!" : "Approaching limit"}
                    </span>
                  </div>
                )}

                <div className="mb-2">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${budget.color} transition-all duration-500`}
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 whitespace-nowrap">
                    <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                    {Math.max(budget.limit - budget.spent, 0).toFixed(0)}{" "}
                    remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Budgets;
