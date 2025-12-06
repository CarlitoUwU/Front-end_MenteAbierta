// ==============================
// TIPOS DE AUTENTICACIÓN
// ==============================

export interface Usuario {
  id: string;
  email: string;
  seudonimo?: string;
  is_active: boolean;
  date_joined: string;
}

export interface RegisterData {
  email: string;
  password: string;
  seudonimo?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    email: string;
    seudonimo?: string;
  };
  access: string;
  refresh: string;
}

// ==============================
// TIPOS DE DIARIO EMOCIONAL
// ==============================

export type HumorLevel = 1 | 2 | 3 | 4 | 5;

export interface DiarioEntry {
  id?: string;
  usuario?: string;
  usuario_seudonimo?: string;
  titulo: string;
  contenido: string;
  humor: HumorLevel;
  fecha_entrada?: string;
}

// ==============================
// TIPOS DE REGISTRO DE EMOCIONES
// ==============================

export type TipoEmocion = 'FELIZ' | 'TRANQUILO' | 'NEUTRAL' | 'ANSIOSO' | 'TRISTE' | 'ENOJADO';

export interface RegistroEmocion {
  id?: number;
  emocion: TipoEmocion;
  intensidad: number; // 1-10
  nota?: string;
  fecha_registro?: string;
}

// ==============================
// TIPOS DE CUESTIONARIOS
// ==============================

export interface Pregunta {
  id: number;
  texto: string;
  orden: number;
  tipo_pregunta: 'ESCALA' | 'SELECCION' | 'BOOLEAN' | 'TEXTO';
}

export interface Cuestionario {
  id: number;
  nombre: string;
  descripcion?: string;
  tiempo_estimado: string;
  preguntas: Pregunta[];
}

export interface RespuestaUsuario {
  id?: number;
  pregunta: number;
  valor_respuesta: number;
  fecha_respuesta?: string;
}

// ==============================
// TIPOS DE EJERCICIOS
// ==============================

export type CategoriaEjercicio = 'RESPIRACION' | 'RELAJACION' | 'MINDFULNESS' | 'MOVIMIENTO';
export type TipoIcono = 'VIENTO' | 'CORAZON' | 'LUNA' | 'SOL';

export interface Ejercicio {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: CategoriaEjercicio;
  icono: TipoIcono;
  duracion: number; // en minutos
  instrucciones: string;
  media_url?: string;
}

export interface EjercicioCompletado {
  id?: number;
  ejercicio: number;
  fecha_completado?: string;
}

// ==============================
// TIPOS DE FORO
// ==============================

export type CategoriaForo = 'ANSIEDAD' | 'BIENESTAR' | 'RELACIONES' | 'ESTRES' | 'GENERAL';

export interface Publicacion {
  id: number;
  autor_seudonimo: string;
  titulo: string;
  contenido: string;
  categoria: CategoriaForo;
  fecha_creacion: string;
  num_likes: number;
  num_comentarios: number;
  ya_di_like: boolean;
}

export interface Comentario {
  id: number;
  autor_seudonimo: string;
  contenido: string;
  fecha_creacion: string;
}

// ==============================
// TIPOS DE CONTENIDO
// ==============================

export type CategoriaArticulo = 'ANSIEDAD' | 'ESTRES' | 'SUENO' | 'RELACIONES' | 'AUTOCUIDADO' | 'GENERAL';

export interface Articulo {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: CategoriaArticulo;
  imagen_url?: string;
  tiempo_lectura: string;
  fecha_publicacion: string;
}

// ==============================
// TIPOS DE TIPS
// ==============================

export type CategoriaTip = 'DIARIO' | 'ESTRES' | 'SUENO' | 'BIENESTAR';

export interface Tip {
  id: number;
  titulo: string;
  contenido: string;
  categoria: CategoriaTip;
}
