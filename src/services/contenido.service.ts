import { api } from './api';
import type { Articulo, CategoriaArticulo } from '../types';

export const contenidoService = {
  /**
   * Obtener todos los artículos (con filtro opcional por categoría)
   */
  async getArticulos(categoria?: CategoriaArticulo): Promise<Articulo[]> {
    const params = categoria ? `?categoria=${categoria}` : '';
    const response = await api.get<Articulo[]>(`/contenido/articulos/${params}`);
    return response.data;
  },

  /**
   * Obtener un artículo específico
   */
  async getArticulo(id: number): Promise<Articulo> {
    const response = await api.get<Articulo>(`/contenido/articulos/${id}/`);
    return response.data;
  },
};
