import { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function Favorites() {
  const { client, isProductInContract } = useAuth();
  // In a real app these would be persisted; for demo use first 3 contract products
  const [favoriteIds] = useState<string[]>(
    client?.contractProducts.slice(0, 3).map((cp) => cp.productId) || []
  );

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="space-y-5">
      <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Mes produits favoris</h2>

      {favoriteProducts.length === 0 ? (
        <div className="bg-white border border-brand-beige p-10 text-center">
          <Heart size={32} className="mx-auto text-brand-taupe mb-3" />
          <p className="font-courier text-sm text-brand-taupe mb-4">Aucun produit en favori.</p>
          <Link to="/catalogue" className="btn-primary">Parcourir le catalogue</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favoriteProducts.map((product) => {
            const inContract = isProductInContract(product.id);
            const cp = client?.contractProducts.find((c) => c.productId === product.id);
            return (
              <div key={product.id} className="bg-white border border-brand-beige p-4 group">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-14 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: product.imageColor + '40' }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-7 h-9 rounded-sm" style={{ backgroundColor: product.imageColor }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">{product.subCategory}</p>
                    <p className="font-courier text-xs text-brand-dark mt-0.5">{product.name}</p>
                    {inContract && cp && (
                      <p className="font-courier text-xs text-brand-dark mt-1">{cp.price.unit.toFixed(2)} MAD/u</p>
                    )}
                  </div>
                  <Heart size={14} className="text-brand-rose flex-shrink-0" fill="currentColor" />
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="flex items-center justify-between font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand group-hover:text-brand-dark transition-colors"
                >
                  {inContract ? 'Commander' : 'Voir le produit'}
                  <ArrowRight size={11} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
