import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const formatPrice = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`;

const packLabels = { unit: 'Unité', box: 'Boîte', carton: 'Carton' };

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, subtotal, vatAmount, total, isCartOpen, setCartOpen } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-beige bg-brand-dark">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-brand-cream" />
            <span className="font-courier text-xs tracking-brand-wide text-brand-cream uppercase">
              Mon panier ({items.length} article{items.length !== 1 ? 's' : ''})
            </span>
          </div>
          <button aria-label="Fermer le panier" onClick={() => setCartOpen(false)} className="text-brand-cream/60 hover:text-brand-cream">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={32} className="mx-auto text-brand-taupe mb-3" />
              <p className="font-courier text-sm text-brand-taupe tracking-brand">Votre panier est vide</p>
              <Link
                to="/catalogue"
                className="btn-primary mt-6 inline-block"
                onClick={() => setCartOpen(false)}
              >
                Voir le catalogue
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const price =
                item.packFormat === 'unit'
                  ? item.contractProduct.price.unit
                  : item.packFormat === 'box'
                  ? item.contractProduct.price.box
                  : item.contractProduct.price.carton;
              const lineTotal = price * item.quantity;

              return (
                <div key={`${item.product.id}-${item.packFormat}`} className="bg-white p-4 border border-brand-beige">
                  <div className="flex gap-3">
                    <div
                      className="w-14 h-14 flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: item.product.imageColor + '30' }}
                    >
                      <div
                        className="w-8 h-8 rounded-sm"
                        style={{ backgroundColor: item.product.imageColor }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-courier text-xs text-brand-dark tracking-brand truncate">
                            {item.product.name}
                          </p>
                          <p className="font-courier text-xs text-brand-taupe tracking-brand mt-0.5 uppercase">
                            {packLabels[item.packFormat]}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.packFormat)}
                          className="text-brand-taupe hover:text-brand-rose flex-shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.packFormat, item.quantity - 1)}
                            className="w-6 h-6 border border-brand-beige flex items-center justify-center hover:bg-brand-beige transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-courier text-xs w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.packFormat, item.quantity + 1)}
                            className="w-6 h-6 border border-brand-beige flex items-center justify-center hover:bg-brand-beige transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="font-courier text-xs text-brand-dark">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-brand-beige px-6 py-5 bg-white">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-courier text-xs text-brand-taupe">
                <span>Sous-total HT</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-courier text-xs text-brand-taupe">
                <span>TVA 20%</span>
                <span>{formatPrice(vatAmount)}</span>
              </div>
              <div className="flex justify-between font-courier text-sm text-brand-dark border-t border-brand-beige pt-2 mt-2">
                <span className="uppercase tracking-brand">Total TTC</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < 20000 && (
              <div className="bg-brand-beige/40 px-3 py-2 mb-4 border-l-2 border-brand-taupe">
                <p className="font-courier text-xs text-brand-taupe tracking-brand">
                  Minimum de commande: 20 000 MAD HT. Il vous manque{' '}
                  {formatPrice(20000 - subtotal)}.
                </p>
              </div>
            )}

            <Link
              to="/checkout"
              className={`block text-center btn-primary ${subtotal < 20000 ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => setCartOpen(false)}
            >
              Confirmer la commande
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="block w-full text-center font-courier text-xs text-brand-taupe tracking-brand mt-3 hover:text-brand-dark transition-colors uppercase"
            >
              Continuer les achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
