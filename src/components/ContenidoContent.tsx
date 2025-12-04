import { MdAccessTime } from "react-icons/md";
import type { DashboardContentProps } from "../@types/dashboard";

export const ContenidoContent = (_props: DashboardContentProps) => {
  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">Biblioteca de Contenido</h1>
        <p className="text-sm text-gray-600">
          Artículos y recursos para apoyar tu bienestar emocional
        </p>
      </div>

      <input
        type="text"
        placeholder="Buscar artículos..."
        className="w-full bg-white p-4 rounded-lg shadow-sm outline-none placeholder-gray-400"
      />

      <div className="flex flex-wrap gap-3">
        {["Todos", "Ansiedad", "Estrés", "Sueño", "Relaciones", "Autocuidado"].map(
          (cat, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-lg text-sm shadow ${i === 0
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src="https://i.ibb.co/pvrhh2G8/f9573a86d50588bcb22b3222ac945b4a6e370c63.jpg"
            className="w-full h-[250px] object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                Ansiedad
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <MdAccessTime /> 8 min
              </span>
            </div>

            <h2 className="font-semibold text-lg">
              Comprendiendo la Ansiedad: Una Guía Completa
            </h2>

            <p className="text-gray-600 text-sm">
              Aprende qué es la ansiedad, sus síntomas y estrategias efectivas
              para manejarla en tu vida diaria.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src="https://i.ibb.co/TMSDPBRc/18be99baa82e7eb85e82d63513ea1126c582112c.jpg"
            className="w-full h-[250px] object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                Estrés
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <MdAccessTime /> 6 min
              </span>
            </div>

            <h2 className="font-semibold text-lg">
              Técnicas de Relajación para el Día a Día
            </h2>

            <p className="text-gray-600 text-sm">
              Descubre técnicas simples que puedes usar en cualquier momento para reducir el estrés.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src="https://i.ibb.co/VK6KVQW/fd37b48ef6eef5beee40a39db8171b467abb406f.jpg"
            className="w-full h-[250px] object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                Sueño
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <MdAccessTime /> 10 min
              </span>
            </div>

            <h2 className="font-semibold text-lg">
              La Importancia del Sueño para tu Bienestar
            </h2>

            <p className="text-gray-600 text-sm">
              Explora cómo el sueño afecta tu salud y aprende a mejorar tu higiene del sueño.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src="https://i.ibb.co/gLbhMVDX/1ff8ee7d96205008412d947f63f16f9123831a3e.jpg"
            className="w-full h-[250px] object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                Relaciones
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <MdAccessTime /> 7 min
              </span>
            </div>

            <h2 className="font-semibold text-lg">
              Construyendo Relaciones Saludables
            </h2>

            <p className="text-gray-600 text-sm">
              Consejos prácticos para cultivar conexiones significativas y mantener límites saludables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

