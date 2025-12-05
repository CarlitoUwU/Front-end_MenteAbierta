import { useState } from "react";
import { MdAir, MdFavorite, MdNightlight, MdSentimentVerySatisfied } from "react-icons/md";
import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { EjercicioCard } from "./ejercicios/EjercicioCard";

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
      <CategoriasContent>
        {categorias.map(categoria =>
          <CategoriaItem key={categoria} categoria={categoria} isActiva={categoria === categoriaActiva} onClick={() => setCategoriaActiva(categoria)} />
        )}
      </CategoriasContent>

      {/* Grid de tarjetas de ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ejerciciosFiltrados.map((ejercicio) =>
          <EjercicioCard {...ejercicio} key={ejercicio.id} />
        )}
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