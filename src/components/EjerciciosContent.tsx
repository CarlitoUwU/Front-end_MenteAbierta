import { useState } from "react";
import { MdAccessTime, MdAir, MdFavorite, MdNightlight, MdSentimentVerySatisfied } from "react-icons/md";
import type { DashboardContentProps } from "../@types/dashboard";

type Categoria = "Todos" | "Respiración" | "Relajación" | "Mindfulness" | "Movimiento";

interface Ejercicio {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  categoria: Categoria;
  icono: React.ComponentType<{ className?: string }>;
  colorIcono: string;
  colorFondo: string;
}

export const EjerciciosContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");

  const categorias: Categoria[] = ["Todos", "Respiración", "Relajación", "Mindfulness", "Movimiento"];

  const ejercicios: Ejercicio[] = [
    {
      id: "respiracion-4-7-8",
      titulo: "Respiración 4-7-8",
      descripcion: "Técnica de respiración para reducir la ansiedad",
      duracion: "5 min",
      categoria: "Respiración",
      icono: MdAir,
      colorIcono: "text-blue-600",
      colorFondo: "bg-blue-100",
    },
    {
      id: "escaneo-corporal",
      titulo: "Escaneo Corporal",
      descripcion: "Relajación progresiva de todo el cuerpo",
      duracion: "10 min",
      categoria: "Relajación",
      icono: MdFavorite,
      colorIcono: "text-green-600",
      colorFondo: "bg-green-100",
    },
    {
      id: "meditacion-guiada",
      titulo: "Meditación Guiada",
      descripcion: "Práctica de atención plena para el momento presente",
      duracion: "15 min",
      categoria: "Mindfulness",
      icono: MdNightlight,
      colorIcono: "text-purple-600",
      colorFondo: "bg-purple-100",
    },
    {
      id: "gratitud-diaria",
      titulo: "Gratitud Diaria",
      descripcion: "Reflexión sobre tres cosas por las que estás agradecido",
      duracion: "3 min",
      categoria: "Mindfulness",
      icono: MdSentimentVerySatisfied,
      colorIcono: "text-yellow-600",
      colorFondo: "bg-yellow-100",
    },
  ];

  const ejerciciosFiltrados = categoriaActiva === "Todos"
    ? ejercicios
    : ejercicios.filter((ejercicio) => ejercicio.categoria === categoriaActiva);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Ejercicios de Autocuidado</h1>
        <p className="text-lg text-gray-600">
          Prácticas guiadas para tu bienestar emocional
        </p>
      </div>

      {/* Filtros/Categorías - Pills horizontales */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${
                categoriaActiva === categoria
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de tarjetas de ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ejerciciosFiltrados.map((ejercicio) => {
          const IconoEjercicio = ejercicio.icono;
          
          return (
            <div
              key={ejercicio.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {/* Icono y contenido */}
              <div className="flex gap-4 mb-4">
                <div className={`${ejercicio.colorFondo} rounded-2xl p-4 flex-shrink-0 h-fit`}>
                  <IconoEjercicio className={`text-4xl ${ejercicio.colorIcono}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {ejercicio.titulo}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {ejercicio.descripcion}
                  </p>
                </div>
              </div>

              {/* Metadata inferior */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <MdAccessTime className="text-lg" />
                  <span className="text-sm font-medium">{ejercicio.duracion}</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {ejercicio.categoria}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensaje cuando no hay ejercicios filtrados */}
      {ejerciciosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay ejercicios disponibles en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}