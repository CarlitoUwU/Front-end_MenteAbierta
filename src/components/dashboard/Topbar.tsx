import { MdNotifications, MdSettings, MdSearch } from "react-icons/md";

export const Topbar = () => {
  return (
    <header className="bg-white py-5 px-8 shadow-md border-b border-gray-100">
      <div className="flex items-center justify-between">
        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Buscar ejercicios, tips, contenido..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Acciones y perfil */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notificaciones */}
          <button className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors group">
            <MdNotifications className="text-2xl text-gray-600 group-hover:text-purple-600 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Configuración */}
          <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors group">
            <MdSettings className="text-2xl text-gray-600 group-hover:text-purple-600 transition-colors" />
          </button>

          {/* Separador */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* Perfil */}
          <button className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
              U
            </div>
            <div className="text-left hidden lg:block">
              <p className="font-semibold text-gray-800 text-sm group-hover:text-purple-600 transition-colors">User123</p>
              <p className="text-xs text-gray-500">Miembro activo</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
