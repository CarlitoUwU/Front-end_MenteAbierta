import { api } from './api';
import type { DiarioEntry } from '../types';

export const diarioService = {
  /**
   * Obtener todas las entradas del diario del usuario autenticado
   */
  async getAll(): Promise<DiarioEntry[]> {
    const response = await api.get<DiarioEntry[]>('/diario/');
    return response.data;
  },

  /**
   * Crear una nueva entrada en el diario
   */
  async create(data: Omit<DiarioEntry, 'id' | 'fecha_entrada' | 'usuario' | 'usuario_seudonimo'>): Promise<DiarioEntry> {
    const response = await api.post<DiarioEntry>('/diario/', data);
    return response.data;
  },

  /**
   * Obtener una entrada específica por ID
   */
  async getById(id: string): Promise<DiarioEntry> {
    const response = await api.get<DiarioEntry>(`/diario/${id}/`);
    return response.data;
  },

  /**
   * Actualizar una entrada existente
   */
  async update(id: string, data: Partial<DiarioEntry>): Promise<DiarioEntry> {
    const response = await api.put<DiarioEntry>(`/diario/${id}/`, data);
    return response.data;
  },

  /**
   * Eliminar una entrada del diario
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/diario/${id}/`);
  },
};
