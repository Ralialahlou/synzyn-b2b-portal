import { Link } from 'react-router-dom';
import { Download, FileText, ArrowRight, Package, AlertCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

const formatPrice = (n: number) => `${n.toFixed(2)} MAD`;
const packLabels: Record<string, string> = { unit: 'Unité', box: 'Boîte', carton: 'Carton' };
const paymentMethodLabels: Record<string, string> = {
  'bank-transfer': 'Virement bancaire',
  'card': 'Carte bancaire',
  'cod-check': 'À la livraison — Chèque',
  'cod-cash': 'À la livraison — Espèces',
  'credit-terms': 'Crédit client (différé)',
};
const formatCreditLimit = (n: number) =>
  n.toLocaleString('fr-FR').replace(/ /g, ' ') + ' MAD';

export default function Contract() {
  const { client } = useAuth();
  if (!client) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Mon contrat</h2>
        <div className="font-courier text-xs text-brand-taupe tracking-brand border border-brand-beige px-3 py-1.5">
          {client.contractProducts.length} produit(s) contractualisé(s)
        </div>
      </div>

      {/* Contract summary */}
      <div className="bg-white border border-brand-beige p-5">
        <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
          Récapitulatif du contrat
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Produits</p>
            <p className="font-courier text-xl text-brand-dark">{client.contractProducts.length}</p>
          </div>
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Commande min.</p>
            <p className="font-courier text-xl text-brand-dark">{(client.paymentTerms.minOrderValue / 1000).toFixed(0)}K MAD</p>
          </div>
          {client.paymentTerms.paymentDays && (
            <div>
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Délai paiement</p>
              <p className="font-courier text-xl text-brand-dark">{client.paymentTerms.paymentDays}j</p>
            </div>
          )}
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Client depuis</p>
            <p className="font-courier text-sm text-brand-dark">
              {new Date(client.joinedDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Payment terms card */}
      <div className="bg-white border border-brand-beige p-5">
        <div className="flex items-center gap-2 mb-4 border-b border-brand-beige pb-2">
          <CreditCard size={15} className="text-brand-taupe" />
          <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide">
            Conditions de paiement contractuelles
          </h3>
        </div>

        <div className="space-y-4">
          {/* Allowed payment methods */}
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">
              Mode(s) de paiement autorisés
            </p>
            <div className="flex flex-wrap gap-2">
              {client.paymentTerms.allowedMethods.map((method) => (
                <span
                  key={method}
                  className="font-courier text-xs text-brand-dark border border-brand-beige bg-brand-cream px-2.5 py-1"
                >
                  {paymentMethodLabels[method] ?? method}
                </span>
              ))}
            </div>
          </div>

          {/* Payment delay */}
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1.5">
              Délai de paiement
            </p>
            {!client.paymentTerms.paymentDays ? (
              <div className="bg-amber-50 border border-amber-200 px-3 py-2.5 space-y-1">
                <div className="flex items-center gap-1.5">
                  <AlertCircle size={13} className="text-amber-600 flex-shrink-0" />
                  <span className="font-courier text-sm text-amber-800 font-semibold">
                    Paiement immédiat requis
                  </span>
                </div>
                <p className="font-courier text-xs text-amber-700 leading-relaxed">
                  Votre facture doit être réglée avant expédition de la commande. Envoyez votre justificatif à{' '}
                  <strong>commercial@synzyn.ma</strong>
                </p>
              </div>
            ) : (
              <p className="font-courier text-sm text-brand-dark">
                {client.paymentTerms.paymentDays === 30 && '30 jours fin de mois après livraison'}
                {client.paymentTerms.paymentDays === 60 && '60 jours après livraison'}
                {client.paymentTerms.paymentDays === 90 && '90 jours après livraison'}
                {![30, 60, 90].includes(client.paymentTerms.paymentDays) &&
                  `${client.paymentTerms.paymentDays} jours après livraison`}
              </p>
            )}
          </div>

          {/* Credit limit (optional) */}
          {client.paymentTerms.creditLimit != null && (
            <div>
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                Plafond de crédit
              </p>
              <p className="font-courier text-sm text-brand-dark">
                {formatCreditLimit(client.paymentTerms.creditLimit)}
              </p>
            </div>
          )}

          {/* Min order value */}
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
              Commande minimum
            </p>
            <p className="font-courier text-sm text-brand-dark">
              {client.paymentTerms.minOrderValue.toLocaleString('fr-FR')} MAD HT
            </p>
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="bg-white border border-brand-beige">
        <div className="px-5 py-4 border-b border-brand-beige">
          <h3 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
            Produits et tarifs contractualisés
          </h3>
        </div>

        <div className="divide-y divide-brand-beige">
          {client.contractProducts.map((cp) => {
            const product = products.find((p) => p.id === cp.productId);
            if (!product) return null;

            return (
              <div key={cp.productId} className="p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product image */}
                  <div
                    className="w-14 h-14 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: product.imageColor + '30' }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-10 rounded-sm" style={{ backgroundColor: product.imageColor }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                          {product.category.replace('-', ' ')} — {product.subCategory}
                        </p>
                        <h4 className="font-courier text-sm text-brand-dark mt-0.5">{product.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-2 py-0.5">
                            MOQ: {cp.moq} {packLabels[cp.moqUnit].toLowerCase()}(s)
                          </span>
                          <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-2 py-0.5">
                            Délai: {cp.deliveryLeadTime}
                          </span>
                          {!product.inStock && (
                            <span className="font-courier text-xs text-brand-rose border border-brand-rose px-2 py-0.5">
                              Rupture{product.restockDate ? ` — Dispo. ${product.restockDate}` : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-1 font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand flex-shrink-0"
                      >
                        Commander <ArrowRight size={10} />
                      </Link>
                    </div>

                    {/* Pricing table */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { fmt: 'unit', price: cp.price.unit, label: 'Unité', sub: '1 u' },
                        { fmt: 'box', price: cp.price.box, label: 'Boîte', sub: `${cp.price.boxUnits} u` },
                        { fmt: 'carton', price: cp.price.carton, label: 'Carton', sub: `${cp.price.cartonUnits} u` },
                      ].map(({ fmt, price, label, sub }) => (
                        <div key={fmt} className="bg-brand-cream border border-brand-beige p-2 text-center">
                          <div className="font-courier text-xs text-brand-taupe uppercase tracking-brand">{label}</div>
                          <div className="font-courier text-xs text-brand-dark mt-0.5">{formatPrice(price)}</div>
                          <div className="font-courier text-xs text-brand-taupe/60">{sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* Documents */}
                    {cp.documents.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cp.documents.map((doc) => (
                          <a
                            key={doc.name}
                            href={doc.url}
                            className="flex items-center gap-1.5 border border-brand-beige bg-white hover:bg-brand-cream px-2.5 py-1.5 transition-colors"
                          >
                            <FileText size={10} className="text-brand-taupe" />
                            <span className="font-courier text-xs text-brand-taupe tracking-brand">{doc.name}</span>
                            <Download size={9} className="text-brand-taupe/60 ml-1" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Products not in contract CTA */}
      <div className="bg-brand-cream-dark border border-brand-beige p-5">
        <div className="flex items-start gap-3">
          <Package size={18} className="text-brand-taupe flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-courier text-xs text-brand-dark mb-1">Vous souhaitez ajouter des produits à votre contrat ?</p>
            <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed mb-3">
              Consultez le catalogue complet et manifestez votre intérêt pour les produits hors contrat.
              Votre commercial vous contactera pour étudier votre demande.
            </p>
            <div className="flex gap-3">
              <Link to="/catalogue" className="btn-primary text-xs py-2 px-4">
                Voir le catalogue
              </Link>
              <Link to="/contact" className="btn-secondary text-xs py-2 px-4">
                Contacter mon commercial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
