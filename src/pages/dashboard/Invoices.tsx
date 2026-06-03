import { Download, FileText, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInvoicesByClientId } from '../../data/orders';
import type { Invoice } from '../../types';

const formatPrice = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`;
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

const statusColors: Record<string, string> = {
  paid: 'text-green-700 bg-green-50 border-green-200',
  pending: 'text-brand-taupe bg-brand-cream border-brand-beige',
  overdue: 'text-red-600 bg-red-50 border-red-200',
};
const statusLabels: Record<string, string> = {
  paid: 'Payée',
  pending: 'En attente',
  overdue: 'En retard',
};

function getDueDateLabel(invoice: Invoice): { text: string; colorClass: string } {
  if (invoice.status === 'paid') {
    return {
      text: `Payée le ${formatDate(invoice.issueDate)}`,
      colorClass: 'text-green-700',
    };
  }
  if (invoice.status === 'overdue') {
    const today = new Date();
    const due = new Date(invoice.dueDate);
    const diffDays = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    return {
      text: `En retard depuis ${diffDays} jour(s) — était due le ${formatDate(invoice.dueDate)}`,
      colorClass: 'text-red-600 font-semibold',
    };
  }
  // pending
  const today = new Date();
  const due = new Date(invoice.dueDate);
  const diffDays = Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 30) {
    return {
      text: `Échéance dans ${diffDays} jour(s) (le ${formatDate(invoice.dueDate)})`,
      colorClass: 'text-yellow-700',
    };
  }
  return {
    text: `Échéance le ${formatDate(invoice.dueDate)}`,
    colorClass: 'text-brand-taupe',
  };
}

export default function Invoices() {
  const { client } = useAuth();
  const invoices = getInvoicesByClientId(client?.id || '');
  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Mes factures</h2>
        <span className="font-courier text-xs text-brand-taupe tracking-brand">{invoices.length} facture(s)</span>
      </div>

      {overdueCount > 0 && (
        <div className="bg-red-600 px-5 py-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-courier text-sm text-white font-semibold">
              Vous avez {overdueCount} facture(s) en retard de paiement.
            </p>
            <p className="font-courier text-xs text-red-100 mt-1 leading-relaxed">
              Contactez votre commercial ou effectuez votre virement à{' '}
              <strong className="text-white">commercial@synzyn.ma</strong>
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border border-brand-beige">
        <div className="px-5 py-4 border-b border-brand-beige hidden md:grid md:grid-cols-6 gap-4">
          {['Numéro', 'Date émission', 'Échéance', 'Montant TTC', 'Statut', 'Action'].map((h) => (
            <span key={h} className="font-courier text-xs text-brand-taupe uppercase tracking-brand">{h}</span>
          ))}
        </div>

        <div className="divide-y divide-brand-beige">
          {invoices.map((inv) => (
            <div key={inv.id} className="px-5 py-4">
              {/* Mobile layout */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-courier text-xs text-brand-dark">{inv.invoiceNumber}</span>
                  <span className={`font-courier text-xs uppercase tracking-brand px-2 py-0.5 border ${statusColors[inv.status]}`}>
                    {statusLabels[inv.status]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-courier text-xs text-brand-taupe">Émise: {new Date(inv.issueDate).toLocaleDateString('fr-FR')}</span>
                  <span className={`font-courier text-xs ${getDueDateLabel(inv).colorClass}`}>
                    {getDueDateLabel(inv).text}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-courier text-sm text-brand-dark font-semibold">{formatPrice(inv.total)}</span>
                  <button className="flex items-center gap-1 btn-secondary py-1.5 px-3 text-xs">
                    <Download size={11} />PDF
                  </button>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FileText size={12} className="text-brand-taupe flex-shrink-0" />
                  <span className="font-courier text-xs text-brand-dark">{inv.invoiceNumber}</span>
                </div>
                <span className="font-courier text-xs text-brand-taupe">
                  {new Date(inv.issueDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
                <span className={`font-courier text-xs ${getDueDateLabel(inv).colorClass}`}>
                  {getDueDateLabel(inv).text}
                </span>
                <span className="font-courier text-xs text-brand-dark font-semibold">{formatPrice(inv.total)}</span>
                <span className={`font-courier text-xs uppercase tracking-brand px-2 py-0.5 border inline-block ${statusColors[inv.status]}`}>
                  {statusLabels[inv.status]}
                </span>
                <button className="flex items-center gap-1.5 font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand border border-brand-beige px-2.5 py-1.5 hover:bg-brand-cream transition-colors">
                  <Download size={10} />
                  Télécharger PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-cream border border-brand-beige px-4 py-3">
        {!client?.paymentTerms?.paymentDays ? (
          <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
            En tant que client à paiement immédiat, vos factures sont générées après réception de votre justificatif.
            Envoyez votre virement/chèque à{' '}
            <strong className="text-brand-dark">commercial@synzyn.ma</strong>.
          </p>
        ) : (
          <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
            Vos conditions contractuelles vous accordent{' '}
            <strong className="text-brand-dark">{client.paymentTerms.paymentDays} jours</strong>{' '}
            pour régler chaque facture après livraison.
          </p>
        )}
      </div>
    </div>
  );
}
