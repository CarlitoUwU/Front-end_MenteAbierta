import { api } from './api';
import type { Ejercicio, EjercicioCompletado } from '../types';

export const ejerciciosService = {
  /**
   * Obtener todos los ejercicios disponibles
   */
  async getAll(): Promise<Ejercicio[]> {
    const response = await api.get<Ejercicio[]>('/ejercicios/');
    return response.data;
  },

  /**
   * Marcar un ejercicio como completado
   */
  async completar(ejercicioId: number): Promise<EjercicioCompletado> {
    const response = await api.post<EjercicioCompletado>('/ejercicios/completar/', {
      ejercicio: ejercicioId,
    });
    return response.data;
  },
};
