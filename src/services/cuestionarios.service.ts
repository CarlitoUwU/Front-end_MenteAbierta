import { api } from './api';
import type { Cuestionario, RespuestaUsuario } from '../types';

export const cuestionariosService = {
  /**
   * Obtener todos los cuestionarios activos
   */
  async getAll(): Promise<Cuestionario[]> {
    const response = await api.get<Cuestionario[]>('/cuestionarios/');
    return response.data;
  },

  /**
   * Responder una pregunta de un cuestionario
   */
  async responder(data: Omit<RespuestaUsuario, 'id' | 'fecha_respuesta'>): Promise<RespuestaUsuario> {
    const response = await api.post<RespuestaUsuario>('/cuestionarios/responder/', data);
    return response.data;
  },
};
