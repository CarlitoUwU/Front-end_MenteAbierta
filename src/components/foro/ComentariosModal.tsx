import { useState } from "react";
import { MdClose, MdSend } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { COLORS } from "../../constants/colors";
import type { Comentario } from "../../types";

type ComentariosModalProps = {
  isOpen: boolean;
  onClose: () => void;
  publicacionTitulo: string;
  comentarios: Comentario[];
  onEnviarComentario: (contenido: string) => Promise<void>;
  loading: boolean;
};

export const ComentariosModal = ({
  isOpen,
  onClose,
  publicacionTitulo,
  comentarios,
  onEnviarComentario,
  loading,
}: ComentariosModalProps) => {
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!isOpen) return null;

  const handleEnviar = async () => {
    if (!nuevoComentario.trim()) return;

    setEnviando(true);
    try {
      await onEnviarComentario(nuevoComentario);
      setNuevoComentario("");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FiMessageCircle className="text-2xl" style={{ color: COLORS.azul }} />
            <h2 className="text-xl font-bold" style={{ color: COLORS.texto_oscuro }}>Comentarios</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdClose className="text-2xl" style={{ color: COLORS.texto_medio }} />
          </button>
        </div>

        {/* Título de la publicación */}
        <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: COLORS.azul_claro }}>
          <p className="text-sm mb-1" style={{ color: COLORS.texto_medio }}>Publicación:</p>
          <h3 className="font-semibold" style={{ color: COLORS.texto_oscuro }}>{publicacionTitulo}</h3>
        </div>

        {/* Lista de comentarios */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Cargando comentarios...</p>
            </div>
          ) : comentarios.length === 0 ? (
            <div className="text-center py-8">
              <FiMessageCircle className="text-5xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay comentarios aún</p>
              <p className="text-sm text-gray-400 mt-1">Sé el primero en comentar</p>
            </div>
          ) : (
            comentarios.map((comentario) => (
              <div
                key={comentario.id}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
                    style={{
                      backgroundColor: COLORS.azul_claro,
                      color: COLORS.azul_oscuro,
                    }}
                  >
                    {comentario.autor_seudonimo?.substring(0, 2).toUpperCase() || "AN"}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">
                      {comentario.autor_seudonimo || "Anónimo"}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(comentario.fecha_creacion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed ml-11">
                  {comentario.contenido}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Input para nuevo comentario */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <textarea
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe un comentario..."
              rows={3}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              disabled={enviando}
            />
            <button
              onClick={handleEnviar}
              disabled={!nuevoComentario.trim() || enviando}
              className="px-6 py-3 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2 h-fit"
              style={{ 
                backgroundColor: !nuevoComentario.trim() || enviando ? undefined : COLORS.azul,
              }}
              onMouseEnter={(e) => {
                if (!nuevoComentario.trim() || enviando) return;
                e.currentTarget.style.backgroundColor = COLORS.azul_semi;
              }}
              onMouseLeave={(e) => {
                if (!nuevoComentario.trim() || enviando) return;
                e.currentTarget.style.backgroundColor = COLORS.azul;
              }}
            >
              <MdSend />
              {enviando ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
