import { api } from './api';
import type { Publicacion, Comentario, CategoriaForo } from '../types';

export const foroService = {
  /**
   * Obtener todas las publicaciones (con filtro opcional por categoría)
   */
  async getPublicaciones(categoria?: CategoriaForo): Promise<Publicacion[]> {
    const params = categoria ? `?categoria=${categoria}` : '';
    const response = await api.get<Publicacion[]>(`/foro/publicaciones/${params}`);
    return response.data;
  },

  /**
   * Obtener una publicación específica
   */
  async getPublicacion(id: number): Promise<Publicacion> {
    const response = await api.get<Publicacion>(`/foro/publicaciones/${id}/`);
    return response.data;
  },

  /**
   * Crear una nueva publicación
   */
  async crear(data: { titulo: string; contenido: string; categoria: CategoriaForo }): Promise<Publicacion> {
    const response = await api.post<Publicacion>('/foro/publicaciones/', data);
    return response.data;
  },

  /**
   * Eliminar una publicación
   */
  async eliminar(id: number): Promise<void> {
    await api.delete(`/foro/publicaciones/${id}/`);
  },

  /**
   * Comentar en una publicación
   */
  async comentar(id: number, contenido: string): Promise<Comentario> {
    const response = await api.post<Comentario>(`/foro/publicaciones/${id}/comentar/`, {
      contenido,
    });
    return response.data;
  },

  /**
   * Toggle like en una publicación
   */
  async toggleLike(id: number): Promise<{ liked: boolean; total_likes: number }> {
    const response = await api.post<{ liked: boolean; total_likes: number }>(
      `/foro/publicaciones/${id}/like/`
    );
    return response.data;
  },
};
