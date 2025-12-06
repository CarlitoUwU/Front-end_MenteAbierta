import { useState, useEffect } from "react";
import { MdAir, MdFavorite, MdNightlight, MdSentimentVerySatisfied } from "react-icons/md";
import toast from "react-hot-toast";
import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { EjercicioCard } from "./ejercicios/EjercicioCard";
import { ejerciciosService } from "../services/ejercicios.service";
import type { Ejercicio, CategoriaEjercicio, TipoIcono } from "../types";

type Categoria = "Todos" | "RESPIRACION" | "RELAJACION" | "MINDFULNESS" | "MOVIMIENTO";

const CATEGORIA_LABELS: Record<CategoriaEjercicio | "Todos", string> = {
  Todos: "Todos",
  RESPIRACION: "Respiración",
  RELAJACION: "Relajación",
  MINDFULNESS: "Mindfulness",
  MOVIMIENTO: "Movimiento",
};

const ICONO_MAP: Record<TipoIcono, React.ComponentType<{ className?: string }>> = {
  VIENTO: MdAir,
  CORAZON: MdFavorite,
  LUNA: MdNightlight,
  SOL: MdSentimentVerySatisfied,
};

const ICONO_COLORES: Record<TipoIcono, { icono: string; fondo: string }> = {
  VIENTO: { icono: "text-blue-600", fondo: "bg-blue-100" },
  CORAZON: { icono: "text-green-600", fondo: "bg-green-100" },
  LUNA: { icono: "text-purple-600", fondo: "bg-purple-100" },
  SOL: { icono: "text-yellow-600", fondo: "bg-yellow-100" },
};

export const EjerciciosContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [loading, setLoading] = useState(true);

  const categorias: Categoria[] = ["Todos", "RESPIRACION", "RELAJACION", "MINDFULNESS", "MOVIMIENTO"];

  // Cargar ejercicios del backend
  useEffect(() => {
    const cargarEjercicios = async () => {
      try {
        const data = await ejerciciosService.getAll();
        console.log("🏋️ Ejercicios cargados:", data);
        setEjercicios(data);
      } catch (error: any) {
        console.error("❌ Error al cargar ejercicios:", error);
        toast.error(error.response?.data?.detail || "Error al cargar ejercicios");
      } finally {
        setLoading(false);
      }
    };

    cargarEjercicios();
  }, []);

  // Manejar completar ejercicio
  const handleCompletar = async (ejercicioId: number) => {
    try {
      await ejerciciosService.completar(ejercicioId);
      toast.success("¡Ejercicio completado! 🎉");
    } catch (error: any) {
      console.error("❌ Error al completar ejercicio:", error);
      toast.error(error.response?.data?.detail || "Error al completar ejercicio");
    }
  };

  const ejerciciosFiltrados = categoriaActiva === "Todos"
    ? ejercicios
    : ejercicios.filter((ejercicio) => ejercicio.categoria === categoriaActiva);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando ejercicios...</p>
      </div>
    );
  }

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
        {categorias.map(categoria => (
          <CategoriaItem 
            key={categoria} 
            categoria={CATEGORIA_LABELS[categoria]} 
            isActiva={categoria === categoriaActiva} 
            onClick={() => setCategoriaActiva(categoria)} 
          />
        ))}
      </CategoriasContent>

      {/* Grid de tarjetas de ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ejerciciosFiltrados.map((ejercicio) => {
          const IconoComponent = ICONO_MAP[ejercicio.icono];
          const colores = ICONO_COLORES[ejercicio.icono];
          
          return (
            <EjercicioCard 
              key={ejercicio.id}
              id={String(ejercicio.id)}
              titulo={ejercicio.titulo}
              descripcion={ejercicio.descripcion}
              duracion={`${ejercicio.duracion} min`}
              categoria={CATEGORIA_LABELS[ejercicio.categoria]}
              icono={IconoComponent}
              colorIcono={colores.icono}
              colorFondo={colores.fondo}
              onCompletar={() => handleCompletar(ejercicio.id)}
            />
          );
        })}
      </div>

      {/* Mensaje cuando no hay ejercicios */}
      {ejerciciosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {ejercicios.length === 0 
              ? "No hay ejercicios disponibles en este momento" 
              : "No hay ejercicios disponibles en esta categoría"}
          </p>
        </div>
      )}
    </div>
  );
}