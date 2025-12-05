type PreguntaItemProps = {
  children: React.ReactNode;
  label: string;
  isSlider?: boolean;
};

export const PreguntaItem = ({ children, label, isSlider }: PreguntaItemProps) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        {label}
      </label>
      <div className={`gap-3 ${isSlider ? "" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
        {children}
      </div>
    </div>
  );
};