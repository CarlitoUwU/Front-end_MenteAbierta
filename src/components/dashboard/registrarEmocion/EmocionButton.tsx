type EmocionButtonProps = {
  color: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export const EmocionButton = ({ color, icon, label, onClick }: EmocionButtonProps) => (
  <button
    onClick={onClick}
    className={`rounded-xl flex flex-col items-center justify-center gap-2 p-6 py-10 text-white cursor-pointer hover:opacity-90 transition ${color}`}
  >
    {icon}
    <span className="text-lg font-medium">{label}</span>
  </button>
);