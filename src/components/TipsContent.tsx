import { useState, useEffect } from "react";
import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { TipsContenedor } from "./tips/TipsContenedor";
import { TipsMainCard } from "./tips/TipsMainCard";
import { TipsCard } from "./tips/TipsCard";
import { tipsService } from "../services/tips.service";
import toast from "react-hot-toast";
import type { Tip, CategoriaTip } from "../types";

type Categoria = "TODOS" | "DIARIO" | "ESTRES" | "SUENO" | "BIENESTAR";

const CATEGORIA_LABELS: Record<Categoria, string> = {
  TODOS: "Todos",
  DIARIO: "Diario",
  ESTRES: "Estrés",
  SUENO: "Sueño",
  BIENESTAR: "Bienestar",
};

export const TipsContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("TODOS");
  const [tipActualIndex, setTipActualIndex] = useState(0);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  const categorias: Categoria[] = ["TODOS", "DIARIO", "ESTRES", "SUENO", "BIENESTAR"];

  // Cargar tips del backend
  useEffect(() => {
    const cargarTips = async () => {
      try {
        const categoria = categoriaActiva === "TODOS" ? undefined : categoriaActiva;
        const data = await tipsService.getAll(categoria);
        console.log("💡 Tips cargados:", data);
        setTips(data);
        setTipActualIndex(0); // Resetear al primer tip cuando cambia la categoría
      } catch (error: any) {
        console.error("❌ Error al cargar tips:", error);
        toast.error(error.response?.data?.detail || "Error al cargar tips");
      } finally {
        setLoading(false);
      }
    };

    cargarTips();
  }, [categoriaActiva]);

  const tipsFiltrados = tips; // Ya están filtrados por el backend

  const tipActual = tipsFiltrados[tipActualIndex] || tipsFiltrados[0];

  const siguienteTip = () => {
    setTipActualIndex((prev) => (prev + 1) % tipsFiltrados.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando tips...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Tips de Bienestar</h1>
        <p className="text-lg text-gray-600">
          Consejos prácticos para tu día a día
        </p>
      </div>

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

      <TipsContenedor>
        {tipsFiltrados.length > 0 ? (
          <>
            <TipsMainCard
              titulo={tipActual.titulo}
              descripcion={tipActual.contenido}
              index={tipActualIndex + 1}
              total={tipsFiltrados.length}
              onClick={siguienteTip}
            />

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {tipsFiltrados.map((tip, index) => (
                <TipsCard 
                  key={tip.id} 
                  id={String(tip.id)}
                  titulo={tip.titulo}
                  descripcion={tip.contenido}
                  categoria={CATEGORIA_LABELS[tip.categoria]}
                  isActive={tip.id === tipActual.id} 
                  onClick={() => setTipActualIndex(index)} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay tips disponibles en este momento
            </p>
          </div>
        )}
      </TipsContenedor>
    </div>
  );
}