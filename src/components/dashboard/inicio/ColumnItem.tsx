type ColumnDataProps = {
  color: string;
  height: number;
  day: string;
  level: string;
};

export const ColumnItem = ({ color, height, day, level }: ColumnDataProps) => {
  return (
    <div className="flex flex-col items-center flex-1 h-64">
      <div className="w-full flex items-end justify-center h-full">
        <div
          className={`w-full ${color} rounded-t-md transition-all hover:opacity-80 cursor-pointer`}
          style={{ height: `${height}%` }}
          title={`${day}: Estado ${level}`}
        ></div>
      </div>
      <span className="text-sm font-medium text-gray-600 mt-3">{day}</span>
    </div>
  );
}