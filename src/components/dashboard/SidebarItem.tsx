type SidebarItemProps = {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

export const SidebarItem = ({ text, icon, onClick, active = false }: SidebarItemProps) => {
  const background = active ? 'bg-green-600 text-white' : 'hover:bg-green-700';
  return (
    <button
      className={`flex items-center gap-3 p-3 rounded-lg ${background}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};
