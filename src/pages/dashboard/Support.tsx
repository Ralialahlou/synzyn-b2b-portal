import { useState } from 'react';
import { Mail, Phone, MessageSquare, Package, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type RequestType = 'sample' | 'training' | 'support' | 'other';

const REQUEST_TYPES: { id: RequestType; icon: typeof Mail; label: string; desc: string }[] = [
  { id: 'sample', icon: Package, label: 'Demande d\'échantillons', desc: 'Recevoir des échantillons de produits' },
  { id: 'training', icon: GraduationCap, label: 'Formation produit', desc: 'Planifier une session de formation' },
  { id: 'support', icon: MessageSquare, label: 'Support commercial', desc: 'Question sur votre compte ou contrat' },
  { id: 'other', icon: Mail, label: 'Autre demande', desc: 'Toute autre question ou demande' },
];

export default function Support() {
  const { client } = useAuth();
  const [requestType, setRequestType] = useState<RequestType>('support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setMessage(''); }, 4000);
  };

  return (
    <div className="space-y-5">
      <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Support commercial</h2>

      {/* Sales rep contact */}
      <div className="bg-brand-dark p-5">
        <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-3">Votre commercial dédié</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-courier text-sm text-brand-cream">{client?.assignedRep.name}</p>
            <p className="font-courier text-xs text-brand-taupe tracking-brand">{client?.assignedRep.role}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`mailto:${client?.assignedRep.email}`}
              className="flex items-center gap-2 btn-outline-light text-xs py-2 px-4"
            >
              <Mail size={12} />
              {client?.assignedRep.email}
            </a>
            <a
              href={`tel:${client?.assignedRep.phone}`}
              className="flex items-center gap-2 btn-outline-light text-xs py-2 px-4"
            >
              <Phone size={12} />
              {client?.assignedRep.phone}
            </a>
            <a
              href={`https://wa.me/${client?.assignedRep.whatsapp?.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 btn-outline-light text-xs py-2 px-4"
            >
              <MessageSquare size={12} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Request form */}
      <div className="bg-white border border-brand-beige p-5">
        <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4">
          Envoyer une demande
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mb-2">Type de demande</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {REQUEST_TYPES.map(({ id, icon: Icon, label, desc }) => (
                <label
                  key={id}
                  className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                    requestType === id
                      ? 'border-brand-dark bg-brand-cream'
                      : 'border-brand-beige hover:border-brand-taupe'
                  }`}
                >
                  <input
                    type="radio"
                    name="requestType"
                    checked={requestType === id}
                    onChange={() => setRequestType(id)}
                    className="mt-0.5 accent-brand-dark"
                  />
                  <Icon size={13} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-dark tracking-brand">{label}</p>
                    <p className="font-courier text-xs text-brand-taupe tracking-brand">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">
              Votre message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              className="input-field text-sm resize-none"
              placeholder="Décrivez votre demande en détail..."
            />
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-3">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="font-courier text-xs text-green-700 tracking-brand">
                Votre demande a été envoyée. Votre commercial vous répondra sous 24h.
              </span>
            </div>
          ) : (
            <button type="submit" className="btn-primary">
              Envoyer la demande
            </button>
          )}
        </form>
      </div>

      {/* General contact */}
      <div className="bg-white border border-brand-beige p-5">
        <h3 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-3">
          Contact général SYN+ZYN
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail size={13} className="text-brand-taupe" />
            <span className="font-courier text-xs text-brand-dark">commercial@synzyn.ma</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={13} className="text-brand-taupe" />
            <span className="font-courier text-xs text-brand-dark">+212 522 100 200</span>
          </div>
          <p className="font-courier text-xs text-brand-taupe tracking-brand mt-2">
            Lun–Ven · 9h–18h (Heure du Maroc)
          </p>
        </div>
      </div>
    </div>
  );
}
