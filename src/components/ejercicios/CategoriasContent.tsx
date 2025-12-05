export const CategoriasContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-max">
        {children}
      </div>
    </div>
  );
};