import { useState } from 'react';
import { RefreshCw, Truck, FileText, ArrowLeft, MapPin, CreditCard, Copy, CheckCircle2, AlertCircle, FileDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getOrdersByClientId } from '../../data/orders';
import { products } from '../../data/products';
import type { Order, OrderStatus, PaymentStatus } from '../../types';
import BonDeCommande from '../../components/ui/BonDeCommande';

const formatPrice = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`;
const packLabels: Record<string, string> = { unit: 'Unité', box: 'Boîte', carton: 'Carton' };

const paymentMethodLabels: Record<string, string> = {
  'bank-transfer': 'Virement bancaire',
  'card': 'Carte bancaire',
  'cod-check': 'À la livraison — Chèque',
  'cod-cash': 'À la livraison — Espèces',
  'credit-terms': 'Crédit client',
};

const statusColors: Record<OrderStatus, string> = {
  delivered: 'text-green-700 bg-green-50 border-green-200',
  shipped: 'text-blue-700 bg-blue-50 border-blue-200',
  processing: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  confirmed: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  pending: 'text-brand-taupe bg-brand-cream border-brand-beige',
  cancelled: 'text-red-600 bg-red-50 border-red-200',
};
const statusLabels: Record<OrderStatus, string> = {
  delivered: 'Livré',
  shipped: 'Expédié',
  processing: 'En préparation',
  confirmed: 'Confirmé',
  pending: 'En attente',
  cancelled: 'Annulé',
};
const paymentStatusLabels: Record<PaymentStatus, string> = {
  paid: 'Payé',
  pending: 'En attente de paiement',
  partial: 'Partiel',
  overdue: 'En retard de paiement',
};
const paymentStatusColors: Record<PaymentStatus, string> = {
  paid: 'text-green-700',
  pending: 'text-brand-taupe',
  partial: 'text-yellow-700',
  overdue: 'text-red-600 font-semibold',
};

function ReorderButton({ orderId, onReorder, reordered }: { orderId: string; onReorder: (id: string) => void; reordered: string | null }) {
  return (
    <button
      onClick={() => onReorder(orderId)}
      className={`flex items-center gap-2 font-courier text-sm uppercase tracking-brand px-5 py-3 transition-all ${
        reordered === orderId
          ? 'bg-green-600 text-white'
          : 'bg-brand-dark text-brand-cream hover:bg-brand-taupe'
      }`}
    >
      <RefreshCw size={14} />
      {reordered === orderId ? 'Ajouté au panier ✓' : 'Recommander cette commande'}
    </button>
  );
}

function OrderDetail({ order, onBack, onReorder, reordered, client }: {
  order: Order;
  onBack: () => void;
  onReorder: (id: string) => void;
  reordered: string | null;
  client: ReturnType<typeof useAuth>['client'];
}) {
  const [copied, setCopied] = useState(false);
  const [showBdc, setShowBdc] = useState(false);

  const handleCopy = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const paymentDays = client?.paymentTerms?.paymentDays;

  // Due date for deferred payers
  const dueDateLabel = (() => {
    if (!paymentDays || order.paymentStatus === 'paid') return null;
    const due = new Date(order.orderDate);
    due.setDate(due.getDate() + paymentDays);
    return due.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  })();

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-courier text-sm text-brand-taupe hover:text-brand-dark uppercase tracking-brand transition-colors"
      >
        <ArrowLeft size={14} /> Retour aux commandes
      </button>

      {/* Prominent tracking box */}
      {order.trackingNumber && (
        <div className="bg-blue-50 border border-blue-200 px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={15} className="text-blue-600" />
            <span className="font-courier text-sm text-blue-800 uppercase tracking-brand-wide font-semibold">
              Suivi de livraison
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-courier text-lg text-blue-900 font-semibold tracking-widest">
              {order.trackingNumber}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 font-courier text-xs text-blue-600 hover:text-blue-800 border border-blue-300 bg-white px-2 py-1 transition-colors"
              title="Copier le numéro de suivi"
            >
              {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>
          {order.status === 'shipped' && order.estimatedDelivery && (
            <p className="font-courier text-sm text-blue-700 mt-2">
              Livraison estimée :{' '}
              <strong>
                {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </strong>
            </p>
          )}
          {order.status === 'delivered' && order.deliveryDate && (
            <p className="font-courier text-sm text-green-700 mt-2">
              Livré le{' '}
              <strong>
                {new Date(order.deliveryDate).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Immediate payer — pending payment banner */}
      {!paymentDays && order.paymentStatus === 'pending' && (
        <div className="bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-courier text-sm text-amber-800 font-semibold">
              En attente de votre justificatif de paiement
            </p>
            <p className="font-courier text-xs text-amber-700 mt-1 leading-relaxed">
              Envoyez votre justificatif à{' '}
              <strong>commercial@synzyn.ma</strong>{' '}
              en mentionnant le n° <strong>{order.orderNumber}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Deferred payer — pending or overdue payment banner */}
      {paymentDays && (order.paymentStatus === 'pending' || order.paymentStatus === 'overdue') && dueDateLabel && (
        <div className={`border px-5 py-4 flex items-start gap-3 ${
          order.paymentStatus === 'overdue'
            ? 'bg-red-50 border-red-200'
            : 'bg-amber-50 border-amber-200'
        }`}>
          <AlertCircle size={16} className={`flex-shrink-0 mt-0.5 ${order.paymentStatus === 'overdue' ? 'text-red-500' : 'text-amber-600'}`} />
          <div>
            <p className={`font-courier text-sm font-semibold ${order.paymentStatus === 'overdue' ? 'text-red-800' : 'text-amber-800'}`}>
              {order.paymentStatus === 'overdue' ? 'Paiement en retard' : 'Paiement différé'}
            </p>
            <p className={`font-courier text-xs mt-1 ${order.paymentStatus === 'overdue' ? 'text-red-700' : 'text-amber-700'}`}>
              {order.paymentStatus === 'overdue'
                ? `Échéance dépassée — était due le ${dueDateLabel}`
                : `Date d'échéance : ${dueDateLabel}`}
            </p>
          </div>
        </div>
      )}

      {/* Header card */}
      <div className="bg-white border border-brand-beige p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="font-courier text-xl text-brand-dark uppercase tracking-brand-wide mb-2">
              {order.orderNumber}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`font-courier text-xs uppercase tracking-brand px-2.5 py-1 border ${statusColors[order.status]}`}>
                {statusLabels[order.status]}
              </span>
              <span className={`font-courier text-sm tracking-brand ${paymentStatusColors[order.paymentStatus]}`}>
                {paymentStatusLabels[order.paymentStatus]}
              </span>
            </div>
            <p className="font-courier text-sm text-brand-taupe tracking-brand">
              Commandé le {new Date(order.orderDate).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
            {order.deliveryDate && (
              <p className="font-courier text-sm text-green-700 tracking-brand mt-0.5">
                Livré le {new Date(order.deliveryDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            )}
            {order.estimatedDelivery && order.status === 'shipped' && (
              <p className="font-courier text-sm text-blue-700 tracking-brand mt-0.5">
                Livraison estimée: {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setShowBdc(true)}
              className="flex items-center gap-2 border border-brand-dark text-brand-dark font-courier text-sm uppercase tracking-brand px-4 py-2.5 hover:bg-brand-dark hover:text-brand-cream transition-colors"
            >
              <FileDown size={14} />
              Bon de commande
            </button>
            <ReorderButton orderId={order.id} onReorder={onReorder} reordered={reordered} />
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white border border-brand-beige">
        <div className="px-5 py-4 border-b border-brand-beige flex items-center justify-between">
          <h3 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
            Articles commandés ({order.items.length})
          </h3>
          <span className="font-courier text-sm text-brand-dark font-semibold">{formatPrice(order.total)} TTC</span>
        </div>

        <div className="divide-y divide-brand-beige">
          {order.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div key={`${item.productId}-${item.packFormat}`} className="px-5 py-4 flex items-center gap-4">
                <div
                  className="w-14 h-16 flex-shrink-0 rounded-sm shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: (product?.imageColor || '#A28B83') + '30' }}
                >
                  <div
                    className="w-8 h-11 rounded-sm"
                    style={{ backgroundColor: product?.imageColor || '#A28B83' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-courier text-sm text-brand-dark">{item.productName}</p>
                  <p className="font-courier text-xs text-brand-taupe tracking-brand mt-0.5">
                    {product?.subCategory} — {product?.category.replace('-', ' ')}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-2 py-0.5">
                      {packLabels[item.packFormat]}
                    </span>
                    <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-2 py-0.5">
                      Qté: {item.quantity}
                    </span>
                    <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-2 py-0.5">
                      {formatPrice(item.unitPrice)} / u
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-courier text-sm text-brand-dark font-semibold">{formatPrice(item.totalPrice)}</p>
                  <p className="font-courier text-xs text-brand-taupe/60 mt-0.5">{item.quantity} × {formatPrice(item.unitPrice)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="px-5 py-4 border-t border-brand-beige bg-brand-cream space-y-1.5">
          <div className="flex justify-between font-courier text-sm text-brand-taupe">
            <span>Sous-total HT</span><span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between font-courier text-sm text-brand-taupe">
            <span>TVA 20%</span><span>{formatPrice(order.vatAmount)}</span>
          </div>
          <div className="flex justify-between font-courier text-base text-brand-dark font-semibold border-t border-brand-beige pt-2 mt-1">
            <span>Total TTC</span><span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Delivery + payment info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-brand-beige p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={15} className="text-brand-taupe" />
            <h4 className="font-courier text-sm text-brand-dark uppercase tracking-brand">Livraison</h4>
          </div>
          <p className="font-courier text-sm text-brand-taupe">{order.deliveryAddress.label}</p>
          <p className="font-courier text-sm text-brand-taupe">{order.deliveryAddress.street}</p>
          <p className="font-courier text-sm text-brand-taupe">{order.deliveryAddress.city}</p>
          {order.trackingNumber && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-beige">
              <Truck size={13} className="text-brand-taupe" />
              <span className="font-courier text-xs text-brand-taupe">{order.trackingNumber}</span>
            </div>
          )}
          {order.notes && (
            <p className="font-courier text-xs text-brand-taupe/70 mt-2 italic">Note: {order.notes}</p>
          )}
        </div>

        <div className="bg-white border border-brand-beige p-5">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={15} className="text-brand-taupe" />
            <h4 className="font-courier text-sm text-brand-dark uppercase tracking-brand">Paiement</h4>
          </div>
          <p className="font-courier text-sm text-brand-taupe">
            {paymentMethodLabels[order.paymentMethod] || order.paymentMethod}
          </p>
          <p className={`font-courier text-sm mt-1 ${paymentStatusColors[order.paymentStatus]}`}>
            {paymentStatusLabels[order.paymentStatus]}
          </p>
          {order.invoiceId && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-beige">
              <FileText size={13} className="text-brand-taupe" />
              <span className="font-courier text-xs text-brand-taupe">Facture: {order.invoiceId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom reorder button */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 pb-4">
        <button
          onClick={() => setShowBdc(true)}
          className="flex items-center justify-center gap-2 border border-brand-dark text-brand-dark font-courier text-sm uppercase tracking-brand px-6 py-3 hover:bg-brand-dark hover:text-brand-cream transition-colors"
        >
          <FileDown size={14} />
          Télécharger le bon de commande (PDF)
        </button>
        <ReorderButton orderId={order.id} onReorder={onReorder} reordered={reordered} />
      </div>

      {/* Bon de commande modal */}
      {showBdc && client && (
        <BonDeCommande
          order={order}
          client={client}
          onClose={() => setShowBdc(false)}
        />
      )}
    </div>
  );
}

export default function Orders() {
  const { client } = useAuth();
  const { addItem } = useCart();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [reordered, setReordered] = useState<string | null>(null);

  const orders = getOrdersByClientId(client?.id || '');
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  const handleReorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || !client) return;
    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      const contractProduct = client.contractProducts.find((cp) => cp.productId === item.productId);
      if (product && contractProduct) {
        addItem(product, contractProduct, item.packFormat, item.quantity);
      }
    });
    setReordered(orderId);
    setTimeout(() => setReordered(null), 3000);
  };

  /* Show order detail view */
  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onBack={() => setSelectedOrderId(null)}
        onReorder={handleReorder}
        reordered={reordered}
        client={client}
      />
    );
  }

  /* Orders list view */
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Mes commandes</h2>
        <span className="font-courier text-xs text-brand-taupe tracking-brand">{orders.length} commande(s)</span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-brand-beige p-10 text-center">
          <p className="font-courier text-sm text-brand-taupe">Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrderId(order.id)}
              className="w-full bg-white border border-brand-beige hover:border-brand-taupe transition-colors text-left group"
            >
              <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-courier text-base text-brand-dark group-hover:text-brand-taupe transition-colors">
                      {order.orderNumber}
                    </span>
                    <span className={`font-courier text-xs uppercase tracking-brand px-2.5 py-0.5 border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                    <span className={`font-courier text-xs tracking-brand ${paymentStatusColors[order.paymentStatus]}`}>
                      {paymentStatusLabels[order.paymentStatus]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-0.5">
                    <span className="font-courier text-xs text-brand-taupe tracking-brand">
                      {new Date(order.orderDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="font-courier text-xs text-brand-taupe tracking-brand">
                      {order.items.length} article(s)
                    </span>
                    <span className="font-courier text-sm text-brand-dark font-medium">
                      {formatPrice(order.total)} TTC
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Truck size={11} className="text-brand-taupe" />
                      <span className="font-courier text-xs text-brand-taupe tracking-brand">
                        {order.trackingNumber}
                      </span>
                    </div>
                  )}
                  {order.deliveryDate && (
                    <p className="font-courier text-xs text-green-700 tracking-brand mt-0.5">
                      Livré le {new Date(order.deliveryDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  {order.estimatedDelivery && order.status === 'shipped' && (
                    <p className="font-courier text-xs text-blue-700 tracking-brand mt-0.5">
                      Livraison estimée: {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-courier text-xs text-brand-taupe/60 uppercase tracking-brand group-hover:text-brand-dark transition-colors">
                    Voir le détail →
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleReorder(order.id); }}
                    className={`flex items-center gap-1.5 font-courier text-xs uppercase tracking-brand px-3 py-2 transition-colors ${
                      reordered === order.id
                        ? 'bg-green-600 text-white'
                        : 'bg-brand-dark text-brand-cream hover:bg-brand-taupe'
                    }`}
                  >
                    <RefreshCw size={11} />
                    {reordered === order.id ? 'Ajouté ✓' : 'Recommander'}
                  </button>
                </div>
              </div>

              {/* Mini product strip */}
              <div className="px-5 pb-4 flex gap-1.5 overflow-hidden">
                {order.items.slice(0, 5).map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={`${item.productId}-${item.packFormat}`}
                      className="w-8 h-8 flex-shrink-0 rounded-sm"
                      style={{ backgroundColor: (product?.imageColor || '#A28B83') + '50' }}
                      title={item.productName}
                    />
                  );
                })}
                {order.items.length > 5 && (
                  <div className="w-8 h-8 flex-shrink-0 rounded-sm bg-brand-beige flex items-center justify-center">
                    <span className="font-courier text-xs text-brand-taupe">+{order.items.length - 5}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
