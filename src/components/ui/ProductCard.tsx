import { Link } from 'react-router-dom';
import { Lock, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { isLoggedIn, isProductInContract, getContractProduct } = useAuth();
  const inContract = isProductInContract(product.id);
  const contractProduct = getContractProduct(product.id);

  return (
    <Link to={`/product/${product.id}`} className="product-card block">
      {/* Image area */}
      <div
        className="relative aspect-square flex items-end justify-center pb-6"
        style={{ backgroundColor: product.imageColor + '20' }}
      >
        {/* Product color block (placeholder for real image) */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: product.imageColor }}
        />
        <div
          className="relative w-20 h-28 rounded-sm shadow-md group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundColor: product.imageColor }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 px-1">
            <span className="font-courier text-[7px] text-white/80 uppercase tracking-wider text-center leading-tight">
              {product.subCategory}
            </span>
          </div>
          <div className="absolute top-2 left-2 w-5 h-5 border border-white/40 flex items-center justify-center">
            <span className="font-courier text-[5px] text-white/80 leading-none text-center">
              SYN<br />ZYN
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="flex items-center gap-1 bg-brand-dark text-brand-cream px-2 py-0.5 font-courier text-xs uppercase tracking-brand">
              <Sparkles size={8} /> Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="flex items-center gap-1 bg-brand-taupe text-brand-cream px-2 py-0.5 font-courier text-xs uppercase tracking-brand">
              <Star size={8} /> Meilleures ventes
            </span>
          )}
          {product.isPro && (
            <span className="flex items-center gap-1 bg-brand-rose text-white px-2 py-0.5 font-courier text-xs uppercase tracking-brand">
              <ShieldCheck size={8} /> PRO
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="font-courier text-xs text-brand-taupe uppercase tracking-brand">Rupture de stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand truncate">
              {product.category.replace('-', ' ')} — {product.subCategory}
            </p>
            <h3 className="font-courier text-sm text-brand-dark mt-0.5 leading-tight group-hover:text-brand-taupe transition-colors">
              {product.name}
            </h3>
          </div>
          {isLoggedIn && inContract && (
            <span className="badge-contract flex-shrink-0 mt-0.5">Contrat</span>
          )}
        </div>

        {/* Price area */}
        <div className="mt-3">
          {isLoggedIn && inContract && contractProduct ? (
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-courier text-base text-brand-dark">
                  {contractProduct.price.unit.toFixed(2)}
                </span>
                <span className="font-courier text-xs text-brand-taupe">MAD / unité</span>
              </div>
              <p className="font-courier text-xs text-brand-taupe mt-0.5 tracking-brand">
                MOQ: {contractProduct.moq} {contractProduct.moqUnit}s · {contractProduct.deliveryLeadTime}
              </p>
            </div>
          ) : isLoggedIn && !inContract ? (
            <div className="flex items-center gap-1.5">
              <Lock size={11} className="text-brand-taupe" />
              <span className="font-courier text-xs text-brand-taupe tracking-brand uppercase">
                Hors contrat — Demander un devis
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Lock size={11} className="text-brand-taupe" />
              <span className="font-courier text-xs text-brand-taupe tracking-brand uppercase">
                Connexion requise
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
