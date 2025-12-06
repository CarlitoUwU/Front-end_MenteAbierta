import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { useMemo, useState, useEffect } from "react";
import { SearchBard } from "./ui/SearchBard";
import { COLORS } from "../constants/colors";
import { ContenidoHeader } from "./contenido/ContenidoHeader";
import { ArticuloCard } from "./contenido/ArticuloCard";
import { ArticuloModal } from "./contenido/ArticuloModal";
import { contenidoService } from "../services/contenido.service";
import toast from "react-hot-toast";
import type { Articulo, CategoriaArticulo } from "../types";

type Categoria = "TODOS" | "ANSIEDAD" | "ESTRES" | "SUENO" | "RELACIONES" | "AUTOCUIDADO" | "GENERAL";

const CATEGORIA_LABELS: Record<Categoria, string> = {
  TODOS: "Todos",
  ANSIEDAD: "Ansiedad",
  ESTRES: "Estrés",
  SUENO: "Sueño",
  RELACIONES: "Relaciones",
  AUTOCUIDADO: "Autocuidado",
  GENERAL: "General",
};

export const ContenidoContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("TODOS");
  const [searchTerm, setSearchTerm] = useState("");
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categorias: Categoria[] = ["TODOS", "ANSIEDAD", "ESTRES", "SUENO", "RELACIONES", "AUTOCUIDADO", "GENERAL"];

  // Cargar artículos del backend
  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        const categoria = categoriaActiva === "TODOS" ? undefined : categoriaActiva as CategoriaArticulo;
        const data = await contenidoService.getArticulos(categoria);
        console.log("📚 Artículos cargados:", data);
        setArticulos(data);
      } catch (error: any) {
        console.error("❌ Error al cargar artículos:", error);
        toast.error(error.response?.data?.detail || "Error al cargar artículos");
      } finally {
        setLoading(false);
      }
    };

    cargarArticulos();
  }, [categoriaActiva]);

  const handleAbrirArticulo = async (id: number) => {
    try {
      const articulo = await contenidoService.getArticulo(id);
      setArticuloSeleccionado(articulo);
      setIsModalOpen(true);
    } catch (error: any) {
      console.error("❌ Error al cargar artículo:", error);
      toast.error(error.response?.data?.detail || "Error al cargar artículo");
    }
  };

  const articulosFiltered: Articulo[] = useMemo(() => {
    return articulos.filter((articulo) =>
      articulo.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      articulo.resumen?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, articulos]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando artículos...</p>
      </div>
    );
  }

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: COLORS.claro }}
    >
      <ContenidoHeader />
      <SearchBard value={searchTerm} onChange={setSearchTerm} placeholder={"Buscar artículos..."} />

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articulosFiltered.map(articulo => (
          <ArticuloCard 
            key={articulo.id}
            id={String(articulo.id)}
            categoria={CATEGORIA_LABELS[articulo.categoria]}
            duracion={articulo.tiempo_lectura}
            titulo={articulo.titulo}
            descripcion={articulo.resumen}
            imgSrc={articulo.imagen_url || "https://i.ibb.co/pvrhh2G8/f9573a86d50588bcb22b3222ac945b4a6e370c63.jpg"}
            onClick={() => handleAbrirArticulo(articulo.id)}
          />
        ))}
      </div>

      {/* Mensaje cuando no hay artículos */}
      {articulosFiltered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {articulos.length === 0 
              ? "No hay artículos disponibles en este momento" 
              : "No se encontraron artículos con ese término de búsqueda"}
          </p>
        </div>
      )}

      {/* Modal de artículo completo */}
      {articuloSeleccionado && (
        <ArticuloModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setArticuloSeleccionado(null);
          }}
          imgSrc={articuloSeleccionado.imagen_url || "https://i.ibb.co/pvrhh2G8/f9573a86d50588bcb22b3222ac945b4a6e370c63.jpg"}
          categoria={CATEGORIA_LABELS[articuloSeleccionado.categoria]}
          duracion={articuloSeleccionado.tiempo_lectura}
          titulo={articuloSeleccionado.titulo}
          contenido={articuloSeleccionado.contenido}
          fechaPublicacion={articuloSeleccionado.fecha_publicacion}
        />
      )}
    </div >
  );
};

