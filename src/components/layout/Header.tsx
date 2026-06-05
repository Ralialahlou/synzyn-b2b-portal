import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { label: 'CATALOGUE', href: '/catalogue' },
  { label: 'FORMATION', href: '/training' },
  { label: 'FAQ', href: '/faq' },
  { label: 'NOUS CONTACTER', href: '/contact' },
];

export default function Header() {
  const { isLoggedIn, client, logout } = useAuth();
  const { totalItems, setCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className="bg-brand-dark text-brand-cream sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-brand-taupe/20 text-xs font-courier text-brand-beige text-center py-1.5 tracking-brand hidden md:block">
        BIENVENUE À NOS CLIENTS B2B — LIVRAISON 5-7 JOURS OUVRÉS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={`${import.meta.env.BASE_URL}logo-light.png`} alt="SYN+ZYN" className="h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-courier text-xs tracking-brand-wide hover:text-brand-beige transition-colors ${
                  location.pathname === link.href ? 'text-brand-beige' : 'text-brand-cream/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-brand-cream/70 hover:text-brand-cream transition-colors"
              aria-label="Rechercher"
            >
              <Search size={18} />
            </button>

            {/* Cart */}
            {isLoggedIn && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-brand-cream/80 hover:text-brand-cream transition-colors"
                aria-label="Panier"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-brand-rose text-white rounded-full text-[11px] font-bold flex items-center justify-center px-1 leading-none shadow-md ring-2 ring-brand-dark">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            )}

            {/* User menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-brand-cream/80 hover:text-brand-cream transition-colors"
                >
                  <div className="w-8 h-8 bg-brand-taupe rounded-full flex items-center justify-center">
                    <span className="font-courier text-sm font-semibold text-brand-cream">
                      {client?.companyName.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:block font-courier text-xs tracking-brand max-w-[120px] truncate">
                    {client?.companyName}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-xl border border-brand-beige z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-sm font-courier text-brand-dark hover:bg-brand-cream tracking-brand uppercase"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mon compte
                    </Link>
                    <Link
                      to="/dashboard/orders"
                      className="block px-4 py-3 text-sm font-courier text-brand-dark hover:bg-brand-cream tracking-brand uppercase"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mes commandes
                    </Link>
                    <Link
                      to="/dashboard/contract"
                      className="block px-4 py-3 text-sm font-courier text-brand-dark hover:bg-brand-cream tracking-brand uppercase"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mon contrat
                    </Link>
                    <div className="border-t border-brand-beige" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-courier text-brand-rose hover:bg-brand-cream tracking-brand uppercase"
                    >
                      <LogOut size={14} />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 font-courier text-xs tracking-brand-wide text-brand-cream/80 hover:text-brand-cream transition-colors"
              >
                <User size={18} />
                <span className="hidden sm:inline uppercase">Connexion</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 text-brand-cream/80 hover:text-brand-cream"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar — slides down when open */}
        {searchOpen && (
          <div className="border-t border-brand-taupe/20 py-3">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit, catégorie..."
                  className="w-full bg-brand-taupe/10 border border-brand-taupe/30 text-brand-cream placeholder-brand-taupe/60 px-4 py-2.5 pl-9 font-courier text-sm focus:outline-none focus:border-brand-beige"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn-outline-light px-5 py-2.5 text-xs">
                Rechercher
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-brand-taupe hover:text-brand-cream p-2">
                <X size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden bg-brand-dark border-t border-brand-taupe/30">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-3 pb-3 border-b border-brand-taupe/20">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full bg-brand-taupe/10 border border-brand-taupe/30 text-brand-cream placeholder-brand-taupe/60 px-4 py-2 pl-8 font-courier text-sm focus:outline-none"
                />
              </div>
              <button type="submit" className="text-brand-cream/80 hover:text-brand-cream p-1">
                <Search size={18} />
              </button>
            </form>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-3 font-courier text-sm tracking-brand-wide text-brand-cream/80 hover:text-brand-cream border-b border-brand-taupe/20 uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className="block py-3 font-courier text-sm tracking-brand-wide text-brand-cream/80 hover:text-brand-cream uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Mon compte
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="block py-3 font-courier text-sm tracking-brand-wide text-brand-rose uppercase"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
