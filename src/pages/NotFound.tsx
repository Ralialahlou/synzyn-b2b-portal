import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo mark */}
        <div className="mb-8 flex justify-center">
          <img src={`${import.meta.env.BASE_URL}logo-dark.svg`} alt="SYN&ZYN" className="h-24 w-auto opacity-20" />
        </div>

        <p className="font-courier text-brand-taupe text-xs tracking-brand-wider uppercase mb-3">
          Erreur 404
        </p>
        <h1 className="font-courier text-4xl md:text-5xl text-brand-dark tracking-brand-wide uppercase mb-4">
          Page<br />introuvable
        </h1>
        <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
          Retournez à l'accueil ou parcourez notre catalogue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/catalogue" className="btn-secondary">
            Voir le catalogue
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-beige">
          <p className="font-courier text-xs text-brand-taupe tracking-brand mb-3 uppercase">
            Liens utiles
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: 'Contact', href: '/contact' },
              { label: 'Formation', href: '/training' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Mon compte', href: '/dashboard' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand transition-colors"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
