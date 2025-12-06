import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { useState, useEffect } from "react";
import { ForoPostItem } from "./foro/ForoPostItem";
import { ForoHeader } from "./foro/ForoHeader";
import { foroService } from "../services/foro.service";
import toast from "react-hot-toast";
import type { Publicacion, CategoriaForo } from "../types";

type Categoria = "TODOS" | "ANSIEDAD" | "BIENESTAR" | "RELACIONES" | "ESTRES" | "GENERAL";

const CATEGORIA_LABELS: Record<Categoria, string> = {
  TODOS: "Todos",
  ANSIEDAD: "Ansiedad",
  BIENESTAR: "Bienestar",
  RELACIONES: "Relaciones",
  ESTRES: "Estrés",
  GENERAL: "General",
};

const categorias: Categoria[] = ["TODOS", "ANSIEDAD", "BIENESTAR", "RELACIONES", "ESTRES", "GENERAL"];

export const ForoContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("TODOS");
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaPublicacion, setCategoriaPublicacion] = useState<CategoriaForo>("GENERAL");
  const [guardando, setGuardando] = useState(false);

  // Cargar publicaciones del backend
  useEffect(() => {
    cargarPublicaciones();
  }, [categoriaActiva]);

  const cargarPublicaciones = async () => {
    try {
      const categoria = categoriaActiva === "TODOS" ? undefined : categoriaActiva as CategoriaForo;
      const data = await foroService.getPublicaciones(categoria);
      console.log("💬 Publicaciones cargadas:", data);
      setPublicaciones(data);
    } catch (error: any) {
      console.error("❌ Error al cargar publicaciones:", error);
      toast.error(error.response?.data?.detail || "Error al cargar publicaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleCrearPublicacion = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      toast.error("Por favor completa el título y contenido");
      return;
    }

    setGuardando(true);
    try {
      await foroService.crear({ titulo, contenido, categoria: categoriaPublicacion });
      toast.success("🎉 Publicación creada exitosamente");
      setIsModalOpen(false);
      setTitulo("");
      setContenido("");
      setCategoriaPublicacion("GENERAL");
      cargarPublicaciones();
    } catch (error: any) {
      console.error("❌ Error al crear publicación:", error);
      toast.error(error.response?.data?.detail || "Error al crear publicación");
    } finally {
      setGuardando(false);
    }
  };

  const handleToggleLike = async (id: number) => {
    try {
      const result = await foroService.toggleLike(id);
      setPublicaciones(prev => 
        prev.map(pub => 
          pub.id === id 
            ? { ...pub, num_likes: result.total_likes, ya_di_like: result.liked }
            : pub
        )
      );
      toast.success(result.liked ? "❤️ Me gusta" : "Like removido");
    } catch (error: any) {
      console.error("❌ Error al dar like:", error);
      toast.error(error.response?.data?.detail || "Error al dar like");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando publicaciones...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-6">
      <ForoHeader />

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

      {/* Botón para crear publicación */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
      >
        + Nueva Publicación
      </button>

      <div className="w-full flex flex-col gap-5">
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion) => (
            <ForoPostItem 
              key={publicacion.id}
              user={publicacion.autor_seudonimo?.substring(0, 2).toUpperCase() || "AN"}
              name={publicacion.autor_seudonimo || "Anónimo"}
              time={new Date(publicacion.fecha_creacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              categoria={CATEGORIA_LABELS[publicacion.categoria]}
              title={publicacion.titulo}
              text={publicacion.contenido}
              likes={publicacion.num_likes}
              replies={publicacion.num_comentarios}
              onLike={() => handleToggleLike(publicacion.id)}
              liked={publicacion.ya_di_like}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay publicaciones en este momento
            </p>
          </div>
        )}
      </div>

      {/* Modal para crear publicación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Nueva Publicación</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Escribe un título..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={categoriaPublicacion}
                  onChange={(e) => setCategoriaPublicacion(e.target.value as CategoriaForo)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="GENERAL">General</option>
                  <option value="ANSIEDAD">Ansiedad</option>
                  <option value="BIENESTAR">Bienestar</option>
                  <option value="RELACIONES">Relaciones</option>
                  <option value="ESTRES">Estrés</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido
                </label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Comparte tus pensamientos..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCrearPublicacion}
                disabled={guardando}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors font-semibold"
              >
                {guardando ? "Publicando..." : "Publicar"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTitulo("");
                  setContenido("");
                  setCategoriaPublicacion("GENERAL");
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
