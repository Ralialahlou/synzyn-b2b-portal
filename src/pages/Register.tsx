import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Building2, Phone, Mail, FileText } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

type ClientType = 'pharmacy' | 'retail' | 'spa' | 'clinic' | 'distributor' | '';

const CLIENT_TYPES = [
  { value: 'pharmacy', label: 'Pharmacie' },
  { value: 'retail', label: 'Grande surface / Retail' },
  { value: 'spa', label: 'Spa / Institut de beauté' },
  { value: 'clinic', label: 'Clinique / Cabinet médical' },
  { value: 'distributor', label: 'Distributeur / Grossiste' },
];

export default function Register() {
  useSEO({
    title: 'Devenir client B2B | SYN+ZYN',
    description: 'Rejoignez les pharmacies, revendeurs et spas partenaires SYN+ZYN. Créez votre compte B2B et accédez à nos tarifs professionnels, MOQ et conditions personnalisées.',
    canonical: '/register',
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    type: '' as ClientType,
    ice: '',
    message: '',
  });

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-brand-beige p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="font-courier text-xl text-brand-dark tracking-brand-wide uppercase mb-3">
            Demande envoyée
          </h2>
          <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed mb-2">
            Votre demande d'accès B2B a bien été reçue.
          </p>
          <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed mb-6">
            Un commercial SYN+ZYN vous contactera sous <strong className="text-brand-dark">2-3 jours ouvrés</strong> pour
            étudier votre dossier et établir votre contrat personnalisé.
          </p>
          <Link to="/" className="btn-primary inline-block">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-dark py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-courier text-brand-taupe text-xs tracking-brand-wider uppercase mb-2">
            Portail B2B
          </p>
          <h1 className="font-courier text-3xl text-brand-cream tracking-brand-wide uppercase">
            Devenir client B2B
          </h1>
          <p className="font-courier text-brand-taupe text-xs tracking-brand mt-2 max-w-xl">
            Remplissez ce formulaire pour demander votre accès au portail B2B SYN+ZYN.
            Un commercial vous contactera pour finaliser votre contrat.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: FileText, label: 'Prix contractualisés' },
            { icon: Building2, label: 'MOQ adaptés' },
            { icon: Phone, label: 'Commercial dédié' },
            { icon: Mail, label: 'Support prioritaire' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 bg-white border border-brand-beige p-4 text-center">
              <Icon size={18} className="text-brand-taupe" />
              <span className="font-courier text-xs text-brand-taupe uppercase tracking-brand">{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-brand-beige p-6 md:p-8 space-y-5">
          <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide border-b border-brand-beige pb-3 mb-2">
            Informations de votre entreprise
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
                Nom de l'entreprise *
              </label>
              <input type="text" value={form.companyName} onChange={update('companyName')} required className="input-field text-sm" placeholder="Pharma Plus Casablanca" />
            </div>
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
                Type de structure *
              </label>
              <select value={form.type} onChange={update('type')} required className="input-field text-sm font-courier">
                <option value="">Sélectionner...</option>
                {CLIENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
                Nom du contact *
              </label>
              <input type="text" value={form.contactName} onChange={update('contactName')} required className="input-field text-sm" placeholder="Dr. Hassan Ouali" />
            </div>
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
                Ville *
              </label>
              <input type="text" value={form.city} onChange={update('city')} required className="input-field text-sm" placeholder="Casablanca" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
                Email professionnel *
              </label>
              <input type="email" value={form.email} onChange={update('email')} required className="input-field text-sm" placeholder="contact@votreentreprise.ma" />
            </div>
            <div>
              <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
                Téléphone *
              </label>
              <input type="tel" value={form.phone} onChange={update('phone')} required className="input-field text-sm" placeholder="+212 6XX XXX XXX" />
            </div>
          </div>

          <div>
            <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
              ICE / RC (optionnel)
            </label>
            <input type="text" value={form.ice} onChange={update('ice')} className="input-field text-sm" placeholder="Votre numéro ICE ou RC" />
          </div>

          <div>
            <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
              Message / Informations complémentaires
            </label>
            <textarea
              value={form.message}
              onChange={update('message')}
              rows={4}
              className="input-field text-sm resize-none"
              placeholder="Décrivez votre activité, les produits qui vous intéressent, vos besoins spécifiques..."
            />
          </div>

          <div className="bg-brand-cream border border-brand-beige px-4 py-3">
            <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
              En soumettant ce formulaire, vous acceptez d'être contacté par l'équipe commerciale SYN+ZYN.
              Votre demande sera traitée sous 2-3 jours ouvrés.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full py-3.5">
            Envoyer ma demande d'accès B2B
          </button>
        </form>

        <p className="text-center font-courier text-xs text-brand-taupe tracking-brand mt-6">
          Déjà client ?{' '}
          <Link to="/login" className="text-brand-dark hover:underline uppercase">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
