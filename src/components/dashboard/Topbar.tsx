import { MdNotifications, MdSettings, MdSearch } from "react-icons/md";
import { COLORS } from "../../constants/colors";
import { Avatar } from "../avatar/Avatar";


export const Topbar = () => {
  return (
    <header
      className="py-5 px-8 shadow-md border-b"
      style={{
        backgroundColor: COLORS.claro,
        borderColor: COLORS.azul_claro,
      }}
    >
      <div className="flex items-center justify-between">

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <MdSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl"
              style={{ color: COLORS.texto_medio }}
            />

            <input
              type="text"
              placeholder="Buscar ejercicios, tips, contenido..."
              className="w-full pl-12 pr-4 py-3 rounded-xl transition-all"
              style={{
                backgroundColor: COLORS.claro,
                border: `1px solid ${COLORS.azul_claro}`,
                color: COLORS.texto_oscuro,
              }}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 ml-6">

          {/* Notifications */}
          <button
            className="relative p-2.5 rounded-lg transition-all cursor-pointer hover:brightness-110"
            style={{ backgroundColor: COLORS.claro }}
          >
            <MdNotifications
              className="text-2xl transition-colors"
              style={{ color: COLORS.texto_medio }}
            />
            <span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2"
              style={{
                backgroundColor: "#FF3B30",
                borderColor: COLORS.claro,
              }}
            ></span>
          </button>

          {/* Settings */}
          <button
            className="p-2.5 rounded-lg transition-all cursor-pointer hover:brightness-110"
            style={{ backgroundColor: COLORS.claro }}
          >
            <MdSettings
              className="text-2xl"
              style={{ color: COLORS.texto_medio }}
            />
          </button>

          {/* Divider */}
          <div
            className="w-px h-8"
            style={{ backgroundColor: COLORS.azul_claro }}
          ></div>

          {/* Profile */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer hover:brightness-110">
            <Avatar letter="U" />
            <div className="hidden lg:block text-left">
              <p
                className="font-semibold text-sm"
                style={{ color: COLORS.texto_oscuro }}
              >
                User123
              </p>
              <p className="text-xs" style={{ color: COLORS.texto_medio }}>
                Miembro activo
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
