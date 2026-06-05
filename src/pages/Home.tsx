import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, FileText, HeadphonesIcon, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { useSEO } from '../hooks/useSEO';

const CATEGORIES = [
  { id: 'skincare', label: 'Skincare', color: '#D9A9B1', count: 4 },
  { id: 'makeup', label: 'Makeup', color: '#C27279', count: 4 },
  { id: 'body-care', label: 'Body Care', color: '#D0B9AB', count: 2 },
  { id: 'hair-care', label: 'Hair Care', color: '#B8ABD0', count: 2 },
  { id: 'sun-care', label: 'Sun Care', color: '#A28B83', count: 1 },
];

const FEATURES = [
  { icon: Shield, title: 'PRODUITS CERTIFIÉS', desc: 'Formulations testées dermatologiquement, conformes aux standards internationaux.' },
  { icon: Truck, title: 'LIVRAISON B2B', desc: 'Livraison 3 à 7 jours ouvrés partout au Maroc. Commande min. 20 000 MAD.' },
  { icon: FileText, title: 'CONTRAT PERSONNALISÉ', desc: 'Prix négociés, MOQ adaptés et conditions de paiement selon votre profil.' },
  { icon: HeadphonesIcon, title: 'SUPPORT COMMERCIAL', desc: 'Un commercial dédié disponible par email et WhatsApp pour chaque client.' },
];

const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

export default function Home() {
  useSEO({
    title: 'SYN+ZYN B2B | Portail Professionnel Beauté Maroc',
    description: 'Portail B2B SYN+ZYN — Catalogue produits beauté professionnels pour pharmacies, revendeurs, spas et cliniques. Skincare, makeup, soins corps et cheveux. Groupe AKSAL.',
    canonical: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Catalogue SYN+ZYN B2B',
      'description': 'Produits de beauté professionnels disponibles sur le portail B2B SYN+ZYN',
      'url': 'https://b2b.synzyn.ma/catalogue',
    },
  });

  const { isLoggedIn, client } = useAuth();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-brand-dark relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Subtle background watermark */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute font-courier text-brand-cream font-bold tracking-brand-wider"
              style={{ fontSize: '14vw', top: `${(i % 2) * 50}%`, left: `${(i % 2) * 30}%`, transform: 'rotate(-12deg)', whiteSpace: 'nowrap' }}
            >
              SYN+ZYN
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Banner / product visual */}
            <div className="relative flex items-center justify-center order-2 md:order-1">
              {/* Outer frame */}
              <div className="relative w-full max-w-sm mx-auto">
                {/* Main banner card */}
                <div
                  className="relative w-full aspect-[3/4] overflow-hidden shadow-2xl"
                  style={{ backgroundColor: '#D0B9AB' }}
                >
                  {/* Grid of color blocks simulating a lifestyle flat-lay */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-px opacity-60">
                    {['#D9A9B1','#A28B83','#B8ABD0','#D0B9AB','#C27279','#A28B83'].map((c, i) => (
                      <div key={i} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/50 via-transparent to-brand-dark/30" />

                  {/* Central product stack */}
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="flex gap-3 items-end">
                      {[
                        { color: '#D9A9B1', h: 'h-36', label: 'SERUM' },
                        { color: '#3F3132', h: 'h-48', label: 'CREAM' },
                        { color: '#C27279', h: 'h-32', label: 'LIP' },
                      ].map(({ color, h, label }) => (
                        <div key={label} className={`w-14 ${h} shadow-xl relative rounded-sm`} style={{ backgroundColor: color }}>
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-7 border border-white/30 flex items-center justify-center">
                            <span className="font-courier text-[5px] text-white/70 leading-none text-center">SYN<br />ZYN</span>
                          </div>
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <span className="font-courier text-[6px] text-white/70 tracking-wider uppercase">{label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top label */}
                  <div className="absolute top-5 left-5" aria-hidden="true">
                    <div className="font-courier text-xs text-white/60 uppercase tracking-brand-wider">Collection</div>
                    <div className="font-courier text-base text-white uppercase tracking-brand-wide leading-tight">
                      SYN+ZYN<br />2025
                    </div>
                  </div>

                  {/* Bottom tagline */}
                  <div className="absolute bottom-5 left-5 right-5 border-t border-white/20 pt-3" aria-hidden="true">
                    <div className="font-courier text-xs text-white/80 italic tracking-brand">simply you.</div>
                    <div className="font-courier text-xs text-white/50 tracking-brand mt-0.5">for all people. everyday.</div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-brand-rose flex items-center justify-center shadow-lg" aria-hidden="true">
                  <div className="text-center">
                    <div className="font-courier text-[7px] text-white uppercase tracking-wider leading-tight">200+<br />Réf.</div>
                  </div>
                </div>

                {/* Floating cert badge */}
                <div className="absolute -bottom-3 -left-3 bg-white border border-brand-beige px-3 py-2 shadow-lg">
                  <div className="font-courier text-xs text-brand-muted uppercase tracking-brand">Certifié</div>
                  <div className="font-courier text-xs text-brand-dark">ISO 22716</div>
                </div>
              </div>
            </div>

            {/* RIGHT — Text content */}
            <div className="order-1 md:order-2">
              {isLoggedIn ? (
                <>
                  <div className="inline-flex items-center gap-2 bg-brand-taupe/20 border border-brand-taupe/40 px-3 py-1.5 mb-6">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="font-courier text-xs text-brand-beige tracking-brand-wide uppercase">
                      Connecté — {client?.companyName}
                    </span>
                  </div>
                  <h1 className="font-courier text-4xl sm:text-5xl md:text-6xl text-brand-cream leading-tight tracking-brand">
                    BIENVENUE,<br />
                    <span className="text-brand-beige">{client?.companyName.split(' ')[0].toUpperCase()}</span>
                  </h1>
                  <p className="font-courier text-brand-beige text-sm mt-4 leading-relaxed tracking-brand">
                    Accédez à votre catalogue contractualisé, passez vos commandes
                    et gérez votre compte professionnel.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link to="/catalogue" className="btn-outline-light inline-flex items-center justify-center gap-2">
                      Mon catalogue <ArrowRight size={14} />
                    </Link>
                    <Link to="/dashboard" className="btn-secondary border-brand-beige text-brand-beige hover:bg-brand-beige hover:text-brand-dark inline-flex items-center justify-center gap-2">
                      Mon compte
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-courier text-brand-beige text-xs tracking-brand-wider uppercase mb-4">
                    Bienvenue à nos clients B2B
                  </p>
                  <h1 className="font-courier text-4xl sm:text-5xl md:text-6xl text-brand-cream leading-tight tracking-brand">
                    SIMPLY<br />
                    <span className="text-brand-beige">YOU.</span>
                  </h1>
                  <p className="font-courier text-brand-beige text-sm mt-4 leading-relaxed tracking-brand">
                    Des produits de beauté de qualité premium pour vos clients.
                    Découvrez notre catalogue B2B et rejoignez nos partenaires distributeurs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link to="/catalogue" className="btn-outline-light inline-flex items-center justify-center gap-2">
                      Découvrir le catalogue <ArrowRight size={14} />
                    </Link>
                    <Link to="/register" className="btn-secondary border-brand-beige text-brand-beige hover:bg-brand-beige hover:text-brand-dark inline-flex items-center justify-center gap-2">
                      Devenir client B2B
                    </Link>
                  </div>
                  <p className="font-courier text-xs text-brand-beige mt-6 tracking-brand">
                    Déjà client ?{' '}
                    <Link to="/login" className="text-brand-cream underline hover:text-brand-beige">
                      Connexion →
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-white border-y border-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-beige">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="px-6 py-6 flex flex-col gap-2">
                <Icon size={18} className="text-brand-muted" />
                <p className="font-courier text-xs tracking-brand-wide text-brand-dark uppercase font-bold">{title}</p>
                <p className="font-courier text-xs text-brand-muted leading-relaxed hidden lg:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-courier text-xs text-brand-muted tracking-brand-wider uppercase mb-1">Notre gamme</p>
              <h2 className="font-courier text-2xl md:text-3xl text-brand-dark tracking-brand-wide uppercase">
                Catégories
              </h2>
            </div>
            <Link to="/catalogue" className="hidden sm:flex items-center gap-1 font-courier text-xs text-brand-muted hover:text-brand-dark tracking-brand uppercase">
              Tout voir <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalogue?category=${cat.id}`}
                className="group relative aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: cat.color + '25' }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-30 group-hover:opacity-50"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-dark/80 to-transparent">
                  <h3 className="font-courier text-xs text-white tracking-brand-wide uppercase">{cat.label}</h3>
                  <p className="font-courier text-xs text-white/60 tracking-brand">{cat.count} produits</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-12 h-16 shadow-md group-hover:scale-110 transition-transform duration-300 rounded-sm"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-courier text-xs text-brand-muted tracking-brand-wider uppercase mb-1">Produits populaires</p>
              <h2 className="font-courier text-2xl md:text-3xl text-brand-dark tracking-brand-wide uppercase">
                Meilleures ventes
              </h2>
            </div>
            <Link to="/catalogue" className="hidden sm:flex items-center gap-1 font-courier text-xs text-brand-muted hover:text-brand-dark tracking-brand uppercase">
              Catalogue complet <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA – B2B join */}
      {!isLoggedIn && (
        <section className="bg-brand-dark py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-courier text-brand-beige text-xs tracking-brand-wider uppercase mb-4">
              Rejoignez nos partenaires
            </p>
            <h2 className="font-courier text-3xl md:text-4xl text-brand-cream tracking-brand-wide uppercase mb-4">
              Devenez client B2B<br />SYN+ZYN
            </h2>
            <p className="font-courier text-brand-beige text-sm leading-relaxed max-w-lg mx-auto mb-8 tracking-brand">
              Pharmacies, revendeurs, spas, cliniques — obtenez vos conditions tarifaires
              personnalisées et accédez à notre gamme complète avec prix et MOQ dédiés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-outline-light">
                Créer un compte professionnel
              </Link>
              <Link to="/contact" className="btn-secondary border-brand-beige text-brand-beige hover:bg-brand-beige hover:text-brand-dark">
                Parler à un commercial
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brand story */}
      <section className="py-16 md:py-20 bg-brand-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-courier text-xs text-brand-muted tracking-brand-wider uppercase mb-3">Notre vision</p>
              <h2 className="font-courier text-3xl md:text-4xl text-brand-dark tracking-brand-wide uppercase mb-6 leading-tight">
                LA QUALITÉ<br />ACCESSIBLE<br />À TOUS.
              </h2>
              <p className="font-courier text-brand-muted text-sm leading-relaxed tracking-brand mb-4">
                SYN+ZYN redéfinit ce que peut être un produit de beauté accessible — une formulation sérieuse,
                une présentation soignée, et des performances à la hauteur des attentes professionnelles.
              </p>
              <p className="font-courier text-brand-muted text-sm leading-relaxed tracking-brand">
                Makeup, skincare, soins corps et cheveux — une gamme complète, testée dermatologiquement,
                pensée pour les professionnels qui exigent le meilleur pour leurs clients.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                {[['14', 'Catégories'], ['200+', 'Références'], ['ISO 22716', 'Certifié']].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-courier text-2xl text-brand-dark tracking-brand">{val}</div>
                    <div className="font-courier text-xs text-brand-muted tracking-brand-wide uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { color: '#D0B9AB', label: 'BODY CARE', h: 'h-40' },
                { color: '#C27279', label: 'MAKEUP', h: 'h-32' },
                { color: '#B8ABD0', label: 'HAIR CARE', h: 'h-32' },
                { color: '#D9A9B1', label: 'SKINCARE', h: 'h-40' },
              ].map(({ color, label, h }) => (
                <div key={label} className={`${h} relative overflow-hidden`} style={{ backgroundColor: color + '25' }}>
                  <div className="absolute inset-0 flex items-end p-4" style={{ background: `linear-gradient(to top, ${color}90, transparent)` }}>
                    <span className="font-courier text-xs text-white tracking-brand-wide uppercase">{label}</span>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-14 rounded-sm shadow-md" style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
