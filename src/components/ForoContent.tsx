import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { useState, useEffect } from "react";
import { ForoPostItem } from "./foro/ForoPostItem";
import { ForoHeader } from "./foro/ForoHeader";
import { ComentariosModal } from "./foro/ComentariosModal";
import { foroService } from "../services/foro.service";
import toast from "react-hot-toast";
import type { Publicacion, CategoriaForo, Comentario } from "../types";
import { COLORS } from "../constants/colors";
import { MdClose } from "react-icons/md";

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
  const [isComentariosModalOpen, setIsComentariosModalOpen] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loadingComentarios, setLoadingComentarios] = useState(false);

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

  const handleVerComentarios = async (publicacion: Publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setIsComentariosModalOpen(true);
    setLoadingComentarios(true);
    
    try {
      const comentariosData = await foroService.getComentarios(publicacion.id);
      setComentarios(comentariosData);
    } catch (error: any) {
      console.error("❌ Error al cargar comentarios:", error);
      toast.error(error.response?.data?.detail || "Error al cargar comentarios");
    } finally {
      setLoadingComentarios(false);
    }
  };

  const handleEnviarComentario = async (contenido: string) => {
    if (!publicacionSeleccionada) return;

    try {
      const nuevoComentario = await foroService.comentar(publicacionSeleccionada.id, contenido);
      setComentarios(prev => [...prev, nuevoComentario]);
      
      // Actualizar contador de comentarios en la publicación
      setPublicaciones(prev =>
        prev.map(pub =>
          pub.id === publicacionSeleccionada.id
            ? { ...pub, num_comentarios: pub.num_comentarios + 1 }
            : pub
        )
      );
      
      toast.success("💬 Comentario agregado");
    } catch (error: any) {
      console.error("❌ Error al comentar:", error);
      toast.error(error.response?.data?.detail || "Error al enviar comentario");
      throw error;
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
      <ForoHeader onNuevaPublicacion={() => setIsModalOpen(true)} />

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
              onVerComentarios={() => handleVerComentarios(publicacion)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onClick={() => {
              setIsModalOpen(false);
              setTitulo("");
              setContenido("");
              setCategoriaPublicacion("GENERAL");
            }}
          />

          <div className="relative w-full max-w-2xl rounded-2xl p-8 shadow-lg" style={{ backgroundColor: COLORS.claro }}>
            {/* Botón cerrar */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setTitulo("");
                setContenido("");
                setCategoriaPublicacion("GENERAL");
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="text-2xl" style={{ color: COLORS.texto_oscuro }} />
            </button>

            <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.texto_oscuro }}>Nueva Publicación</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.texto_medio }}>
                  Título
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ 
                    borderColor: COLORS.gris_claro,
                    color: COLORS.texto_oscuro
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = COLORS.azul}
                  onBlur={(e) => e.currentTarget.style.borderColor = COLORS.gris_claro}
                  placeholder="Escribe un título..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.texto_medio }}>
                  Categoría
                </label>
                <select
                  value={categoriaPublicacion}
                  onChange={(e) => setCategoriaPublicacion(e.target.value as CategoriaForo)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ 
                    borderColor: COLORS.gris_claro,
                    color: COLORS.texto_oscuro
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = COLORS.azul}
                  onBlur={(e) => e.currentTarget.style.borderColor = COLORS.gris_claro}
                >
                  <option value="GENERAL">General</option>
                  <option value="ANSIEDAD">Ansiedad</option>
                  <option value="BIENESTAR">Bienestar</option>
                  <option value="RELACIONES">Relaciones</option>
                  <option value="ESTRES">Estrés</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.texto_medio }}>
                  Contenido
                </label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent resize-none"
                  style={{ 
                    borderColor: COLORS.gris_claro,
                    color: COLORS.texto_oscuro
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = COLORS.azul}
                  onBlur={(e) => e.currentTarget.style.borderColor = COLORS.gris_claro}
                  placeholder="Comparte tus pensamientos..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCrearPublicacion}
                disabled={guardando}
                className="flex-1 px-6 py-3 text-white rounded-lg disabled:bg-gray-400 transition-colors font-semibold"
                style={{ 
                  backgroundColor: guardando ? undefined : COLORS.azul,
                }}
                onMouseEnter={(e) => {
                  if (guardando) return;
                  e.currentTarget.style.backgroundColor = COLORS.azul_semi;
                }}
                onMouseLeave={(e) => {
                  if (guardando) return;
                  e.currentTarget.style.backgroundColor = COLORS.azul;
                }}
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
                className="px-6 py-3 rounded-lg transition-colors font-semibold"
                style={{ 
                  backgroundColor: COLORS.gris_claro,
                  color: COLORS.texto_oscuro
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.gris_medio}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.gris_claro}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de comentarios */}
      {publicacionSeleccionada && (
        <ComentariosModal
          isOpen={isComentariosModalOpen}
          onClose={() => {
            setIsComentariosModalOpen(false);
            setPublicacionSeleccionada(null);
            setComentarios([]);
          }}
          publicacionTitulo={publicacionSeleccionada.titulo}
          comentarios={comentarios}
          onEnviarComentario={handleEnviarComentario}
          loading={loadingComentarios}
        />
      )}
    </div>
  );
};
