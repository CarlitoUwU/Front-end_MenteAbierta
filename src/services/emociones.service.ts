import { api } from './api';
import type { RegistroEmocion } from '../types';

export const emocionesService = {
  /**
   * Registrar una nueva emoción
   */
  async registrar(data: Omit<RegistroEmocion, 'id' | 'fecha_registro'>): Promise<RegistroEmocion> {
    const response = await api.post<RegistroEmocion>('/emociones/', data);
    return response.data;
  },
};
