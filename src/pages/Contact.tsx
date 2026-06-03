import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contactez SYN+ZYN | Support Commercial B2B',
    description: "Contactez l'équipe commerciale SYN+ZYN pour vos demandes B2B, tarifs et partenariats. Email: commercial@synzyn.ma — Tél: +212 522 100 200.",
    canonical: '/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contactez SYN+ZYN',
      'url': 'https://b2b.synzyn.ma/contact',
      'description': "Page de contact de l'équipe commerciale SYN+ZYN B2B.",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' }); }, 5000);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-courier text-3xl text-brand-cream tracking-brand-wide uppercase mb-2">
            Nous contacter
          </h1>
          <p className="font-courier text-brand-taupe text-xs tracking-brand max-w-lg">
            Notre équipe commerciale est disponible pour répondre à toutes vos questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white border border-brand-beige p-5">
              <h2 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4">
                Équipe commerciale
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={15} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">Email</p>
                    <a href="mailto:commercial@synzyn.ma" className="font-courier text-xs text-brand-dark hover:text-brand-taupe">
                      commercial@synzyn.ma
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={15} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">Téléphone</p>
                    <a href="tel:+212522100200" className="font-courier text-xs text-brand-dark hover:text-brand-taupe">
                      +212 522 100 200
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare size={15} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">WhatsApp</p>
                    <a
                      href="https://wa.me/212661100200"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-courier text-xs text-brand-dark hover:text-brand-taupe"
                    >
                      +212 661 100 200
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">Adresse</p>
                    <p className="font-courier text-sm text-brand-dark leading-relaxed">
                      Immeuble Tafraouti<br />
                      Km 7.5, Route de Rabat<br />
                      Aïn Sebaâ — Casablanca
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={15} className="text-brand-taupe mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand">Horaires</p>
                    <p className="font-courier text-sm text-brand-dark leading-relaxed">
                      Lundi — Vendredi<br />
                      9h00 — 18h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial reps */}
            <div className="bg-brand-dark p-5">
              <h2 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-4">
                Commerciaux dédiés
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'Sofia Alaoui', role: 'Retail & Grande distribution', zone: 'Casablanca — Rabat' },
                  { name: 'Youssef Benali', role: 'Pharmacies & Parapharmacie', zone: 'Maroc national' },
                  { name: 'Leila Mansouri', role: 'Spas & Cliniques', zone: 'Maroc national' },
                ].map((rep) => (
                  <div key={rep.name} className="border-b border-brand-taupe/20 pb-3 last:border-0 last:pb-0">
                    <p className="font-courier text-xs text-brand-cream">{rep.name}</p>
                    <p className="font-courier text-xs text-brand-taupe tracking-brand">{rep.role}</p>
                    <p className="font-courier text-xs text-brand-taupe/60 tracking-brand">{rep.zone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2">
            <div className="bg-white border border-brand-beige p-6 md:p-8">
              <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-5">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <p className="font-courier text-sm text-brand-dark mb-2">Message envoyé !</p>
                  <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
                    Notre équipe commerciale vous répondra sous 24h ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">Nom *</label>
                      <input type="text" value={form.name} onChange={update('name')} required className="input-field text-sm" placeholder="Votre nom" />
                    </div>
                    <div>
                      <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">Entreprise *</label>
                      <input type="text" value={form.company} onChange={update('company')} required className="input-field text-sm" placeholder="Votre entreprise" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">Email *</label>
                      <input type="email" value={form.email} onChange={update('email')} required className="input-field text-sm" placeholder="contact@votre-societe.ma" />
                    </div>
                    <div>
                      <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">Téléphone</label>
                      <input type="tel" value={form.phone} onChange={update('phone')} className="input-field text-sm" placeholder="+212 6XX XXX XXX" />
                    </div>
                  </div>
                  <div>
                    <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">Sujet *</label>
                    <select value={form.subject} onChange={update('subject')} required className="input-field text-sm font-courier">
                      <option value="">Sélectionner un sujet...</option>
                      <option value="nouveau-client">Devenir client B2B</option>
                      <option value="tarifs">Demande de tarification</option>
                      <option value="commande">Question commande / livraison</option>
                      <option value="produit">Information produit</option>
                      <option value="formation">Formation professionnelle</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-courier text-sm text-brand-taupe uppercase tracking-brand block mb-1.5">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={update('message')}
                      rows={6}
                      required
                      className="input-field text-sm resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
