import { api } from './api';
import type { RegisterData, LoginData, AuthResponse, Usuario } from '../types';

export const authService = {
  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/registro/', data);
    
    // Guardar tokens en localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },

  /**
   * Iniciar sesión
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login/', data);
    
    // Guardar tokens
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    // Obtener y guardar perfil completo del usuario
    try {
      const userProfile = await this.getProfile();
      localStorage.setItem('user', JSON.stringify(userProfile));
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
    
    return response.data;
  },

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<Usuario> {
    const response = await api.get<Usuario>('/user/me/');
    return response.data;
  },

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Obtener datos del usuario actual desde localStorage
   */
  getCurrentUser(): Usuario | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Obtener el token de acceso
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  },
};
