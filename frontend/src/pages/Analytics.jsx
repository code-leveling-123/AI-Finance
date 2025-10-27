import StatCard from "../components/dashboard/StatCard";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";

const Analytics = ({ transactions, stats }) => {
  // Monthly data for line chart
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.type === "income") {
      acc[month].income += t.amount;
    } else {
      acc[month].expense += Math.abs(t.amount);
    }
    return acc;
  }, {});

  // Category data for pie chart
  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  // Prepare data for charts
  const lineChartData = Object.entries(monthlyData).map(([month, data]) => ({
    label: month,
    value: data.income - data.expense,
  }));

  const barChartData = Object.entries(categoryData).map(
    ([category, amount]) => ({
      label: category,
      value: amount,
    })
  );

  const pieChartData = Object.entries(categoryData).map(
    ([category, amount]) => ({
      label: category,
      value: amount,
    })
  );

  const incomeExpenseData = Object.entries(monthlyData).map(
    ([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    })
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
            Category Comparison
          </h2>
          {barChartData.length > 0 ? (
            <BarChart data={barChartData} />
          ) : (
            <p className="text-center text-gray-500 py-12">No expenses yet</p>
          )}
        </div>

        {/* Expense Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
            Expense Distribution
          </h2>
          {pieChartData.length > 0 ? (
            <PieChart data={pieChartData} />
          ) : (
            <p className="text-center text-gray-500 py-12">No expenses yet</p>
          )}
        </div>
      </div>

      {/* Income vs Expense */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
          Income vs Expense
        </h2>
        <div className="space-y-4">
          {incomeExpenseData.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No data available</p>
          ) : (
            incomeExpenseData.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">
                    {data.month}
                  </span>
                  <span className="text-green-600 font-semibold">
                    +₹{data.income.toFixed(0)}
                  </span>
                  <span className="text-red-600 font-semibold">
                    -₹{data.expense.toFixed(0)}
                  </span>
                </div>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                  <div
                    className="bg-green-500 flex items-center justify-center text-xs font-semibold text-white"
                    style={{
                      width: `${
                        (data.income / (data.income + data.expense)) * 100
                      }%`,
                    }}
                  >
                    {data.income > 0 &&
                      (
                        (data.income / (data.income + data.expense)) *
                        100
                      ).toFixed(0) + "%"}
                  </div>
                  <div
                    className="bg-red-500 flex items-center justify-center text-xs font-semibold text-white"
                    style={{
                      width: `${
                        (data.expense / (data.income + data.expense)) * 100
                      }%`,
                    }}
                  >
                    {data.expense > 0 &&
                      (
                        (data.expense / (data.income + data.expense)) *
                        100
                      ).toFixed(0) + "%"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Category Breakdown Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
          Category Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryData).length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-12">
              No expenses yet
            </p>
          ) : (
            Object.entries(categoryData).map(([category, amount]) => (
              <div
                key={category}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-600 mb-1">{category}</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {((amount / stats.expenses) * 100).toFixed(1)}% of total
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
