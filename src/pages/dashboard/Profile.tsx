import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  FileText,
  Download,
  Upload,
  X,
  Printer,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInvoicesByClientId, getOrdersByClientId } from '../../data/orders';

// ---------------------------------------------------------------------------
// Label maps
// ---------------------------------------------------------------------------

const typeLabels: Record<string, string> = {
  pharmacy: 'Pharmacie',
  retail: 'Grande surface / Retail',
  spa: 'Spa / Institut de beauté',
  clinic: 'Clinique / Cabinet médical',
  distributor: 'Distributeur / Grossiste',
};

const paymentMethodLabels: Record<string, string> = {
  'bank-transfer': 'Virement bancaire',
  card: 'Carte bancaire',
  'cod-check': 'À la livraison — Chèque',
  'cod-cash': 'À la livraison — Espèces',
  'credit-terms': 'Crédit client',
};

// ---------------------------------------------------------------------------
// Helper: format date in French
// ---------------------------------------------------------------------------
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const fmtDateLong = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------
type Tab = 'profil' | 'legal' | 'documents';
type DocSub = 'factures' | 'bons';

// ---------------------------------------------------------------------------
// Invoice status badge
// ---------------------------------------------------------------------------
function InvoiceStatusBadge({ status }: { status: 'paid' | 'pending' | 'overdue' }) {
  const map = {
    paid: 'bg-green-100 text-green-800 border border-green-300',
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    overdue: 'bg-red-100 text-red-800 border border-red-300',
  };
  const labels = { paid: 'Payé', pending: 'En attente', overdue: 'En retard' };
  return (
    <span className={`font-courier text-xs px-2 py-0.5 ${map[status]}`}>
      {labels[status]}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Bon de commande modal
// ---------------------------------------------------------------------------
interface BonModalProps {
  order: ReturnType<typeof getOrdersByClientId>[number];
  client: NonNullable<ReturnType<typeof useAuth>['client']>;
  onClose: () => void;
}

function BonDeCommandeModal({ order, client, onClose }: BonModalProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Print: hide everything except this panel */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #bon-print-area { display: block !important; position: static !important; }
        }
      `}</style>

      <div
        id="bon-print-area"
        className="bg-white w-full max-w-3xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal toolbar */}
        <div className="flex items-center justify-between border-b border-brand-beige px-6 py-3 print:hidden">
          <span className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
            Bon de commande — {order.orderNumber}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border border-brand-dark px-3 py-1.5 font-courier text-xs text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
            >
              <Printer size={13} />
              Imprimer / Télécharger PDF
            </button>
            <button
              onClick={onClose}
              className="text-brand-taupe hover:text-brand-dark transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Document body */}
        <div className="p-8 space-y-6">
          {/* Header row: logos */}
          <div className="flex items-start justify-between border-b border-brand-beige pb-6">
            {/* Client logo placeholder */}
            <div className="w-32 h-16 border-2 border-dashed border-brand-beige flex items-center justify-center">
              <span className="font-courier text-xs text-brand-taupe text-center leading-tight">
                [LOGO CLIENT]
              </span>
            </div>
            {/* SYN+ZYN logo placeholder */}
            <div className="text-right">
              <p className="font-courier text-xl text-brand-dark tracking-widest">SYN+ZYN</p>
              <p className="font-courier text-xs text-brand-taupe tracking-brand">B2B PORTAL</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="font-courier text-2xl text-brand-dark uppercase tracking-widest">
              Bon de commande
            </h2>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-6 border border-brand-beige p-4">
            <div className="space-y-2">
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">
                Client
              </p>
              <p className="font-courier text-sm text-brand-dark font-semibold">
                {client.companyName}
              </p>
              <p className="font-courier text-sm text-brand-dark">ICE : {client.ice}</p>
              <p className="font-courier text-sm text-brand-dark">RC : {client.rc}</p>
              <p className="font-courier text-sm text-brand-dark">
                {client.address}, {client.city}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">
                Commande
              </p>
              <p className="font-courier text-sm text-brand-dark">
                N° : <span className="font-semibold">{order.orderNumber}</span>
              </p>
              <p className="font-courier text-sm text-brand-dark">
                Date : {fmtDateLong(order.orderDate)}
              </p>
              <p className="font-courier text-sm text-brand-dark">
                Code client : {client.clientCode}
              </p>
            </div>
          </div>

          {/* Items table */}
          <div>
            <table className="w-full border border-brand-beige text-sm font-courier">
              <thead>
                <tr className="bg-brand-beige/40">
                  <th className="text-left px-3 py-2 font-courier text-xs text-brand-taupe uppercase tracking-brand border-b border-brand-beige">
                    Produit
                  </th>
                  <th className="text-center px-3 py-2 font-courier text-xs text-brand-taupe uppercase tracking-brand border-b border-brand-beige">
                    Format
                  </th>
                  <th className="text-center px-3 py-2 font-courier text-xs text-brand-taupe uppercase tracking-brand border-b border-brand-beige">
                    Qté
                  </th>
                  <th className="text-right px-3 py-2 font-courier text-xs text-brand-taupe uppercase tracking-brand border-b border-brand-beige">
                    Prix unit. HT
                  </th>
                  <th className="text-right px-3 py-2 font-courier text-xs text-brand-taupe uppercase tracking-brand border-b border-brand-beige">
                    Total HT
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-brand-beige/60 last:border-0">
                    <td className="px-3 py-2 text-brand-dark">{item.productName}</td>
                    <td className="px-3 py-2 text-center text-brand-taupe capitalize">
                      {item.packFormat}
                    </td>
                    <td className="px-3 py-2 text-center text-brand-dark">{item.quantity}</td>
                    <td className="px-3 py-2 text-right text-brand-dark">
                      {item.unitPrice.toLocaleString('fr-MA')} MAD
                    </td>
                    <td className="px-3 py-2 text-right text-brand-dark">
                      {item.totalPrice.toLocaleString('fr-MA')} MAD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1 border border-brand-beige p-4">
              <div className="flex justify-between font-courier text-sm text-brand-dark">
                <span>Sous-total HT</span>
                <span>{order.subtotal.toLocaleString('fr-MA')} MAD</span>
              </div>
              <div className="flex justify-between font-courier text-sm text-brand-taupe">
                <span>TVA 20%</span>
                <span>{order.vatAmount.toLocaleString('fr-MA')} MAD</span>
              </div>
              <div className="flex justify-between font-courier text-sm text-brand-dark border-t border-brand-beige pt-2 mt-2 font-semibold">
                <span>Total TTC</span>
                <span>{order.total.toLocaleString('fr-MA')} MAD</span>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="border border-brand-beige p-4">
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">
              Adresse de livraison
            </p>
            <p className="font-courier text-sm text-brand-dark">
              {order.deliveryAddress.label} — {order.deliveryAddress.street},{' '}
              {order.deliveryAddress.city}
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-brand-beige pt-4 flex items-center justify-between">
            <p className="font-courier text-xs text-brand-taupe">
              Généré automatiquement — SYN+ZYN B2B Portal
            </p>
            <p className="font-courier text-xs text-brand-taupe">{today}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function Profile() {
  const { client } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profil');
  const [docSub, setDocSub] = useState<DocSub>('factures');

  // Legal tab state
  const [_showLogoInput, setShowLogoInput] = useState(false); void _showLogoInput;
  const [legalField, setLegalField] = useState('');
  const [legalValue, setLegalValue] = useState('');
  const [legalMsg, setLegalMsg] = useState('');
  const [legalSuccess, setLegalSuccess] = useState(false);

  // Logo upload state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoSaved, setLogoSaved] = useState(false);

  // Bon de commande modal
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  // Facture modal
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  if (!client) return null;

  const invoices = getInvoicesByClientId(client.id);
  const orders = getOrdersByClientId(client.id);
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) ?? null;

  const hasOverdue = invoices.some((inv) => inv.status === 'overdue');

  const handleLegalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLegalSuccess(true);
    setLegalField('');
    setLegalValue('');
    setLegalMsg('');
    setShowLogoInput(false);
    setTimeout(() => setLegalSuccess(false), 5000);
  };

  // ---------------------------------------------------------------------------
  // Tab nav
  // ---------------------------------------------------------------------------
  const tabs: { key: Tab; label: string }[] = [
    { key: 'profil', label: 'Mon profil' },
    { key: 'legal', label: 'Informations légales' },
    { key: 'documents', label: 'Mes documents' },
  ];

  return (
    <div className="space-y-5">
      <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
        Mon compte
      </h2>

      {/* Tab bar */}
      <div className="flex border-b border-brand-beige">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-courier text-sm uppercase tracking-brand px-5 py-2.5 border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-brand-dark text-brand-dark'
                : 'border-transparent text-brand-taupe hover:text-brand-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===================================================================
          TAB 1 — Mon profil
      =================================================================== */}
      {activeTab === 'profil' && (
        <div className="space-y-5">
          {/* Business info */}
          <div className="bg-white border border-brand-beige p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
              Informations de l'entreprise
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  Raison sociale
                </p>
                <p className="font-courier text-sm text-brand-dark">{client.companyName}</p>
              </div>
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  Type de structure
                </p>
                <p className="font-courier text-sm text-brand-dark">{typeLabels[client.type]}</p>
              </div>
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  ICE
                </p>
                <p className="font-courier text-sm text-brand-dark">{client.ice}</p>
              </div>
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  RC
                </p>
                <p className="font-courier text-sm text-brand-dark">{client.rc}</p>
              </div>
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  Code client
                </p>
                <p className="font-courier text-sm text-brand-dark">{client.clientCode}</p>
              </div>
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  Client depuis
                </p>
                <p className="font-courier text-sm text-brand-dark">
                  {fmtDateLong(client.joinedDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white border border-brand-beige p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
              Contact principal
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-brand-taupe flex-shrink-0" />
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    Nom
                  </p>
                  <p className="font-courier text-sm text-brand-dark">{client.contactName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-taupe flex-shrink-0" />
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    Email
                  </p>
                  <p className="font-courier text-sm text-brand-dark">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-taupe flex-shrink-0" />
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    Téléphone
                  </p>
                  <p className="font-courier text-sm text-brand-dark">{client.phone}</p>
                </div>
              </div>
              {client.whatsapp && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-brand-taupe flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                      WhatsApp
                    </p>
                    <p className="font-courier text-sm text-brand-dark">{client.whatsapp}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delivery addresses */}
          <div className="bg-white border border-brand-beige p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
              Adresses de livraison
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {client.deliveryAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`flex items-start gap-3 p-4 border ${
                    addr.isDefault ? 'border-brand-dark' : 'border-brand-beige'
                  }`}
                >
                  <MapPin size={14} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-courier text-sm text-brand-dark">{addr.label}</p>
                      {addr.isDefault && (
                        <span className="font-courier text-xs border border-brand-dark text-brand-dark px-1.5 py-0.5 uppercase tracking-brand">
                          Défaut
                        </span>
                      )}
                    </div>
                    <p className="font-courier text-sm text-brand-taupe">
                      {addr.street}, {addr.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-courier text-xs text-brand-taupe tracking-brand mt-3">
              Pour ajouter ou modifier une adresse, contactez votre commercial.
            </p>
          </div>

          {/* Payment terms */}
          <div className="bg-white border border-brand-beige p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
              Conditions de paiement contractuelles
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                  Commande minimum
                </p>
                <p className="font-courier text-sm text-brand-dark">
                  {client.paymentTerms.minOrderValue.toLocaleString('fr-MA')} MAD HT
                </p>
              </div>
              {client.paymentTerms.paymentDays && (
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                    Délai de paiement
                  </p>
                  <p className="font-courier text-sm text-brand-dark">
                    {client.paymentTerms.paymentDays} jours
                  </p>
                </div>
              )}
              {client.paymentTerms.creditLimit && (
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                    Plafond de crédit
                  </p>
                  <p className="font-courier text-sm text-brand-dark">
                    {client.paymentTerms.creditLimit.toLocaleString('fr-MA')} MAD
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">
                Modes de paiement autorisés
              </p>
              <div className="flex flex-wrap gap-2">
                {client.paymentTerms.allowedMethods.map((method) => (
                  <span
                    key={method}
                    className="flex items-center gap-1.5 border border-brand-beige px-2.5 py-1 font-courier text-sm text-brand-taupe"
                  >
                    <CheckCircle2 size={11} className="text-green-600" />
                    {paymentMethodLabels[method]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sales rep */}
          <div className="bg-brand-dark p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4">
              Votre commercial dédié
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-courier text-sm text-brand-cream">{client.assignedRep.name}</p>
                <p className="font-courier text-sm text-brand-taupe">{client.assignedRep.role}</p>
                <p className="font-courier text-sm text-brand-taupe">{client.assignedRep.email}</p>
                <p className="font-courier text-sm text-brand-taupe">{client.assignedRep.phone}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${client.assignedRep.email}`}
                  className="btn-outline-light text-sm py-2 px-4"
                >
                  Email
                </a>
                <a
                  href={`https://wa.me/${client.assignedRep.whatsapp.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-light text-sm py-2 px-4"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 2 — Informations légales
      =================================================================== */}
      {activeTab === 'legal' && (
        <div className="space-y-5">
          {/* Read-only display */}
          <div className="bg-white border border-brand-beige p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
              Données enregistrées
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                    Raison sociale
                  </p>
                  <p className="font-courier text-sm text-brand-dark">{client.companyName}</p>
                </div>
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                    ICE
                  </p>
                  <p className="font-courier text-sm text-brand-dark">{client.ice}</p>
                </div>
                <div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">
                    RC
                  </p>
                  <p className="font-courier text-sm text-brand-dark">{client.rc}</p>
                </div>
              </div>
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">
                  Logo de l'entreprise
                </p>

                {/* Logo preview — shows either the uploaded preview or a placeholder */}
                <div className="w-44 h-24 border-2 border-dashed border-brand-beige flex items-center justify-center bg-brand-cream/40 overflow-hidden mb-3">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Aperçu logo"
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  ) : (
                    <span className="font-courier text-xs text-brand-taupe text-center leading-snug px-3">
                      Votre logo apparaîtra ici
                    </span>
                  )}
                </div>

                {/* Upload button */}
                <label className="cursor-pointer flex items-center gap-2 border border-brand-beige px-3 py-1.5 font-courier text-sm text-brand-taupe hover:border-brand-dark hover:text-brand-dark transition-colors w-fit">
                  <Upload size={13} />
                  {logoPreview ? 'Changer le logo' : 'Télécharger votre logo'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setLogoFile(file);
                      setLogoSaved(false);
                      const reader = new FileReader();
                      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
                      reader.readAsDataURL(file);
                      setShowLogoInput(true);
                    }}
                  />
                </label>

                {/* Save button — only visible after selecting a file */}
                {logoFile && !logoSaved && (
                  <button
                    onClick={() => {
                      // In a real app: POST the file to the backend here
                      setLogoSaved(true);
                      setLogoFile(null);
                      setTimeout(() => setLogoSaved(false), 3000);
                    }}
                    className="mt-2 flex items-center gap-2 bg-brand-dark text-brand-cream px-4 py-1.5 font-courier text-sm uppercase tracking-brand hover:bg-brand-taupe transition-colors"
                  >
                    <CheckCircle2 size={13} />
                    Sauvegarder le logo
                  </button>
                )}

                {/* Success confirmation */}
                {logoSaved && (
                  <div className="mt-2 flex items-center gap-2 border border-green-300 bg-green-50 px-3 py-1.5">
                    <CheckCircle2 size={13} className="text-green-600" />
                    <span className="font-courier text-sm text-green-700">Logo sauvegardé avec succès.</span>
                  </div>
                )}

                <p className="font-courier text-xs text-brand-taupe/60 mt-2">
                  Formats acceptés : PNG, JPG, SVG — Max 2 Mo
                </p>
              </div>
            </div>
          </div>

          {/* Info note */}
          <div className="border border-brand-beige/80 bg-brand-beige/20 px-4 py-3">
            <p className="font-courier text-sm text-brand-taupe leading-relaxed">
              Ces informations apparaissent sur vos factures et bons de commande. Toute
              modification est soumise à validation par votre commercial.
            </p>
          </div>

          {/* Change request form */}
          <div className="bg-white border border-brand-beige p-5">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4 border-b border-brand-beige pb-2">
              Demander une modification
            </h3>

            {legalSuccess ? (
              <div className="flex items-center gap-3 border border-green-300 bg-green-50 px-4 py-3">
                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                <p className="font-courier text-sm text-green-800">
                  Votre demande a été transmise à votre commercial. Vous serez contacté sous 48h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLegalSubmit} className="space-y-4">
                <div>
                  <label className="font-courier text-xs text-brand-taupe uppercase tracking-brand block mb-1">
                    Champ à modifier
                  </label>
                  <select
                    required
                    value={legalField}
                    onChange={(e) => setLegalField(e.target.value)}
                    className="w-full border border-brand-beige px-3 py-2 font-courier text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-dark"
                  >
                    <option value="">— Sélectionner —</option>
                    <option value="raison-sociale">Raison sociale</option>
                    <option value="ice">ICE</option>
                    <option value="rc">RC</option>
                    <option value="logo">Logo</option>
                  </select>
                </div>

                {legalField && legalField !== 'logo' && (
                  <div>
                    <label className="font-courier text-xs text-brand-taupe uppercase tracking-brand block mb-1">
                      Nouvelle valeur
                    </label>
                    <input
                      type="text"
                      required
                      value={legalValue}
                      onChange={(e) => setLegalValue(e.target.value)}
                      placeholder="Nouvelle valeur..."
                      className="w-full border border-brand-beige px-3 py-2 font-courier text-sm text-brand-dark focus:outline-none focus:border-brand-dark"
                    />
                  </div>
                )}

                {legalField === 'logo' && (
                  <div>
                    <label className="font-courier text-xs text-brand-taupe uppercase tracking-brand block mb-1">
                      Nouveau logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      className="block font-courier text-sm text-brand-taupe"
                    />
                  </div>
                )}

                <div>
                  <label className="font-courier text-xs text-brand-taupe uppercase tracking-brand block mb-1">
                    Justificatif (optionnel)
                  </label>
                  <input
                    type="file"
                    className="block font-courier text-sm text-brand-taupe"
                  />
                </div>

                <div>
                  <label className="font-courier text-xs text-brand-taupe uppercase tracking-brand block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={legalMsg}
                    onChange={(e) => setLegalMsg(e.target.value)}
                    placeholder="Précisions éventuelles..."
                    className="w-full border border-brand-beige px-3 py-2 font-courier text-sm text-brand-dark focus:outline-none focus:border-brand-dark resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary text-sm">
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 3 — Mes documents
      =================================================================== */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          {/* Sub-tab filter row */}
          <div className="flex gap-0 border border-brand-beige">
            {(
              [
                { key: 'factures', label: 'Factures' },
                { key: 'bons', label: 'Bons de commande' },
              ] as { key: DocSub; label: string }[]
            ).map((sub) => (
              <button
                key={sub.key}
                onClick={() => setDocSub(sub.key)}
                className={`font-courier text-sm uppercase tracking-brand px-5 py-2 flex-1 transition-colors ${
                  docSub === sub.key
                    ? 'bg-brand-dark text-brand-cream'
                    : 'bg-white text-brand-taupe hover:bg-brand-beige/40'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* ---- Factures ---- */}
          {docSub === 'factures' && (
            <div className="space-y-3">
              {hasOverdue && (
                <div className="flex items-start gap-3 border border-red-300 bg-red-50 px-4 py-3">
                  <FileText size={15} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="font-courier text-sm text-red-800">
                    En retard — contactez{' '}
                    <a
                      href="mailto:commercial@synzyn.ma"
                      className="underline hover:no-underline"
                    >
                      commercial@synzyn.ma
                    </a>
                  </p>
                </div>
              )}

              <div className="bg-white border border-brand-beige overflow-hidden">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 border-b border-brand-beige bg-brand-beige/20">
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    N° facture
                  </p>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    Date
                  </p>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand text-right">
                    Montant TTC
                  </p>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    Échéance
                  </p>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    Statut
                  </p>
                </div>

                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="grid sm:grid-cols-5 gap-2 sm:gap-4 items-center px-5 py-4 border-b border-brand-beige/60 last:border-0"
                  >
                    <p className="font-courier text-sm text-brand-dark font-semibold">
                      {inv.invoiceNumber}
                    </p>
                    <p className="font-courier text-sm text-brand-taupe">
                      {fmtDate(inv.issueDate)}
                    </p>
                    <p className="font-courier text-sm text-brand-dark text-right sm:text-right">
                      {inv.total.toLocaleString('fr-MA')} MAD
                    </p>
                    <p
                      className={`font-courier text-sm ${
                        inv.status === 'overdue' ? 'text-red-700' : 'text-brand-taupe'
                      }`}
                    >
                      {fmtDate(inv.dueDate)}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <InvoiceStatusBadge status={inv.status} />
                      <button
                        title="Télécharger PDF"
                        className="text-brand-taupe hover:text-brand-dark transition-colors"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {invoices.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="font-courier text-sm text-brand-taupe">
                      Aucune facture disponible.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---- Bons de commande ---- */}
          {docSub === 'bons' && (
            <div className="bg-white border border-brand-beige overflow-hidden">
              {/* Desktop header */}
              <div className="hidden md:grid md:grid-cols-6 gap-3 px-5 py-3 border-b border-brand-beige bg-brand-beige/20">
                {['N° commande', 'Date', 'Montant TTC', 'Statut', 'Bon de commande', 'Facture'].map((h) => (
                  <p key={h} className="font-courier text-xs text-brand-taupe uppercase tracking-brand">
                    {h}
                  </p>
                ))}
              </div>

              {orders.map((order) => {
                const statusMap: Record<string, string> = {
                  pending: 'En attente',
                  confirmed: 'Confirmée',
                  processing: 'En préparation',
                  shipped: 'Expédiée',
                  delivered: 'Livrée',
                  cancelled: 'Annulée',
                };
                // Find matching invoice
                const invoice = invoices.find((inv) => inv.orderId === order.id);
                const invStatusColors: Record<string, string> = {
                  paid: 'text-green-700',
                  pending: 'text-yellow-700',
                  overdue: 'text-red-600',
                };

                return (
                  <div
                    key={order.id}
                    className="grid md:grid-cols-6 gap-3 items-center px-5 py-4 border-b border-brand-beige/60 last:border-0"
                  >
                    {/* Order number */}
                    <p className="font-courier text-sm text-brand-dark font-semibold md:col-span-1">
                      {order.orderNumber}
                    </p>
                    {/* Date */}
                    <p className="font-courier text-sm text-brand-taupe md:col-span-1">
                      {fmtDate(order.orderDate)}
                    </p>
                    {/* Amount */}
                    <p className="font-courier text-sm text-brand-dark md:col-span-1">
                      {order.total.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                    </p>
                    {/* Status */}
                    <p className="font-courier text-sm text-brand-taupe md:col-span-1">
                      {statusMap[order.status] ?? order.status}
                    </p>
                    {/* BDC button */}
                    <div className="md:col-span-1">
                      <button
                        onClick={() => setSelectedOrderId(order.id)}
                        className="flex items-center gap-1.5 border border-brand-dark bg-brand-dark text-brand-cream px-3 py-1.5 font-courier text-xs uppercase tracking-brand hover:bg-brand-taupe hover:border-brand-taupe transition-colors w-full justify-center md:w-auto md:justify-start"
                      >
                        <Download size={12} />
                        Télécharger
                      </button>
                    </div>
                    {/* Facture button */}
                    <div className="md:col-span-1">
                      {invoice ? (
                        <button
                          onClick={() => setSelectedInvoiceId(invoice.id)}
                          className={`flex items-center gap-1.5 border px-3 py-1.5 font-courier text-xs uppercase tracking-brand transition-colors w-full justify-center md:w-auto md:justify-start ${
                            invoice.status === 'overdue'
                              ? 'border-red-300 text-red-600 hover:bg-red-50'
                              : 'border-brand-beige text-brand-taupe hover:border-brand-dark hover:text-brand-dark'
                          }`}
                        >
                          <FileText size={12} />
                          <span>
                            {invoice.invoiceNumber}
                            {invoice.status !== 'paid' && (
                              <span className={`ml-1 ${invStatusColors[invoice.status]}`}>
                                ({invoice.status === 'overdue' ? 'Retard' : 'Impayée'})
                              </span>
                            )}
                          </span>
                        </button>
                      ) : (
                        <span className="font-courier text-xs text-brand-taupe/50 italic">
                          Pas encore disponible
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {orders.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="font-courier text-sm text-brand-taupe">Aucune commande disponible.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bon de commande modal */}
      {selectedOrder && (
        <BonDeCommandeModal
          order={selectedOrder}
          client={client}
          onClose={() => setSelectedOrderId(null)}
        />
      )}

      {/* Facture modal */}
      {selectedInvoiceId && (() => {
        const inv = invoices.find((i) => i.id === selectedInvoiceId);
        const invOrder = inv ? orders.find((o) => o.id === inv.orderId) : null;
        if (!inv) return null;
        const statusLabel: Record<string, string> = { paid: 'Payée', pending: 'En attente', overdue: 'En retard' };
        const statusColors: Record<string, string> = { paid: '#15803d', pending: '#b45309', overdue: '#dc2626' };
        return (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedInvoiceId(null); }}
          >
            <style>{`@media print { body > * { display: none !important; } #inv-print-root { display: block !important; position: static !important; } }`}</style>
            <div id="inv-print-root" className="bg-white w-full max-w-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-brand-beige px-6 py-3 bg-brand-cream print:hidden">
                <span className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
                  Facture — {inv.invoiceNumber}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-brand-dark text-brand-cream px-4 py-2 font-courier text-xs uppercase tracking-brand hover:bg-brand-taupe transition-colors"
                  >
                    <Printer size={13} /> Imprimer / PDF
                  </button>
                  <button onClick={() => setSelectedInvoiceId(null)} className="text-brand-taupe hover:text-brand-dark p-1">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Document */}
              <div className="p-8 md:p-10 space-y-6">
                {/* Logos header */}
                <div className="flex items-start justify-between pb-6 border-b-2 border-brand-dark">
                  <div className="w-36 h-16 border-2 border-dashed border-brand-beige flex items-center justify-center bg-brand-cream/50">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo client" className="max-w-full max-h-full object-contain p-1" />
                    ) : (
                      <span className="font-courier text-xs text-brand-taupe text-center px-2">LOGO CLIENT</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-courier text-2xl text-brand-dark tracking-widest font-bold">SYN+ZYN</p>
                    <p className="font-courier text-xs text-brand-taupe tracking-brand-wider uppercase">Portail B2B</p>
                    <p className="font-courier text-xs text-brand-taupe/60 mt-0.5">commercial@synzyn.ma</p>
                  </div>
                </div>

                {/* Title + status */}
                <div className="flex items-center justify-between">
                  <h2 className="font-courier text-3xl text-brand-dark uppercase tracking-widest">FACTURE</h2>
                  <span
                    className="font-courier text-sm font-bold px-4 py-1.5 border-2 uppercase tracking-brand"
                    style={{ color: statusColors[inv.status], borderColor: statusColors[inv.status] + '60' }}
                  >
                    {statusLabel[inv.status]}
                  </span>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-0 border border-brand-beige">
                  <div className="p-5 border-r border-brand-beige">
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide mb-3 border-b border-brand-beige pb-2">Facturer à</p>
                    <p className="font-courier text-base text-brand-dark font-semibold mb-1">{client.companyName}</p>
                    <p className="font-courier text-sm text-brand-taupe">ICE : {client.ice}</p>
                    <p className="font-courier text-sm text-brand-taupe">RC : {client.rc}</p>
                    <p className="font-courier text-sm text-brand-taupe">{client.address}, {client.city}</p>
                  </div>
                  <div className="p-5">
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide mb-3 border-b border-brand-beige pb-2">Détails facture</p>
                    <p className="font-courier text-sm text-brand-dark">N° : <strong>{inv.invoiceNumber}</strong></p>
                    <p className="font-courier text-sm text-brand-taupe">Date d'émission : {fmtDateLong(inv.issueDate)}</p>
                    <p className="font-courier text-sm text-brand-taupe">Échéance : {fmtDateLong(inv.dueDate)}</p>
                    {invOrder && <p className="font-courier text-sm text-brand-taupe">Commande : {invOrder.orderNumber}</p>}
                  </div>
                </div>

                {/* Items table */}
                {invOrder && (
                  <table className="w-full border border-brand-beige">
                    <thead>
                      <tr className="bg-brand-dark text-brand-cream">
                        <th className="text-left px-4 py-2.5 font-courier text-xs uppercase tracking-brand">Produit</th>
                        <th className="text-center px-3 py-2.5 font-courier text-xs uppercase tracking-brand">Format</th>
                        <th className="text-center px-3 py-2.5 font-courier text-xs uppercase tracking-brand">Qté</th>
                        <th className="text-right px-4 py-2.5 font-courier text-xs uppercase tracking-brand">Total HT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invOrder.items.map((item, i) => (
                        <tr key={i} className="border-b border-brand-beige last:border-0" style={{ backgroundColor: i % 2 === 0 ? 'white' : '#FAF8F5' }}>
                          <td className="px-4 py-3 font-courier text-sm text-brand-dark">{item.productName}</td>
                          <td className="px-3 py-3 text-center font-courier text-sm text-brand-taupe capitalize">{item.packFormat}</td>
                          <td className="px-3 py-3 text-center font-courier text-sm text-brand-dark font-semibold">{item.quantity}</td>
                          <td className="px-4 py-3 text-right font-courier text-sm text-brand-dark">{item.totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-72 border border-brand-beige">
                    <div className="flex justify-between px-4 py-2 border-b border-brand-beige font-courier text-sm text-brand-taupe">
                      <span>Sous-total HT</span><span>{inv.amount.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 border-b border-brand-beige font-courier text-sm text-brand-taupe">
                      <span>TVA 20%</span><span>{inv.vatAmount.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD</span>
                    </div>
                    <div className="flex justify-between px-4 py-3 font-courier text-base text-brand-dark font-bold bg-brand-cream">
                      <span>TOTAL TTC</span><span>{inv.total.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD</span>
                    </div>
                  </div>
                </div>

                {/* Payment info */}
                <div className="border border-brand-beige p-4 bg-brand-cream/40">
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-1">Mode de règlement</p>
                  <p className="font-courier text-sm text-brand-dark">Virement bancaire — commercial@synzyn.ma</p>
                  <p className="font-courier text-xs text-brand-taupe mt-1">Référence : {inv.invoiceNumber}</p>
                </div>

                {/* Footer */}
                <div className="border-t-2 border-brand-dark pt-4 flex items-center justify-between">
                  <p className="font-courier text-xs text-brand-taupe">Généré le {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  <p className="font-courier text-xs text-brand-taupe">KAK SYNERGY SA · IF: 52426360 · RC: 542021</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
