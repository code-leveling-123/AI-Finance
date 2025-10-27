const PieChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#6366f1",
    "#84cc16",
  ];

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      d: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: colors[index % colors.length],
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1),
    };
  });

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-48 h-48 flex-shrink-0">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.d}
            fill={slice.color}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      <div className="flex-1 space-y-2 w-full">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: slice.color }}
              ></div>
              <span className="text-sm text-gray-700 truncate">
                {slice.label}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-900">
                <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                {slice.value.toFixed(0)}
              </span>
              <span className="text-xs text-gray-500 w-12 text-right">
                {slice.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
