import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Search, Lock } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useSEO } from '../hooks/useSEO';
import type { ProductCategory } from '../types';

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tous les produits' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'body-care', label: 'Soins corps' },
  { id: 'hair-care', label: 'Soins cheveux' },
  { id: 'sun-care', label: 'Solaire' },
];

/* Friendly French labels for subcategories */
const SUBCATEGORY_LABELS: Record<string, string> = {
  Serum: 'Sérum',
  Moisturizer: 'Hydratant',
  Cleanser: 'Nettoyant',
  Toner: 'Tonique',
  'Professional Treatment': 'Soin PRO',
  Foundation: 'Fond de teint',
  Concealer: 'Correcteur',
  Lipstick: 'Rouge à lèvres',
  Mascara: 'Mascara',
  'Body Lotion': 'Lotion corps',
  'Shower Gel': 'Gel douche',
  Shampoo: 'Shampoing',
  Conditioner: 'Après-shampoing',
  'Sun Protection': 'Protection solaire',
};

const SORT_OPTIONS = [
  { value: 'default', label: 'Par défaut' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'bestseller', label: 'Meilleures ventes' },
  { value: 'new', label: 'Nouveautés' },
];

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const activeCategory = (searchParams.get('category') || 'all') as ProductCategory | 'all';

  const setCategory = (cat: string) => {
    setActiveSubCategory(null);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  /* Compute available subcategories for the active category */
  const availableSubCategories = useMemo(() => {
    const base = activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);
    const unique = Array.from(new Set(base.map((p) => p.subCategory)));
    return unique;
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (activeSubCategory) list = list.filter((p) => p.subCategory === activeSubCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (sort === 'name-asc') list = list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'bestseller') list = list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    if (sort === 'new') list = list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return list;
  }, [activeCategory, activeSubCategory, search, sort]);

  /* Current category label for the page header */
  const activeCategoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label || 'Catalogue';

  useSEO({
    title: activeCategory === 'all'
      ? 'Catalogue B2B | SYN+ZYN — Produits Beauté Professionnels'
      : `${activeCategoryLabel} | SYN+ZYN B2B`,
    description: activeCategory === 'all'
      ? 'Catalogue complet SYN+ZYN B2B — 200+ références professionnelles : skincare, makeup, soins corps, cheveux et gamme PRO. Prix sur connexion.'
      : `Découvrez la gamme ${activeCategoryLabel} SYN+ZYN — produits beauté professionnels avec tarifs B2B négociés.`,
    canonical: activeCategory === 'all' ? '/catalogue' : `/catalogue?category=${activeCategory}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Catalogue ${activeCategoryLabel} SYN+ZYN B2B`,
      'description': `Produits ${activeCategoryLabel} professionnels SYN+ZYN avec tarifs B2B.`,
      'url': `https://b2b.synzyn.ma/catalogue${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`,
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://b2b.synzyn.ma/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Catalogue', 'item': 'https://b2b.synzyn.ma/catalogue' },
          ...(activeCategory !== 'all' ? [{ '@type': 'ListItem', 'position': 3, 'name': activeCategoryLabel, 'item': `https://b2b.synzyn.ma/catalogue?category=${activeCategory}` }] : []),
        ],
      },
    },
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-courier text-brand-taupe text-xs tracking-brand-wider uppercase mb-2">
            SYN+ZYN B2B
          </p>
          <h1 className="font-courier text-3xl md:text-4xl text-brand-cream tracking-brand-wide uppercase">
            {activeCategoryLabel}
          </h1>
          {!isLoggedIn && (
            <div className="mt-4 flex items-center gap-2 bg-brand-taupe/20 border border-brand-taupe/30 px-4 py-2.5 max-w-xl">
              <Lock size={14} className="text-brand-taupe flex-shrink-0" />
              <p className="font-courier text-xs text-brand-beige tracking-brand">
                Les prix et conditions sont visibles après connexion.{' '}
                <Link to="/login" className="underline hover:text-brand-cream">Se connecter</Link>
                {' '}ou{' '}
                <Link to="/register" className="underline hover:text-brand-cream">créer un compte B2B</Link>.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + sort row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field max-w-[220px] text-sm font-courier"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden flex items-center gap-2 btn-secondary px-4 py-2.5"
          >
            <SlidersHorizontal size={14} />
            <span>Filtres</span>
          </button>
        </div>

        {/* Subcategory quick-filter chips — shown when a category is selected */}
        {availableSubCategories.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveSubCategory(null)}
              className={`flex-shrink-0 px-4 py-2 font-courier text-sm uppercase tracking-brand border transition-colors ${
                activeSubCategory === null
                  ? 'bg-brand-dark text-brand-cream border-brand-dark'
                  : 'bg-white text-brand-taupe border-brand-beige hover:border-brand-dark hover:text-brand-dark'
              }`}
            >
              Tout
            </button>
            {availableSubCategories.map((sub) => {
              const count = products.filter(
                (p) => p.subCategory === sub && (activeCategory === 'all' || p.category === activeCategory)
              ).length;
              return (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(activeSubCategory === sub ? null : sub)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 font-courier text-sm uppercase tracking-brand border transition-colors ${
                    activeSubCategory === sub
                      ? 'bg-brand-dark text-brand-cream border-brand-dark'
                      : 'bg-white text-brand-taupe border-brand-beige hover:border-brand-dark hover:text-brand-dark'
                  }`}
                >
                  {SUBCATEGORY_LABELS[sub] || sub}
                  <span className={`text-xs ${activeSubCategory === sub ? 'text-brand-beige' : 'text-brand-taupe/60'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar – desktop */}
          <aside className="hidden sm:block w-48 flex-shrink-0">
            <h3 className="font-courier text-sm tracking-brand-wider uppercase text-brand-taupe mb-3">
              Catégories
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategory(cat.id)}
                    className={`w-full text-left font-courier text-sm tracking-brand py-2 px-2 transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-brand-dark text-brand-cream'
                        : 'text-brand-taupe hover:text-brand-dark'
                    }`}
                  >
                    {cat.label}
                    <span className="ml-1 text-xs opacity-60">
                      ({cat.id === 'all' ? products.length : products.filter((p) => p.category === cat.id).length})
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {isLoggedIn && (
              <div className="mt-6">
                <h3 className="font-courier text-sm tracking-brand-wider uppercase text-brand-taupe mb-3">
                  Disponibilité
                </h3>
                <ul className="space-y-1">
                  {['En stock', 'Rupture'].map((s) => (
                    <li key={s}>
                      <button className="w-full text-left font-courier text-sm tracking-brand py-2 px-2 text-brand-taupe hover:text-brand-dark transition-colors">
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Mobile sidebar */}
          {filtersOpen && (
            <div className="fixed inset-0 bg-black/40 z-50 sm:hidden" onClick={() => setFiltersOpen(false)}>
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-courier text-sm tracking-brand-wide uppercase">Filtres</span>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X size={18} className="text-brand-taupe" />
                  </button>
                </div>
                <h3 className="font-courier text-sm tracking-brand-wider uppercase text-brand-taupe mb-3">
                  Catégories
                </h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => { setCategory(cat.id); setFiltersOpen(false); }}
                        className={`w-full text-left font-courier text-sm tracking-brand py-2 border-b border-brand-beige transition-colors ${
                          activeCategory === cat.id ? 'text-brand-dark font-bold' : 'text-brand-taupe'
                        }`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="font-courier text-sm text-brand-taupe tracking-brand">
                {filtered.length} produit{filtered.length !== 1 ? 's' : ''}
                {activeSubCategory && (
                  <span className="ml-2 text-brand-dark">— {SUBCATEGORY_LABELS[activeSubCategory] || activeSubCategory}</span>
                )}
              </p>
              {(activeSubCategory || search) && (
                <button
                  onClick={() => { setActiveSubCategory(null); setSearch(''); }}
                  className="font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand flex items-center gap-1"
                >
                  <X size={12} /> Effacer les filtres
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-courier text-brand-taupe text-sm">Aucun produit trouvé.</p>
                <button
                  onClick={() => { setSearch(''); setCategory('all'); setActiveSubCategory(null); }}
                  className="btn-secondary mt-4"
                >
                  Réinitialiser
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
