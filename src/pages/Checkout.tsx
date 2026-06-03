import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, Building2, Truck, ChevronRight,
  CheckCircle2, AlertCircle, Copy, Check, Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { PaymentMethod, DeliveryAddress } from '../types';

const formatPrice = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`;
const packLabels: Record<string, string> = { unit: 'Unité', box: 'Boîte', carton: 'Carton' };

const BANK_ROWS: { label: string; value: string; copyable?: boolean }[] = [
  { label: 'Titulaire', value: 'KAK SYNERGY SA' },
  { label: 'Banque', value: 'Attijariwafa Bank' },
  { label: 'RIB', value: '007 780 0002347891004532 14', copyable: true },
  { label: 'IBAN', value: 'MA64 007 7800 0023478 9100 4532', copyable: true },
  { label: 'SWIFT / BIC', value: 'BCMAMAMC', copyable: true },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 flex-shrink-0 p-1.5 text-brand-taupe hover:text-brand-dark hover:bg-brand-beige rounded transition-colors"
      title="Copier"
    >
      {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
    </button>
  );
}

function BankDetails({ orderRef }: { orderRef?: string }) {
  return (
    <div className="bg-brand-cream border border-brand-beige px-4 py-4 space-y-3">
      <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide">
        Coordonnées bancaires
      </p>
      <div className="space-y-2">
        {BANK_ROWS.map(({ label, value, copyable }) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="font-courier text-xs text-brand-taupe flex-shrink-0">{label}</span>
            <div className="flex items-center gap-0 min-w-0">
              <span className="font-courier text-xs text-brand-dark text-right tracking-wide break-all">
                {value}
              </span>
              {copyable && <CopyButton value={value} />}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-brand-beige pt-3 space-y-1">
        {orderRef && (
          <p className="font-courier text-xs text-brand-taupe">
            Référence:{' '}
            <strong className="text-brand-dark">{orderRef}</strong>
          </p>
        )}
        {!orderRef && (
          <p className="font-courier text-xs text-brand-taupe tracking-brand">
            Référence à indiquer :{' '}
            <strong className="text-brand-dark">votre numéro de commande</strong>
          </p>
        )}
        <p className="font-courier text-xs text-brand-taupe tracking-brand">
          Envoyez votre justificatif de paiement à :{' '}
          <a href="mailto:commercial@synzyn.ma" className="text-brand-dark hover:underline">
            commercial@synzyn.ma
          </a>
        </p>
      </div>
    </div>
  );
}

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: typeof CreditCard; desc: string }[] = [
  { id: 'bank-transfer', label: 'Virement bancaire', icon: Building2, desc: 'Envoyez le virement à commercial@synzyn.ma après confirmation' },
  { id: 'card', label: 'Carte bancaire', icon: CreditCard, desc: 'Paiement sécurisé en ligne (Visa, Mastercard)' },
  { id: 'cod-check', label: 'À la livraison — Chèque', icon: Truck, desc: 'Règlement par chèque à réception de la commande' },
  { id: 'cod-cash', label: 'À la livraison — Espèces', icon: Truck, desc: 'Règlement en espèces à réception de la commande' },
];

type Step = 'address' | 'payment' | 'confirm';

/** Add N business days to a date (skipping Sat/Sun). */
function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return result;
}

/** Format a Date as short French weekday + day + month, e.g. "lun. 9 juin" */
function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' });
}

export default function Checkout() {
  const { items, subtotal, vatAmount, total, clearCart } = useCart();
  const { client } = useAuth();

  const [step, setStep] = useState<Step>('address');
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress | null>(
    client?.deliveryAddresses.find((a) => a.isDefault) || null
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [notes, setNotes] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(`SZ-2025-${String(Math.floor(Math.random() * 900 + 100)).padStart(4, '0')}`);

  // --- Delivery date calculation ---
  const today = new Date();
  const deliveryMin = addBusinessDays(today, 5);
  const deliveryMax = addBusinessDays(today, 7);
  const deliveryRangeLabel = `${formatDeliveryDate(deliveryMin)} — ${formatDeliveryDate(deliveryMax)}`;

  // --- Payment terms ---
  const paymentDays = client?.paymentTerms.paymentDays ?? null;
  // Due date = deliveryMax + paymentDays business days (if deferred)
  const dueDateLabel = paymentDays
    ? formatDeliveryDate(addBusinessDays(deliveryMax, paymentDays))
    : null;

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-courier text-brand-taupe text-sm mb-4">Votre panier est vide.</p>
          <Link to="/catalogue" className="btn-primary">Voir le catalogue</Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-brand-beige p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="font-courier text-xl text-brand-dark tracking-brand-wide uppercase mb-2">
            Commande confirmée
          </h2>
          <p className="font-courier text-sm text-brand-taupe tracking-brand mb-1">
            N° {orderNumber}
          </p>
          <p className="font-courier text-xs text-brand-taupe tracking-brand mt-3 leading-relaxed">
            Votre commande a été enregistrée. Vous recevrez une confirmation par email
            {paymentMethod === 'bank-transfer' && ' avec les coordonnées bancaires pour le virement'}.
          </p>
          {paymentMethod === 'bank-transfer' && (
            <div className="mt-4 text-left">
              <BankDetails orderRef={orderNumber} />
            </div>
          )}
          <div className="mt-6 flex flex-col gap-2">
            <Link to="/dashboard/orders" className="btn-primary block">Suivi de ma commande</Link>
            <Link to="/catalogue" className="btn-secondary block">Continuer les achats</Link>
          </div>
        </div>
      </div>
    );
  }

  const allowedMethods = client?.paymentTerms.allowedMethods || ['bank-transfer'];

  const handleConfirm = () => {
    clearCart();
    setOrderComplete(true);
    setConfirmModal(false);
  };

  const steps: { id: Step; label: string }[] = [
    { id: 'address', label: 'Adresse' },
    { id: 'payment', label: 'Paiement' },
    { id: 'confirm', label: 'Confirmation' },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-dark py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-courier text-2xl text-brand-cream tracking-brand-wide uppercase mb-6">
            Validation de commande
          </h1>
          {/* Progress */}
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 font-courier text-xs uppercase tracking-brand px-3 py-1.5 transition-colors ${
                    i <= stepIndex ? 'text-brand-cream' : 'text-brand-taupe/50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    i < stepIndex ? 'bg-green-600 text-white' : i === stepIndex ? 'bg-brand-cream text-brand-dark' : 'bg-brand-taupe/30 text-brand-taupe/50'
                  }`}>
                    {i < stepIndex ? '✓' : i + 1}
                  </span>
                  {s.label}
                </div>
                {i < steps.length - 1 && <ChevronRight size={12} className="text-brand-taupe/40 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Address */}
            <div className={`bg-white border border-brand-beige p-6 ${step !== 'address' ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">1. Adresse de livraison</h2>
                {step !== 'address' && (
                  <button onClick={() => setStep('address')} className="font-courier text-xs text-brand-taupe uppercase tracking-brand hover:text-brand-dark">Modifier</button>
                )}
              </div>
              {step === 'address' && (
                <>
                  <div className="space-y-3 mb-4">
                    {client?.deliveryAddresses.map((addr) => (
                      <label key={addr.id} className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                        selectedAddress?.id === addr.id ? 'border-brand-dark bg-brand-cream' : 'border-brand-beige hover:border-brand-taupe'
                      }`}>
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress?.id === addr.id}
                          onChange={() => setSelectedAddress(addr)}
                          className="mt-0.5 accent-brand-dark"
                        />
                        <div>
                          <p className="font-courier text-xs text-brand-dark tracking-brand">{addr.label}</p>
                          <p className="font-courier text-xs text-brand-taupe tracking-brand">{addr.street}, {addr.city}</p>
                          {addr.isDefault && (
                            <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-1.5 py-0.5 mt-1 inline-block uppercase tracking-brand">Par défaut</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Billing information — read-only */}
                  {client && (
                    <div className="mb-4 bg-[#faf7f2] border border-brand-beige px-4 py-4 space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Lock size={12} className="text-brand-taupe flex-shrink-0" />
                        <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand-wide">
                          Informations de facturation
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-courier text-xs text-brand-taupe flex-shrink-0">Raison sociale</span>
                          <span className="font-courier text-xs text-brand-dark text-right">{client.companyName}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-courier text-xs text-brand-taupe flex-shrink-0">ICE</span>
                          <span className="font-courier text-xs text-brand-dark text-right tracking-wide">{client.ice}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-courier text-xs text-brand-taupe flex-shrink-0">RC</span>
                          <span className="font-courier text-xs text-brand-dark text-right tracking-wide">{client.rc}</span>
                        </div>
                        {client.paymentTerms.creditLimit != null && (
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-courier text-xs text-brand-taupe flex-shrink-0">Plafond de crédit</span>
                            <span className="font-courier text-xs text-brand-dark text-right">{formatPrice(client.paymentTerms.creditLimit)}</span>
                          </div>
                        )}
                      </div>
                      <p className="font-courier text-xs text-brand-taupe/80 leading-relaxed pt-1 border-t border-brand-beige">
                        Ces informations apparaîtront sur votre facture. Pour toute modification, contactez votre commercial.
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-2">
                      Notes / Instructions de livraison
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Ex: Livraison en matinée, contacter avant livraison..."
                      className="input-field text-xs resize-none"
                    />
                  </div>

                  <button
                    onClick={() => setStep('payment')}
                    disabled={!selectedAddress}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    Continuer vers le paiement
                  </button>
                </>
              )}
              {step !== 'address' && selectedAddress && (
                <div className="mt-1 space-y-1">
                  <p className="font-courier text-xs text-brand-taupe tracking-brand">{selectedAddress.label} — {selectedAddress.street}, {selectedAddress.city}</p>
                  {/* Estimated delivery date — compact summary when collapsed */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <Truck size={11} className="text-brand-taupe flex-shrink-0" />
                    <p className="font-courier text-xs text-brand-taupe tracking-brand">
                      Livraison estimée&nbsp;: <span className="text-brand-dark">{deliveryRangeLabel}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-white border border-brand-beige p-6 ${step === 'address' ? 'opacity-60 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">2. Mode de paiement</h2>
                {step === 'confirm' && (
                  <button onClick={() => setStep('payment')} className="font-courier text-xs text-brand-taupe uppercase tracking-brand hover:text-brand-dark">Modifier</button>
                )}
              </div>
              {step === 'payment' && (
                <>
                  {/* Payment clarity alert */}
                  {paymentDays == null ? (
                    <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 px-4 py-3">
                      <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="font-courier text-xs text-amber-800 leading-relaxed tracking-brand">
                        <strong className="text-amber-900">Paiement immédiat requis</strong> — Envoyez votre justificatif de paiement à{' '}
                        <a href="mailto:commercial@synzyn.ma" className="underline hover:text-amber-900">commercial@synzyn.ma</a>{' '}
                        dès la confirmation. Votre commande sera traitée à réception du justificatif.
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 px-4 py-3">
                      <CheckCircle2 size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="font-courier text-xs text-green-800 leading-relaxed tracking-brand">
                        <strong className="text-green-900">Paiement sous {paymentDays} jours</strong> — Votre facture sera due {paymentDays} jours après livraison estimée, soit vers le{' '}
                        <span className="text-green-900 font-semibold">{dueDateLabel}</span>.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 mb-6">
                    {PAYMENT_METHODS.filter((m) => allowedMethods.includes(m.id)).map((method) => {
                      const Icon = method.icon;
                      return (
                        <label key={method.id} className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                          paymentMethod === method.id ? 'border-brand-dark bg-brand-cream' : 'border-brand-beige hover:border-brand-taupe'
                        }`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="mt-0.5 accent-brand-dark"
                          />
                          <Icon size={14} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-courier text-xs text-brand-dark tracking-brand">{method.label}</p>
                            <p className="font-courier text-xs text-brand-taupe tracking-brand">{method.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                    {client?.paymentTerms.paymentDays && allowedMethods.includes('credit-terms') && (
                      <label className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                        paymentMethod === 'credit-terms' ? 'border-brand-dark bg-brand-cream' : 'border-brand-beige hover:border-brand-taupe'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'credit-terms'}
                          onChange={() => setPaymentMethod('credit-terms')}
                          className="mt-0.5 accent-brand-dark"
                        />
                        <Building2 size={14} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-courier text-xs text-brand-dark tracking-brand">
                            Crédit client ({client.paymentTerms.paymentDays} jours)
                          </p>
                          <p className="font-courier text-xs text-brand-taupe tracking-brand">
                            Paiement différé selon vos conditions contractuelles
                          </p>
                        </div>
                      </label>
                    )}
                  </div>

                  {paymentMethod === 'bank-transfer' && (
                    <div className="mb-4">
                      <BankDetails />
                    </div>
                  )}

                  <button onClick={() => setStep('confirm')} className="btn-primary w-full">
                    Continuer vers la confirmation
                  </button>
                </>
              )}
              {step === 'confirm' && (
                <p className="font-courier text-xs text-brand-taupe tracking-brand">
                  {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label || 'Crédit client'}
                </p>
              )}
            </div>

            {/* Step 3: Confirm */}
            {step === 'confirm' && (
              <div className="bg-white border border-brand-beige p-6">
                <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-4">
                  3. Confirmation de commande
                </h2>

                <div className="bg-brand-cream border border-brand-beige px-4 py-3 mb-4 flex items-start gap-2">
                  <AlertCircle size={14} className="text-brand-taupe flex-shrink-0 mt-0.5" />
                  <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
                    Veuillez vérifier votre adresse de livraison et vos articles avant de confirmer.
                    Pour annuler une commande confirmée, contactez votre commercial.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">Récapitulatif articles</p>
                  <div className="space-y-2">
                    {items.map((item) => {
                      const price = item.packFormat === 'unit' ? item.contractProduct.price.unit : item.packFormat === 'box' ? item.contractProduct.price.box : item.contractProduct.price.carton;
                      return (
                        <div key={`${item.product.id}-${item.packFormat}`} className="flex justify-between font-courier text-xs">
                          <span className="text-brand-dark">{item.product.name} × {item.quantity} {packLabels[item.packFormat]}</span>
                          <span className="text-brand-taupe">{formatPrice(price * item.quantity)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setConfirmModal(true)}
                  className="btn-primary w-full"
                >
                  Confirmer ma commande — {formatPrice(total)}
                </button>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-white border border-brand-beige p-5 h-fit sticky top-24">
            <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4">
              Récapitulatif
            </h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => {
                const price = item.packFormat === 'unit' ? item.contractProduct.price.unit : item.packFormat === 'box' ? item.contractProduct.price.box : item.contractProduct.price.carton;
                return (
                  <div key={`${item.product.id}-${item.packFormat}`} className="flex gap-2">
                    <div className="w-8 h-8 flex-shrink-0 rounded-sm" style={{ backgroundColor: item.product.imageColor + '40' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-courier text-xs text-brand-dark truncate">{item.product.name}</p>
                      <p className="font-courier text-xs text-brand-taupe">{item.quantity} × {packLabels[item.packFormat]}</p>
                    </div>
                    <span className="font-courier text-xs text-brand-dark flex-shrink-0">{formatPrice(price * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-brand-beige pt-3 space-y-1.5">
              <div className="flex justify-between font-courier text-xs text-brand-taupe">
                <span>Sous-total HT</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-courier text-xs text-brand-taupe">
                <span>TVA 20%</span><span>{formatPrice(vatAmount)}</span>
              </div>
              <div className="flex justify-between font-courier text-xs text-brand-dark border-t border-brand-beige pt-2 mt-1">
                <span className="uppercase tracking-brand">Total TTC</span><span className="font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Estimated delivery date in sidebar */}
            <div className="mt-4 flex items-center gap-2 border-t border-brand-beige pt-3">
              <Truck size={13} className="text-brand-taupe flex-shrink-0" />
              <div>
                <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand leading-none mb-0.5">Livraison estimée</p>
                <p className="font-courier text-xs text-brand-dark font-semibold">{deliveryRangeLabel}</p>
              </div>
            </div>

            {subtotal < 20000 && (
              <div className="mt-3 flex items-start gap-1.5 bg-brand-beige/30 px-2 py-2">
                <AlertCircle size={11} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                <p className="font-courier text-xs text-brand-taupe leading-relaxed">
                  Minimum 20 000 MAD HT requis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-sm w-full p-6 border border-brand-beige">
            <h3 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-3">
              Confirmer la commande ?
            </h3>
            <div className="mb-4 space-y-1">
              <p className="font-courier text-xs text-brand-taupe tracking-brand">
                <strong className="text-brand-dark">Livraison:</strong> {selectedAddress?.label}, {selectedAddress?.city}
              </p>
              <p className="font-courier text-xs text-brand-taupe tracking-brand">
                <strong className="text-brand-dark">Paiement:</strong> {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label || 'Crédit client'}
              </p>
              <p className="font-courier text-xs text-brand-dark tracking-brand font-semibold">
                Total: {formatPrice(total)}
              </p>
            </div>
            <p className="font-courier text-xs text-brand-taupe tracking-brand mb-4 leading-relaxed">
              Êtes-vous sûr de vouloir confirmer cette commande ? Pour toute annulation, contactez votre commercial.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(false)} className="flex-1 btn-secondary py-2.5 text-xs">
                Annuler
              </button>
              <button onClick={handleConfirm} className="flex-1 btn-primary py-2.5 text-xs">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
