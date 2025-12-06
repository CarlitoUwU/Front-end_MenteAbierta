import { api } from './api';
import type { Tip } from '../types';

export const tipsService = {
  /**
   * Obtener todos los tips
   */
  async getAll(categoria?: string): Promise<Tip[]> {
    const params = categoria && categoria !== 'TODOS' ? `?categoria=${categoria}` : '';
    const response = await api.get<Tip[]>(`/tips/${params}`);
    return response.data;
  },

  /**
   * Obtener el tip del día
   */
  async getTipDelDia(): Promise<Tip> {
    const response = await api.get<Tip>('/tips/dia/');
    return response.data;
  },
};
