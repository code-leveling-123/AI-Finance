const BarChart = ({ data, height = 200 }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">{item.label}</span>
            <span className="text-gray-900 font-semibold">
              <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
              {item.value.toFixed(0)}
            </span>
          </div>
          <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            >
              {(item.value / maxValue) * 100 > 20 && (
                <span className="text-xs font-semibold text-white">
                  {((item.value / maxValue) * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
