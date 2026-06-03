import { X, Printer } from 'lucide-react';
import type { Client, Order } from '../../types';

interface Props {
  order: Order;
  client: Client;
  onClose: () => void;
}

const packLabels: Record<string, string> = { unit: 'Unité', box: 'Boîte', carton: 'Carton' };
const fmtDateLong = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

export default function BonDeCommande({ order, client, onClose }: Props) {
  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @media print {
          body > * { display: none !important; }
          #bdc-print-root { display: block !important; position: static !important; }
        }
      `}</style>

      <div
        id="bdc-print-root"
        className="bg-white w-full max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-brand-beige px-6 py-3 print:hidden bg-brand-cream">
          <div>
            <span className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
              Bon de commande
            </span>
            <span className="font-courier text-sm text-brand-taupe ml-2">— {order.orderNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-brand-dark text-brand-cream px-4 py-2 font-courier text-xs uppercase tracking-brand hover:bg-brand-taupe transition-colors"
            >
              <Printer size={13} />
              Imprimer / PDF
            </button>
            <button onClick={onClose} className="text-brand-taupe hover:text-brand-dark p-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Document */}
        <div className="p-8 md:p-10 space-y-7">

          {/* Logos header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-brand-dark">
            {/* Client logo */}
            <div className="w-36 h-16 border-2 border-dashed border-brand-beige flex items-center justify-center bg-brand-cream/50">
              <span className="font-courier text-xs text-brand-taupe text-center leading-tight px-2">
                LOGO CLIENT
              </span>
            </div>
            {/* SYN+ZYN */}
            <div className="text-right">
              <p className="font-courier text-2xl text-brand-dark tracking-widest font-bold">SYN+ZYN</p>
              <p className="font-courier text-xs text-brand-taupe tracking-brand-wider uppercase">Portail B2B</p>
              <p className="font-courier text-xs text-brand-taupe/60 mt-0.5">commercial@synzyn.ma</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="font-courier text-3xl text-brand-dark uppercase tracking-widest border-b-2 border-brand-dark pb-3 inline-block px-6">
              BON DE COMMANDE
            </h2>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-0 border border-brand-beige">
            {/* Client */}
            <div className="p-5 border-r border-brand-beige">
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide mb-3 border-b border-brand-beige pb-2">
                Client
              </p>
              <p className="font-courier text-base text-brand-dark font-semibold mb-1">
                {client.companyName}
              </p>
              <p className="font-courier text-sm text-brand-taupe">Code client: {client.clientCode}</p>
              <p className="font-courier text-sm text-brand-taupe">ICE: {client.ice}</p>
              <p className="font-courier text-sm text-brand-taupe">RC: {client.rc}</p>
              <p className="font-courier text-sm text-brand-taupe mt-1">
                {client.address}, {client.city}
              </p>
            </div>
            {/* Order meta */}
            <div className="p-5">
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide mb-3 border-b border-brand-beige pb-2">
                Commande
              </p>
              <p className="font-courier text-base text-brand-dark font-semibold mb-1">
                N° {order.orderNumber}
              </p>
              <p className="font-courier text-sm text-brand-taupe">
                Date: {fmtDateLong(order.orderDate)}
              </p>
              <p className="font-courier text-sm text-brand-taupe">
                Livraison: {order.deliveryAddress.label}
              </p>
              <p className="font-courier text-sm text-brand-taupe">
                {order.deliveryAddress.street}, {order.deliveryAddress.city}
              </p>
            </div>
          </div>

          {/* Items table */}
          <table className="w-full border border-brand-beige">
            <thead>
              <tr className="bg-brand-dark text-brand-cream">
                <th className="text-left px-4 py-2.5 font-courier text-xs uppercase tracking-brand">Produit</th>
                <th className="text-center px-3 py-2.5 font-courier text-xs uppercase tracking-brand">Format</th>
                <th className="text-center px-3 py-2.5 font-courier text-xs uppercase tracking-brand">Qté</th>
                <th className="text-right px-3 py-2.5 font-courier text-xs uppercase tracking-brand">Prix unit. HT</th>
                <th className="text-right px-4 py-2.5 font-courier text-xs uppercase tracking-brand">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-brand-beige last:border-0"
                  style={{ backgroundColor: i % 2 === 0 ? 'white' : '#FAF8F5' }}
                >
                  <td className="px-4 py-3 font-courier text-sm text-brand-dark">{item.productName}</td>
                  <td className="px-3 py-3 text-center font-courier text-sm text-brand-taupe">
                    {packLabels[item.packFormat] || item.packFormat}
                  </td>
                  <td className="px-3 py-3 text-center font-courier text-sm text-brand-dark font-semibold">
                    {item.quantity}
                  </td>
                  <td className="px-3 py-3 text-right font-courier text-sm text-brand-dark">
                    {item.unitPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                  </td>
                  <td className="px-4 py-3 text-right font-courier text-sm text-brand-dark font-semibold">
                    {item.totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-72 border border-brand-beige">
              {[
                { label: 'Sous-total HT', val: order.subtotal, bold: false },
                { label: 'TVA 20%', val: order.vatAmount, bold: false },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between px-4 py-2 border-b border-brand-beige font-courier text-sm text-brand-taupe">
                  <span>{label}</span>
                  <span>{val.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 font-courier text-base text-brand-dark font-bold bg-brand-cream">
                <span>TOTAL TTC</span>
                <span>{order.total.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="border border-brand-beige p-4 bg-brand-cream/40">
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Notes</p>
              <p className="font-courier text-sm text-brand-dark">{order.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t-2 border-brand-dark pt-4 flex items-center justify-between">
            <p className="font-courier text-xs text-brand-taupe">
              Généré le {today} — SYN+ZYN B2B Portal
            </p>
            <p className="font-courier text-xs text-brand-taupe">
              KAK SYNERGY SA · IF: 52426360 · RC: 542021
            </p>
          </div>

          {/* Signature blocks */}
          <div className="grid grid-cols-2 gap-8 pt-4">
            {['Bon pour accord — Client', 'Validé par — SYN+ZYN'].map((label) => (
              <div key={label} className="border border-brand-beige p-4">
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-8">{label}</p>
                <div className="border-b border-brand-beige" />
                <p className="font-courier text-xs text-brand-taupe/50 mt-1">Signature & cachet</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
