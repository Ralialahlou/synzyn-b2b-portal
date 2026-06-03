import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Lock, Download, Plus, Minus,
  CheckCircle2, Package, Truck, ShieldCheck, FileText, Bell, ZoomIn, Tag
} from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSEO } from '../hooks/useSEO';
import type { PackFormat } from '../types';

const packLabels: Record<PackFormat, string> = { unit: 'Unité', box: 'Boîte', carton: 'Carton' };
const formatPrice = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`;

/* Generate mock gallery images from brand colors for a given product */
function getMockGallery(color: string) {
  return [
    { id: 'main', type: 'packshot', label: 'Vue principale', bg: color },
    { id: 'angle', type: 'angle', label: 'Vue de côté', bg: color + 'CC' },
    { id: 'detail', type: 'detail', label: 'Détail texture', bg: color + '88' },
    { id: 'lifestyle', type: 'lifestyle', label: 'Mise en situation', bg: '#D0B9AB' },
  ];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, isProductInContract, getContractProduct } = useAuth();
  const { addItem } = useCart();

  const product = getProductById(id!);
  const inContract = isProductInContract(id!);
  const contractProduct = getContractProduct(id!);

  useSEO({
    title: product ? `${product.name} | ${product.subCategory} SYN+ZYN B2B` : 'Produit | SYN+ZYN B2B',
    description: product?.description
      ? (product.description.length > 155 ? product.description.substring(0, 152) + '...' : product.description)
      : 'Découvrez nos produits beauté professionnels SYN+ZYN.',
    canonical: `/product/${id}`,
    ogType: 'product',
  });

  const [packFormat, setPackFormat] = useState<PackFormat>('unit');
  const [quantity, setQuantity] = useState(contractProduct?.moq || 1);
  const [added, setAdded] = useState(false);
  const [interestSent, setInterestSent] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-courier text-brand-taupe">Produit introuvable.</p>
          <Link to="/catalogue" className="btn-primary mt-4 inline-block">Retour catalogue</Link>
        </div>
      </div>
    );
  }

  const gallery = getMockGallery(product.imageColor);

  const currentPrice = contractProduct
    ? packFormat === 'unit'
      ? contractProduct.price.unit
      : packFormat === 'box'
      ? contractProduct.price.box
      : contractProduct.price.carton
    : null;

  const handleAddToCart = () => {
    if (!contractProduct) return;
    addItem(product, contractProduct, packFormat, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleInterest = () => {
    setInterestSent(true);
    setTimeout(() => setInterestSent(false), 3000);
  };

  const adjustQuantity = (delta: number) => {
    const moq = contractProduct?.moq || 1;
    setQuantity((q) => Math.max(moq, q + delta));
  };

  const active = gallery[activeImage];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 flex-wrap">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 font-courier text-xs text-brand-taupe hover:text-brand-dark tracking-brand uppercase">
            <ChevronLeft size={13} />Retour
          </button>
          <span className="text-brand-beige">/</span>
          <Link to="/catalogue" className="font-courier text-xs text-brand-taupe hover:text-brand-dark tracking-brand uppercase">Catalogue</Link>
          <span className="text-brand-beige">/</span>
          <span className="font-courier text-xs text-brand-dark tracking-brand uppercase truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">

          {/* ── LEFT: Image gallery ── */}
          <div className="space-y-3">

            {/* Main image */}
            <div
              className="relative aspect-square flex items-center justify-center overflow-hidden group"
              style={{ backgroundColor: active.bg + '25' }}
            >
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: active.bg }} />

              {/* Product mockup changes per selected view */}
              <div className="relative flex items-center justify-center w-full h-full">
                {active.type === 'packshot' && (
                  <div className="w-40 h-56 md:w-52 md:h-72 shadow-2xl rounded-sm flex flex-col" style={{ backgroundColor: product.imageColor }}>
                    <div className="p-4 flex-shrink-0">
                      <div className="w-10 h-10 border border-white/40 flex items-center justify-center">
                        <span className="font-courier text-xs text-white/80 leading-none text-center">SYN<br />ZYN</span>
                      </div>
                    </div>
                    <div className="flex-1" />
                    <div className="p-4">
                      <div className="font-courier text-xs text-white/70 uppercase tracking-wider">{product.subCategory}</div>
                      <div className="font-courier text-sm text-white/90 mt-1 leading-tight">{product.name}</div>
                      <div className="font-courier text-xs text-white/50 mt-2 uppercase tracking-widest">SYN+ZYN</div>
                    </div>
                  </div>
                )}

                {active.type === 'angle' && (
                  <div className="flex items-end gap-3">
                    <div className="w-28 h-40 shadow-xl rounded-sm" style={{ backgroundColor: product.imageColor, transform: 'rotate(-8deg)' }}>
                      <div className="p-3">
                        <div className="w-7 h-7 border border-white/40 flex items-center justify-center">
                          <span className="font-courier text-[6px] text-white/80 leading-none text-center">SYN<br />ZYN</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-32 h-48 shadow-2xl rounded-sm" style={{ backgroundColor: product.imageColor + 'DD' }}>
                      <div className="p-3">
                        <div className="w-7 h-7 border border-white/40 flex items-center justify-center">
                          <span className="font-courier text-[6px] text-white/80 leading-none text-center">SYN<br />ZYN</span>
                        </div>
                        <div className="mt-16">
                          <div className="font-courier text-xs text-white/70 uppercase">{product.subCategory}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {active.type === 'detail' && (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl" style={{ backgroundColor: product.imageColor }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-courier text-xs text-white/80 uppercase tracking-wider mb-1">Texture</div>
                        <div className="font-courier text-xs text-white/60">{product.subCategory}</div>
                      </div>
                    </div>
                    <ZoomIn size={18} className="absolute top-4 right-4 text-white/40" />
                  </div>
                )}

                {active.type === 'lifestyle' && (
                  <div className="relative w-full h-full flex items-center justify-center" style={{ backgroundColor: '#D0B9AB20' }}>
                    <div className="flex gap-4 items-end">
                      <div className="w-16 h-24 rounded-sm shadow-lg" style={{ backgroundColor: product.imageColor + '80' }} />
                      <div className="w-20 h-32 rounded-sm shadow-xl" style={{ backgroundColor: product.imageColor }}>
                        <div className="p-2">
                          <div className="w-5 h-5 border border-white/40 flex items-center justify-center">
                            <span className="font-courier text-[5px] text-white/70 leading-none text-center">SYN<br />ZYN</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-20 rounded-sm shadow-md" style={{ backgroundColor: '#D9A9B1' }} />
                      <div className="absolute bottom-8 left-8 w-24 h-1 bg-brand-beige/60 rounded" />
                    </div>
                    <div className="absolute bottom-5 left-0 right-0 text-center">
                      <span className="font-courier text-xs text-brand-taupe italic tracking-brand">simply you.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && <span className="badge-contract text-xs">Nouveau</span>}
                {product.isBestSeller && <span className="badge-contract bg-brand-taupe text-xs">Best Seller</span>}
                {product.isPro && <span className="badge-contract bg-brand-rose text-xs">PRO</span>}
              </div>

              {/* Image label */}
              <div className="absolute bottom-3 right-3 bg-black/30 px-2 py-1">
                <span className="font-courier text-xs text-white/80 uppercase tracking-brand">{active.label}</span>
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
                  <Package size={28} className="text-brand-taupe mb-2" />
                  <p className="font-courier text-sm text-brand-taupe">Rupture de stock</p>
                  {product.restockDate && (
                    <p className="font-courier text-xs text-brand-taupe/60 mt-1">Disponible: {product.restockDate}</p>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {gallery.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square relative overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-brand-dark' : 'border-transparent hover:border-brand-beige'
                  }`}
                  style={{ backgroundColor: img.bg + '30' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-9 rounded-sm shadow-sm" style={{ backgroundColor: img.bg }} />
                  </div>
                  <div className="absolute bottom-1 left-0 right-0 text-center">
                    <span className="font-courier text-[7px] text-brand-taupe/70 uppercase tracking-wide leading-none">{img.label.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-1">
              {product.certifications.map((cert) => (
                <span key={cert} className="flex items-center gap-1 border border-brand-beige bg-white px-2.5 py-1.5 font-courier text-xs text-brand-taupe tracking-brand uppercase">
                  <ShieldCheck size={10} className="text-brand-taupe" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product info ── */}
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wider mb-1">
              {product.category.replace('-', ' ')} — {product.subCategory}
            </p>
            <h1 className="font-courier text-2xl md:text-3xl text-brand-dark tracking-brand-wide uppercase mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-courier text-xs text-brand-taupe tracking-brand">DLC: {product.dlc}</span>
              <span className="text-brand-beige">·</span>
              {product.inStock ? (
                <span className="flex items-center gap-1.5 font-courier text-xs text-green-700 tracking-brand">
                  <CheckCircle2 size={12} />En stock
                </span>
              ) : (
                <span className="font-courier text-xs text-brand-rose tracking-brand">Rupture de stock</span>
              )}
            </div>

            <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-6">
              {product.description}
            </p>

            {/* ── B2B pricing: logged in + in contract ── */}
            {isLoggedIn && inContract && contractProduct && product.inStock ? (
              <div className="bg-white border border-brand-beige p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-contract">Produit contractualisé</span>
                </div>

                {/* Pack format */}
                <div className="mb-4">
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">Format de commande</p>
                  <div className="flex gap-2">
                    {(['unit', 'box', 'carton'] as PackFormat[]).map((fmt) => {
                      const price = fmt === 'unit' ? contractProduct.price.unit : fmt === 'box' ? contractProduct.price.box : contractProduct.price.carton;
                      const units = fmt === 'box' ? contractProduct.price.boxUnits : fmt === 'carton' ? contractProduct.price.cartonUnits : 1;
                      return (
                        <button
                          key={fmt}
                          onClick={() => { setPackFormat(fmt); setQuantity(contractProduct.moq); }}
                          className={`flex-1 border py-2.5 px-2 text-center transition-colors ${
                            packFormat === fmt
                              ? 'border-brand-dark bg-brand-dark text-brand-cream'
                              : 'border-brand-beige text-brand-taupe hover:border-brand-dark'
                          }`}
                        >
                          <div className="font-courier text-xs uppercase tracking-brand">{packLabels[fmt]}</div>
                          {fmt !== 'unit' && (
                            <div className="font-courier text-xs opacity-60 mt-0.5">× {units} unités</div>
                          )}
                          <div className="font-courier text-sm font-semibold mt-1">{formatPrice(price)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price display */}
                <div className="border-t border-brand-beige pt-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-courier text-3xl text-brand-dark">
                      {formatPrice(currentPrice!)}
                    </span>
                    <span className="font-courier text-xs text-brand-taupe">/ {packLabels[packFormat].toLowerCase()}</span>
                  </div>
                  {packFormat !== 'unit' && (
                    <p className="font-courier text-xs text-brand-taupe mt-1">
                      soit {formatPrice(currentPrice! / (packFormat === 'box' ? contractProduct.price.boxUnits : contractProduct.price.cartonUnits))} / unité
                    </p>
                  )}
                  <p className="font-courier text-xs text-green-700 mt-1">
                    Minimum: {contractProduct.moq} {packLabels[contractProduct.moqUnit].toLowerCase()}(s)
                  </p>

                  {packFormat === 'carton' && (() => {
                    const cartonUnits = contractProduct.price.cartonUnits;
                    const savingsMAD = (contractProduct.price.unit * cartonUnits) - contractProduct.price.carton;
                    const savingsPct = ((savingsMAD / (contractProduct.price.unit * cartonUnits)) * 100).toFixed(0);
                    return savingsMAD > 0 ? (
                      <div className="flex items-center gap-2 mt-2 bg-green-50 border border-green-200 px-3 py-2">
                        <Tag size={13} className="text-green-700 flex-shrink-0" />
                        <span className="font-courier text-sm text-green-700">
                          Économisez {formatPrice(savingsMAD)} par carton ({savingsPct}% vs achat unitaire)
                        </span>
                      </div>
                    ) : null;
                  })()}

                  {packFormat === 'box' && (() => {
                    const boxUnits = contractProduct.price.boxUnits;
                    const savingsBoxMAD = (contractProduct.price.unit * boxUnits) - contractProduct.price.box;
                    const savingsBoxPct = ((savingsBoxMAD / (contractProduct.price.unit * boxUnits)) * 100).toFixed(0);
                    return savingsBoxMAD > 0 ? (
                      <div className="flex items-center gap-2 mt-2 bg-green-50 border border-green-200 px-3 py-2">
                        <Tag size={13} className="text-green-700 flex-shrink-0" />
                        <span className="font-courier text-sm text-green-700">
                          Économisez {formatPrice(savingsBoxMAD)} par boîte ({savingsBoxPct}% vs achat unitaire)
                        </span>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-brand-beige">
                    <button onClick={() => adjustQuantity(-contractProduct.moq)} className="w-11 h-11 flex items-center justify-center hover:bg-brand-beige transition-colors">
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(contractProduct.moq, parseInt(e.target.value) || contractProduct.moq))}
                      className="w-16 h-11 text-center font-courier text-sm border-0 outline-none bg-transparent"
                    />
                    <button onClick={() => adjustQuantity(contractProduct.moq)} className="w-11 h-11 flex items-center justify-center hover:bg-brand-beige transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-courier text-base text-brand-dark font-medium">
                    = {formatPrice(currentPrice! * quantity)}
                  </span>
                </div>

                {/* Delivery info */}
                <div className="flex items-center gap-2 mb-4 bg-brand-cream px-3 py-2.5 border border-brand-beige">
                  <Truck size={15} className="text-brand-taupe flex-shrink-0" />
                  <span className="font-courier text-xs text-brand-taupe tracking-brand">
                    Délai de livraison estimé: <strong className="text-brand-dark">{contractProduct.deliveryLeadTime}</strong>
                  </span>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 font-courier text-sm tracking-brand-wide uppercase transition-all ${
                    added ? 'bg-green-700 text-white' : 'bg-brand-dark text-brand-cream hover:bg-brand-taupe'
                  }`}
                >
                  {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                </button>

                {/* Documents */}
                {contractProduct.documents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-brand-beige">
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-3">Documents disponibles</p>
                    {contractProduct.documents.map((doc) => (
                      <a key={doc.name} href={doc.url} className="flex items-center gap-2 py-2 hover:text-brand-dark group border-b border-brand-beige last:border-0">
                        <FileText size={13} className="text-brand-taupe group-hover:text-brand-dark flex-shrink-0" />
                        <span className="font-courier text-xs text-brand-taupe group-hover:text-brand-dark tracking-brand flex-1">{doc.name}</span>
                        <Download size={12} className="text-brand-taupe/60 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

            ) : isLoggedIn && !inContract ? (
              /* Logged in, product not in contract */
              <div className="border border-brand-beige mb-6">
                {/* Header */}
                <div className="bg-brand-dark px-5 py-4">
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide mb-1">
                    Ce produit n'est pas dans votre contrat
                  </p>
                  <h3 className="font-courier text-base text-brand-cream">
                    Intéressé(e) par ce produit ?
                  </h3>
                </div>

                {/* Body */}
                <div className="bg-white px-5 py-5">
                  <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-5">
                    Contactez votre commercial dédié — nous vous ferons parvenir un devis
                    personnalisé avec les conditions tarifaires et les MOQ adaptés à votre profil.
                  </p>

                  {interestSent ? (
                    <div className="bg-green-50 border border-green-200 px-4 py-3 flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-courier text-sm text-green-700 tracking-brand">
                          Demande envoyée avec succès.
                        </p>
                        <p className="font-courier text-xs text-green-600 tracking-brand mt-0.5">
                          Votre commercial vous contactera sous 24h avec un devis.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={handleInterest}
                        className="w-full bg-brand-dark text-brand-cream font-courier text-sm tracking-brand-wide uppercase py-3.5 hover:bg-brand-taupe transition-colors flex items-center justify-center gap-2"
                      >
                        <Bell size={15} />
                        Demander un devis
                      </button>
                      <p className="font-courier text-xs text-brand-taupe text-center tracking-brand">
                        ou contactez directement votre commercial
                      </p>
                      <div className="flex gap-3">
                        <a
                          href="mailto:commercial@synzyn.ma"
                          className="flex-1 border border-brand-beige text-brand-taupe font-courier text-xs uppercase tracking-brand px-4 py-2.5 text-center hover:border-brand-dark hover:text-brand-dark transition-colors"
                        >
                          Email
                        </a>
                        <a
                          href="https://wa.me/212661100200"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border border-brand-beige text-brand-taupe font-courier text-xs uppercase tracking-brand px-4 py-2.5 text-center hover:border-brand-dark hover:text-brand-dark transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            ) : (
              /* Not logged in */
              <div className="bg-brand-dark p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lock size={15} className="text-brand-beige flex-shrink-0" />
                  <span className="font-courier text-sm text-brand-beige uppercase tracking-brand">
                    Connexion requise pour voir les prix
                  </span>
                </div>
                <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-4">
                  Les prix, MOQ et conditions de commande sont réservés aux clients B2B enregistrés.
                </p>
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="btn-outline-light block text-center">
                    Se connecter
                  </Link>
                  <Link to="/register" className="border border-brand-taupe text-brand-taupe font-courier text-sm uppercase tracking-brand-wide px-4 py-3 text-center hover:bg-brand-taupe hover:text-brand-dark transition-colors block">
                    Créer un compte B2B
                  </Link>
                </div>
              </div>
            )}

            {/* Skin / hair types */}
            {product.skinTypes.length > 0 && (
              <div className="mb-5">
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide mb-2">
                  Types de peau / cheveux
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.skinTypes.map((st) => (
                    <span key={st} className="border border-brand-beige bg-white px-3 py-1.5 font-courier text-xs text-brand-taupe tracking-brand">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-12 border-t border-brand-beige pt-10">
          <ProductTabs product={product} />
        </div>

        {/* ── Similar products ── */}
        <SimilarProducts currentId={product.id} category={product.category} />
      </div>
    </div>
  );
}

function SimilarProducts({ currentId, category }: { currentId: string; category: string }) {
  const similar = products
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <div className="mt-16 border-t border-brand-beige pt-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wider mb-1">
            Vous pourriez aussi aimer
          </p>
          <h2 className="font-courier text-2xl text-brand-dark uppercase tracking-brand-wide">
            Produits similaires
          </h2>
        </div>
        <Link
          to={`/catalogue?category=${category}`}
          className="hidden sm:flex items-center gap-1 font-courier text-sm text-brand-taupe hover:text-brand-dark uppercase tracking-brand transition-colors"
        >
          Voir la catégorie →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {similar.map((p) => {
          return (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="bg-white border border-brand-beige hover:border-brand-taupe transition-colors group"
            >
              {/* Mini image */}
              <div
                className="aspect-square flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: p.imageColor + '20' }}
              >
                <div className="w-14 h-20 rounded-sm shadow-md group-hover:scale-105 transition-transform duration-300" style={{ backgroundColor: p.imageColor }}>
                  <div className="p-1.5">
                    <div className="w-4 h-4 border border-white/30 flex items-center justify-center">
                      <span className="font-courier text-[5px] text-white/70 leading-none text-center">SYN<br />ZYN</span>
                    </div>
                  </div>
                </div>
                {p.isNew && (
                  <span className="absolute top-2 left-2 bg-brand-dark text-brand-cream font-courier text-xs px-2 py-0.5 uppercase tracking-brand">
                    Nouveau
                  </span>
                )}
                {p.isBestSeller && !p.isNew && (
                  <span className="absolute top-2 left-2 bg-brand-taupe text-brand-cream font-courier text-xs px-2 py-0.5 uppercase tracking-brand">
                    ★
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">{p.subCategory}</p>
                <p className="font-courier text-sm text-brand-dark mt-0.5 group-hover:text-brand-taupe transition-colors leading-tight">
                  {p.name}
                </p>
                <p className="font-courier text-xs text-brand-taupe mt-2 uppercase tracking-brand">
                  Voir le produit →
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="sm:hidden mt-5 text-center">
        <Link
          to={`/catalogue?category=${category}`}
          className="font-courier text-sm text-brand-taupe hover:text-brand-dark uppercase tracking-brand"
        >
          Voir toute la catégorie →
        </Link>
      </div>
    </div>
  );
}

function ProductTabs({ product }: { product: ReturnType<typeof getProductById> }) {
  const [tab, setTab] = useState<'benefits' | 'actives' | 'protocol' | 'clinical'>('benefits');
  if (!product) return null;

  const tabs = [
    { id: 'benefits' as const, label: 'Bénéfices' },
    { id: 'actives' as const, label: 'Ingrédients actifs' },
    { id: 'protocol' as const, label: "Protocole d'utilisation" },
    { id: 'clinical' as const, label: 'Positionnement clinique' },
  ];

  return (
    <div>
      <div className="flex gap-0 border-b border-brand-beige overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`font-courier text-xs uppercase tracking-brand-wide px-5 py-3.5 whitespace-nowrap border-b-2 transition-colors ${
              tab === t.id
                ? 'border-brand-dark text-brand-dark'
                : 'border-transparent text-brand-taupe hover:text-brand-dark'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-8 max-w-3xl">
        {tab === 'benefits' && (
          <ul className="space-y-4">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-brand-taupe flex-shrink-0 mt-0.5" />
                <span className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'actives' && (
          <div className="space-y-5">
            {product.activeIngredients.map((ai) => (
              <div key={ai.name} className="border-b border-brand-beige pb-5 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-courier text-sm text-brand-dark uppercase tracking-brand">{ai.name}</span>
                  {ai.concentration && (
                    <span className="badge-contract">{ai.concentration}</span>
                  )}
                </div>
                <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">{ai.benefit}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'protocol' && (
          <div>
            <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-6">
              {product.usageProtocol}
            </p>
            {product.indications.length > 0 && (
              <div>
                <h4 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-3">
                  Indications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.indications.map((ind) => (
                    <span key={ind} className="border border-brand-beige bg-white px-3 py-1.5 font-courier text-xs text-brand-taupe tracking-brand">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'clinical' && (
          <div>
            <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-6">
              {product.clinicalPositioning}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <span key={cert} className="flex items-center gap-1.5 border border-brand-beige bg-white px-3 py-2 font-courier text-xs text-brand-taupe tracking-brand">
                  <ShieldCheck size={11} />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
