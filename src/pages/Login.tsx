import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [clientCode, setClientCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = login(clientCode.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Identifiants invalides.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <img src={`${import.meta.env.BASE_URL}logo-dark.svg`} alt="SYN&ZYN" className="h-20 w-auto" />
            </div>
            <h1 className="font-courier text-2xl text-brand-dark uppercase tracking-brand-wide">
              Espace client
            </h1>
            <p className="font-courier text-xs text-brand-taupe tracking-brand mt-1">
              Portail B2B SYN+ZYN
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide block mb-1.5">
                Code client
              </label>
              <input
                type="text"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                placeholder="Ex: DEMO-2024-003"
                className="input-field text-sm font-courier tracking-brand"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide block mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="input-field text-sm pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-taupe hover:text-brand-dark"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 px-3 py-2.5">
                <AlertCircle size={13} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="font-courier text-xs text-red-600 tracking-brand">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-brand-cream-dark border border-brand-beige px-4 py-3">
            <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
              <strong className="text-brand-dark">Démo:</strong> Code: <span className="text-brand-dark">DEMO-2024-003</span> — Mot de passe: <span className="text-brand-dark">demo123</span>
            </p>
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="font-courier text-xs text-brand-taupe tracking-brand">
              Pas encore client ?{' '}
              <Link to="/register" className="text-brand-dark hover:underline uppercase">
                Créer un compte B2B
              </Link>
            </p>
            <p className="font-courier text-xs text-brand-taupe tracking-brand">
              Besoin d'aide ?{' '}
              <Link to="/contact" className="text-brand-dark hover:underline uppercase">
                Nous contacter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
