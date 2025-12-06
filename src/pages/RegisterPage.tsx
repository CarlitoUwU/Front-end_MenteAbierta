import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { RoutesEnum } from '../utils/routes';
import { authService } from '../services/auth.service';
import { COLORS } from '../constants/colors';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [seudonimo, setSeudonimo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        email,
        password,
        seudonimo: seudonimo || undefined,
      });
      navigate(RoutesEnum.DASHBOARD);
    } catch (err: any) {
      const errorMessage = err.response?.data?.email?.[0] || 
                          err.response?.data?.password?.[0] ||
                          'Error al registrarse. Intenta de nuevo.';
      setError(errorMessage);
      console.error('Error en registro:', err);
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
          Registrarse con Google
        </button>

        <div className="text-center text-gray-500 text-sm mb-6">O regístrate con tu correo</div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium" style={{ color: COLORS.texto_medio }}>Correo electrónico *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: COLORS.gris_claro,
                color: COLORS.texto_oscuro
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.azul;
                e.currentTarget.style.outline = `2px solid ${COLORS.azul}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.gris_claro;
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: COLORS.texto_medio }}>Alias (opcional)</label>
            <input
              type="text"
              value={seudonimo}
              onChange={(e) => setSeudonimo(e.target.value)}
              placeholder="¿Cómo te gustaría que te llamemos?"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: COLORS.gris_claro,
                color: COLORS.texto_oscuro
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.azul;
                e.currentTarget.style.outline = `2px solid ${COLORS.azul}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.gris_claro;
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: COLORS.texto_medio }}>Contraseña *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mínimo 8 caracteres"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: COLORS.gris_claro,
                color: COLORS.texto_oscuro
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.azul;
                e.currentTarget.style.outline = `2px solid ${COLORS.azul}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.gris_claro;
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: COLORS.texto_medio }}>Confirmar contraseña *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Repite tu contraseña"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: COLORS.gris_claro,
                color: COLORS.texto_oscuro
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.azul;
                e.currentTarget.style.outline = `2px solid ${COLORS.azul}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.gris_claro;
                e.currentTarget.style.outline = 'none';
              }}
            />
          </div>

          <div className="flex items-center gap-2 text-sm mt-2">
            <input 
              type="checkbox" 
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4" 
            />
            <span style={{ color: COLORS.texto_medio }}>
              Acepto los
              <a href="#" className="ml-1 underline hover:brightness-110" style={{ color: COLORS.azul }}>
                Términos y Condiciones
              </a>
              y la
              <a href="#" className="ml-1 underline hover:brightness-110" style={{ color: COLORS.azul }}>
                Política de Privacidad
              </a>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-xl font-semibold mt-2 transition ${
              isLoading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿Ya tienes cuenta?
          <a href={RoutesEnum.LOGIN} className="text-purple-600 font-semibold hover:underline ml-1">
            Inicia sesión
          </a>
        </p>

        <p className="text-[10px] text-gray-400 text-center mt-6">
          Tus datos están protegidos y encriptados. Respetamos tu privacidad.
        </p>
      </div>
    </div>
  );
}