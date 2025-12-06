type EmocionButtonProps = {
  color: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export const EmocionButton = ({ color, icon, label, onClick }: EmocionButtonProps) => (
  <button
    onClick={onClick}
    className={`rounded-xl flex flex-col items-center justify-center gap-2 p-6 py-10 text-white cursor-pointer transition-all ${color}`}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {icon}
    <span className="text-lg font-medium">{label}</span>
  </button>
);