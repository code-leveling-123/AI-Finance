const LineChart = ({ data, height = 200 }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const width = 100;
  const padding = 10;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
      const y =
        height -
        ((d.value - minValue) / range) * (height - 2 * padding) -
        padding;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1={padding}
            y1={(y / 100) * (height - 2 * padding) + padding}
            x2={width - padding}
            y2={(y / 100) * (height - 2 * padding) + padding}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}

        {/* Area under line */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${padding},${height - padding} ${points} ${
            width - padding
          },${height - padding}`}
          fill="url(#lineGradient)"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
          const y =
            height -
            ((d.value - minValue) / range) * (height - 2 * padding) -
            padding;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
