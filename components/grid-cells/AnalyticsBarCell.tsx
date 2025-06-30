// This component receives AG Grid's cell renderer props
// `value` is the number of accounts for the current row
// `data` contains the entire row's data
// `context` is a custom object we can pass from the main grid component
const AnalyticsBarCell = (props: { value: number, data: any, context: { maxCount: number } }) => {
  const { value, context } = props;
  const { maxCount } = context;

  // Calculate the width of the bar as a percentage of the max count
  // We use Math.max to ensure width is at least 1% to be visible for small values
  const barWidth = maxCount > 0 ? Math.max(1, (value / maxCount) * 100) : 0;

  return (
    <div className="flex items-center h-full w-full">
      {/* The background of the bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 relative">
        {/* The filled portion of the bar */}
        <div
          className="bg-indigo-500 h-4 rounded-full"
          style={{ width: `${barWidth}%` }}
        >
          {/* The text label inside the bar */}
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBarCell;