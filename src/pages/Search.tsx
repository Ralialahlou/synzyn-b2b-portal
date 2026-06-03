import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { useSEO } from '../hooks/useSEO';

const EXAMPLE_SEARCHES = [
  'Sérum', 'Fond de teint', 'Shampoing', 'SPF', 'Hydratant', 'Mascara',
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useSEO({
    title: `Recherche${query ? ` : ${query}` : ''} | SYN+ZYN B2B`,
    description: query
      ? `Résultats de recherche pour "${query}" sur le portail B2B SYN+ZYN.`
      : 'Recherchez des produits beauté professionnels SYN+ZYN — skincare, makeup, soins corps et cheveux.',
    canonical: '/search',
    noindex: true,
  });

  const [input, setInput] = useState(query);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.activeIngredients.some((ai) => ai.name.toLowerCase().includes(q)) ||
        p.certifications.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ q: input.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-dark py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-courier text-brand-taupe text-xs tracking-brand-wider uppercase mb-2">
            SYN+ZYN B2B
          </p>
          <h1 className="font-courier text-3xl text-brand-cream tracking-brand-wide uppercase mb-6">
            Recherche
          </h1>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-taupe" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Produit, catégorie, ingrédient..."
                className="w-full bg-white border-0 px-4 py-3.5 pl-11 font-courier text-sm text-brand-dark placeholder-brand-taupe focus:outline-none focus:ring-2 focus:ring-brand-beige"
                autoFocus
              />
            </div>
            <button type="submit" className="btn-outline-light px-6 py-3.5 text-sm">
              Rechercher
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* No query yet */}
        {!query.trim() && (
          <div>
            <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-4">
              Recherches fréquentes
            </h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {EXAMPLE_SEARCHES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => { setInput(ex); setSearchParams({ q: ex }); }}
                  className="border border-brand-beige bg-white px-4 py-2.5 font-courier text-sm text-brand-taupe hover:border-brand-dark hover:text-brand-dark transition-colors uppercase tracking-brand flex items-center gap-2"
                >
                  <SearchIcon size={12} />
                  {ex}
                </button>
              ))}
            </div>

            <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-4">
              Parcourir par catégorie
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { id: 'skincare', label: 'Skincare', color: '#D9A9B1' },
                { id: 'makeup', label: 'Makeup', color: '#C27279' },
                { id: 'body-care', label: 'Soins corps', color: '#D0B9AB' },
                { id: 'hair-care', label: 'Soins cheveux', color: '#B8ABD0' },
                { id: 'sun-care', label: 'Solaire', color: '#A28B83' },
              ].map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalogue?category=${cat.id}`}
                  className="group border border-brand-beige bg-white p-5 hover:border-brand-dark transition-colors flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: cat.color + '40' }}>
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: cat.color + '60' }} />
                  </div>
                  <span className="font-courier text-sm text-brand-dark uppercase tracking-brand group-hover:text-brand-taupe transition-colors">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-courier text-sm text-brand-taupe tracking-brand">
                  {results.length > 0
                    ? `${results.length} résultat${results.length > 1 ? 's' : ''} pour `
                    : 'Aucun résultat pour '}
                  <strong className="text-brand-dark">"{query}"</strong>
                </p>
              </div>
              <Link
                to="/catalogue"
                className="flex items-center gap-1 font-courier text-sm text-brand-taupe hover:text-brand-dark uppercase tracking-brand"
              >
                Voir tout le catalogue <ArrowRight size={13} />
              </Link>
            </div>

            {results.length === 0 ? (
              <div className="bg-white border border-brand-beige p-12 text-center">
                <SearchIcon size={36} className="mx-auto text-brand-taupe mb-4" />
                <p className="font-courier text-base text-brand-dark mb-2">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <p className="font-courier text-sm text-brand-taupe mb-6">
                  Essayez un terme plus général, ou parcourez notre catalogue complet.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/catalogue" className="btn-primary">Voir le catalogue</Link>
                  <Link to="/contact" className="btn-secondary">Contacter un commercial</Link>
                </div>
                <div className="mt-8">
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-3">
                    Suggestions
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {EXAMPLE_SEARCHES.map((ex) => (
                      <button
                        key={ex}
                        onClick={() => { setInput(ex); setSearchParams({ q: ex }); }}
                        className="border border-brand-beige px-3 py-1.5 font-courier text-xs text-brand-taupe hover:border-brand-dark hover:text-brand-dark transition-colors uppercase tracking-brand"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
