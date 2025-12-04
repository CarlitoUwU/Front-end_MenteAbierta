import { COLORS } from "../../constants/colors"

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      className="w-64 p-6 flex flex-col gap-6"
      style={{ backgroundColor: COLORS.azul_oscuro, color: COLORS.texto_claro }}
    >
      <h2 className="text-2xl font-bold">MenteAbierta</h2>

      <nav className="flex flex-col gap-4">
        {children}
      </nav>
    </aside>
  );
}
