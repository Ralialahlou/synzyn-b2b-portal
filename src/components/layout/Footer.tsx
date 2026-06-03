import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-cream mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo-light.png" alt="SYN&ZYN" className="h-16 w-auto" />
            </div>
            <p className="font-courier text-brand-taupe text-xs leading-relaxed tracking-brand mb-4">
              simply you.<br />
              for all people. everyday.
            </p>
            <p className="font-courier text-xs text-brand-taupe/70 leading-relaxed tracking-brand mb-4 max-w-xs">
              SYN+ZYN crée des produits de beauté qui combinent performance, qualité et accessibilité — redéfinissant ce que peut signifier "accessible".
            </p>
            <div className="space-y-1 text-xs text-brand-taupe font-courier">
              <p>commercial@synzyn.ma</p>
              <p>+212 522 100 200</p>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="font-courier text-xs tracking-brand-wide uppercase text-brand-beige mb-4">Catalogue</h4>
            <ul className="space-y-2.5">
              {['Skincare', 'Makeup', 'Soins corps', 'Soins cheveux', 'Solaire', 'Gamme PRO'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/catalogue?category=${cat.toLowerCase().replace(' ', '-')}`}
                    className="font-courier text-xs text-brand-taupe hover:text-brand-cream transition-colors tracking-brand"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Espace Client */}
          <div>
            <h4 className="font-courier text-xs tracking-brand-wide uppercase text-brand-beige mb-4">Espace Client</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Mon tableau de bord', href: '/dashboard' },
                { label: 'Mes commandes', href: '/dashboard/orders' },
                { label: 'Mon contrat', href: '/dashboard/contract' },
                { label: 'Mes factures', href: '/dashboard/invoices' },
                { label: 'Formation', href: '/training' },
                { label: 'Devenir client B2B', href: '/register' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-courier text-xs text-brand-taupe hover:text-brand-cream transition-colors tracking-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos + Support */}
          <div>
            <h4 className="font-courier text-xs tracking-brand-wide uppercase text-brand-beige mb-4">À propos</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: 'Notre histoire', href: '/about' },
                { label: 'Vision & Mission', href: '/about#vision' },
                { label: 'Nos valeurs', href: '/about#values' },
                { label: 'Notre gamme', href: '/about#range' },
                { label: 'Groupe AKSAL', href: '/about#company' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-courier text-xs text-brand-taupe hover:text-brand-cream transition-colors tracking-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-courier text-xs tracking-brand-wide uppercase text-brand-beige mb-3">Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'FAQ', href: '/faq' },
                { label: 'Nous contacter', href: '/contact' },
                { label: 'CGV', href: '/cgv' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-courier text-xs text-brand-taupe hover:text-brand-cream transition-colors tracking-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-taupe/30 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-courier text-xs text-brand-taupe/60 tracking-brand">
            © 2025 SYN+ZYN — Tous droits réservés. Une marque du Groupe AKSAL.
          </p>
          <p className="font-courier text-xs text-brand-taupe/60 tracking-brand">
            KAK SYNERGY SA — IF: 52426360 — RC: 542021 — ICE: 003043488000053
          </p>
        </div>
      </div>
    </footer>
  );
}
