import { Plus, Camera, Download, TrendingUp, TrendingDown } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import MonthlyLimitCard from "../components/dashboard/MonthlyLimitCard";
import MonthlyLimitModal from "../components/modals/MonthlyLimitModal";
import { useState, useEffect } from "react";

const Overview = ({ stats, transactions, onAddTransaction, onScanReceipt }) => {
  const [monthlyLimit, setMonthlyLimit] = useState(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    const limit = localStorage.getItem("monthlyLimit");
    if (limit) {
      const parsedLimit = JSON.parse(limit);
      setMonthlyLimit(parsedLimit);
      console.log("Monthly limit loaded:", parsedLimit);
    } else {
      // Show modal to set limit on first load
      setShowLimitModal(true);
    }
  }, []);

  const handleSetLimit = (amount, skip = false) => {
    const newLimit = {
      amount: parseFloat(amount),
      skipped: skip,
      setDate: new Date().toISOString(),
    };
    localStorage.setItem("monthlyLimit", JSON.stringify(newLimit));
    setMonthlyLimit(newLimit);
    setShowLimitModal(false);
    console.log("Monthly limit set:", newLimit);
  };

  const handleEditLimit = () => {
    const newLimit = prompt(
      "Enter new monthly spending limit:",
      monthlyLimit?.amount || ""
    );
    if (newLimit && !isNaN(newLimit) && parseFloat(newLimit) > 0) {
      const updatedLimit = {
        amount: parseFloat(newLimit),
        skipped: false,
        setDate: new Date().toISOString(),
      };
      localStorage.setItem("monthlyLimit", JSON.stringify(updatedLimit));
      setMonthlyLimit(updatedLimit);
    }
  };

  const handleSkipLimit = () => {
    const skippedLimit = {
      amount: 0,
      skipped: true,
      setDate: new Date().toISOString(),
    };
    localStorage.setItem("monthlyLimit", JSON.stringify(skippedLimit));
    setMonthlyLimit(skippedLimit);
    setShowLimitModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Balance"
          amount={stats.balance}
          icon="dollar"
          color="blue"
        />
        <StatCard
          title="Total Income"
          amount={stats.income}
          icon="trending-up"
          color="green"
        />
        <StatCard
          title="Total Expenses"
          amount={stats.expenses}
          icon="trending-down"
          color="red"
        />
        {/* <StatCard
          title="Total Savings"
          amount={stats.savings}
          icon="wallet"
          color="purple"
        /> */}
      </div>

      {/* Monthly Limit Card - Show if limit exists and not skipped */}
      {monthlyLimit && !monthlyLimit.skipped && monthlyLimit.amount > 0 && (
        <MonthlyLimitCard
          limit={monthlyLimit}
          totalSpent={stats.expenses}
          onEdit={handleEditLimit}
        />
      )}

      {/* Show button to set limit if skipped or not set */}
      {(!monthlyLimit || monthlyLimit.skipped) && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Set Monthly Spending Limit
              </h3>
              <p className="text-sm text-gray-600">
                Track your expenses better by setting a monthly budget limit
              </p>
            </div>
            <button
              onClick={() => setShowLimitModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
            >
              Set Limit
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Recent Transactions
            </h2>
            <button
              onClick={onAddTransaction}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm self-start sm:self-auto"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No transactions yet</p>
                <button
                  onClick={onAddTransaction}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first transaction
                </button>
              </div>
            ) : (
              transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                        {transaction.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-bold text-sm sm:text-base flex-shrink-0 ml-2 whitespace-nowrap ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                    {Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={onAddTransaction}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">
                Add Transaction
              </span>
            </button>
            <button
              onClick={onScanReceipt}
              className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="font-medium text-gray-700 text-sm sm:text-base">
                Scan Receipt
              </span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="font-medium text-gray-700 text-sm sm:text-base">
                Export Data
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Limit Modal */}
      {showLimitModal && (
        <MonthlyLimitModal
          onClose={() => setShowLimitModal(false)}
          onSetLimit={handleSetLimit}
          onSkip={handleSkipLimit}
        />
      )}
    </div>
  );
};

export default Overview;
