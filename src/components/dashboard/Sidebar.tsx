export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="w-64 bg-green-800 text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">MenteAbierta</h2>

      <nav className="flex flex-col gap-4">
        {children}
      </nav>
    </aside>
  );
}
