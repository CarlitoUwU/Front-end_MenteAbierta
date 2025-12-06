import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { RoutesEnum } from '../utils/routes';
import { authService } from '../services/auth.service';

export const LoginPage = () => {
  const navigate = useNavigate();

  // 1. ESTADOS: Para guardar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. FUNCIÓN DE ENVÍO: Se ejecuta al dar click en "Iniciar sesión"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      navigate(RoutesEnum.DASHBOARD);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(errorMessage);
      console.error('Error en login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5cf] p-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-7" >
          <img
            src={logo}
            alt="Logo MenteAbierta"
            className="w-12 h-12" // Ajusté un poco el tamaño por si acaso
          />
          <h1 className="text-3xl font-bold text-green-700">MenteAbierta</h1>
        </div>
        <p className="text-gray-700 mt-1">Bienvenido de vuelta</p>
      </div>

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <button className="w-full border rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-6">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continuar con Google
        </button>

        <div className="text-center text-gray-500 text-sm mb-6">O continúa con tu correo</div>

        {/* Muestra mensaje de error si existe */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 text-sm">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Captura lo que escribes
              required
              placeholder="tu@email.com"
              className="mt-1 w-full border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Captura lo que escribes
              required
              className="mt-1 w-full border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <a href="#" className="text-xs text-purple-600 mt-1 inline-block hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-xl font-semibold mt-2 transition ${
              isLoading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿No tienes cuenta?
          <a href={RoutesEnum.REGISTER} className="text-purple-600 font-semibold hover:underline ml-1">
            Regístrate
          </a>
        </p>

        <p className="text-[10px] text-gray-400 text-center mt-6">
          Al continuar, aceptas nuestros <span className="underline">Términos y Condiciones</span> y
          <span className="underline ml-1">Política de Privacidad</span>
        </p>
      </div>
    </div>
  );
}