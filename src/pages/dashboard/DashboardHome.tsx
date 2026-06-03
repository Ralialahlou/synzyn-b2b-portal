import { Link } from 'react-router-dom';
import { ShoppingBag, PackageCheck, ArrowRight, RefreshCw, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getOrdersByClientId } from '../../data/orders';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

const formatPrice = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`;

const statusColors: Record<string, string> = {
  delivered: 'text-green-700 bg-green-50',
  shipped: 'text-blue-700 bg-blue-50',
  processing: 'text-yellow-700 bg-yellow-50',
  confirmed: 'text-yellow-700 bg-yellow-50',
  pending: 'text-brand-taupe bg-brand-cream',
  cancelled: 'text-red-600 bg-red-50',
};
const statusLabels: Record<string, string> = {
  delivered: 'Livré',
  shipped: 'Expédié',
  processing: 'En préparation',
  confirmed: 'Confirmé',
  pending: 'En attente',
  cancelled: 'Annulé',
};
const paymentStatusLabels: Record<string, string> = {
  paid: 'Payé',
  pending: 'En attente',
  partial: 'Partiel',
  overdue: 'En retard',
};
const paymentStatusColors: Record<string, string> = {
  paid: 'text-green-700',
  pending: 'text-brand-taupe',
  partial: 'text-yellow-700',
  overdue: 'text-red-600',
};

export default function DashboardHome() {
  const { client } = useAuth();
  const { addItem } = useCart();
  const orders = getOrdersByClientId(client?.id || '');
  const recentOrders = orders.slice(0, 3);

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
  };

  const pendingOrders = orders.filter((o) => ['pending', 'confirmed', 'processing', 'shipped'].includes(o.status)).length;
  const contractProductCount = client?.contractProducts.length || 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: ShoppingBag, label: 'Commandes', value: orders.length },
          { icon: Clock, label: 'En cours', value: pendingOrders },
          { icon: PackageCheck, label: 'Produits contrat', value: contractProductCount },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white border border-brand-beige p-4">
            <Icon size={16} className="text-brand-taupe mb-2" />
            <div className="font-courier text-brand-dark text-xl">{value}</div>
            <div className="font-courier text-xs text-brand-taupe uppercase tracking-brand mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-brand-beige">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-beige">
          <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Commandes récentes</h2>
          <Link to="/dashboard/orders" className="flex items-center gap-1 font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand">
            Voir tout <ArrowRight size={10} />
          </Link>
        </div>
        <div className="divide-y divide-brand-beige">
          {recentOrders.map((order) => (
            <div key={order.id} className="px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-courier text-xs text-brand-dark">{order.orderNumber}</span>
                    <span className={`font-courier text-xs uppercase tracking-brand px-1.5 py-0.5 ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                    <span className={`font-courier text-xs ${paymentStatusColors[order.paymentStatus]}`}>
                      {paymentStatusLabels[order.paymentStatus]}
                    </span>
                  </div>
                  <p className="font-courier text-xs text-brand-taupe tracking-brand mt-1">
                    {order.items.length} article(s) · {formatPrice(order.total)} TTC
                  </p>
                  <p className="font-courier text-xs text-brand-taupe/60 tracking-brand mt-0.5">
                    {new Date(order.orderDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {order.trackingNumber && (
                    <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-2 py-1 uppercase tracking-brand">
                      {order.trackingNumber}
                    </span>
                  )}
                  <button
                    onClick={() => handleReorder(order.id)}
                    className="flex items-center gap-1.5 btn-secondary py-1.5 px-3 text-xs"
                  >
                    <RefreshCw size={11} />
                    Recommander
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract products quick order */}
      <div className="bg-white border border-brand-beige">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-beige">
          <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Mes produits contractualisés</h2>
          <Link to="/dashboard/contract" className="flex items-center gap-1 font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand">
            Tout voir <ArrowRight size={10} />
          </Link>
        </div>
        <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {client?.contractProducts.slice(0, 4).map((cp) => {
            const product = products.find((p) => p.id === cp.productId);
            if (!product) return null;
            return (
              <div key={cp.productId} className="flex items-center gap-3 border border-brand-beige p-3">
                <div
                  className="w-10 h-10 flex-shrink-0 rounded-sm"
                  style={{ backgroundColor: product.imageColor + '40' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-courier text-xs text-brand-dark truncate">{product.name}</p>
                  <p className="font-courier text-xs text-brand-taupe tracking-brand">
                    {cp.price.unit.toFixed(2)} MAD/u · MOQ {cp.moq}
                  </p>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand flex-shrink-0"
                >
                  Commander →
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commercial contact */}
      <div className="bg-brand-dark text-brand-cream p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Votre commercial dédié</p>
          <p className="font-courier text-sm text-brand-cream">{client?.assignedRep.name}</p>
          <p className="font-courier text-xs text-brand-taupe tracking-brand">{client?.assignedRep.role}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={`mailto:${client?.assignedRep.email}`}
            className="btn-outline-light text-xs py-2 px-4"
          >
            Email
          </a>
          <a
            href={`https://wa.me/${client?.assignedRep.whatsapp?.replace(/\s/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light text-xs py-2 px-4"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
