const SpendingChart = ({ transactions }) => {
  const categories = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    }
    return acc;
  }, {});

  const maxAmount = Math.max(...Object.values(categories), 1);

  return (
    <div className="space-y-3">
      {Object.entries(categories).length === 0 ? (
        <p className="text-center text-gray-500 py-8">No expenses yet</p>
      ) : (
        Object.entries(categories).map(([category, amount]) => (
          <div key={category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{category}</span>
              <span className="text-gray-900 font-medium">
                <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                {amount.toFixed(2)}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(amount / maxAmount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SpendingChart;
