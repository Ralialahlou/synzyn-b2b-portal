import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const FAQ_DATA = [
  {
    category: 'Compte & Accès',
    questions: [
      {
        q: 'Comment obtenir un accès au portail B2B SYN+ZYN ?',
        a: 'Remplissez le formulaire de demande d\'accès sur notre page "Devenir client B2B". Un commercial vous contactera sous 2-3 jours ouvrés pour étudier votre profil et établir votre contrat.',
      },
      {
        q: 'J\'ai oublié mon code client ou mon mot de passe. Que faire ?',
        a: 'Contactez votre commercial dédié ou écrivez à commercial@synzyn.ma. Nous vous transmettrons vos identifiants sous 24h.',
      },
      {
        q: 'Mon code client fonctionne-t-il pour plusieurs utilisateurs ?',
        a: 'Pour l\'instant, un seul accès est fourni par compte client. Si vous souhaitez des accès supplémentaires pour votre équipe, contactez votre commercial.',
      },
    ],
  },
  {
    category: 'Commandes & Livraison',
    questions: [
      {
        q: 'Quel est le montant minimum de commande ?',
        a: 'La commande minimum est de 20 000 MAD HT par livraison, quelle que soit votre type de client.',
      },
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'Les délais de livraison varient selon les produits : 3-5 jours ouvrés pour les produits body care et hair care, 5-7 jours ouvrés pour les produits skincare et makeup, et 7-10 jours ouvrés pour les produits PRO.',
      },
      {
        q: 'Comment puis-je suivre ma commande ?',
        a: 'Un numéro de tracking vous est fourni dès l\'expédition de votre commande, visible dans votre espace "Mes commandes". Vous pouvez aussi contacter directement votre commercial.',
      },
      {
        q: 'Comment annuler une commande ?',
        a: 'Pour annuler une commande, vous devez impérativement appeler votre commercial dédié. Les annulations ne sont possibles que si la commande n\'est pas encore en préparation.',
      },
      {
        q: 'Les livraisons partielles sont-elles possibles ?',
        a: 'Oui, dans certains cas (notamment en cas de rupture de stock partielle). Votre commercial vous en informera en amont.',
      },
    ],
  },
  {
    category: 'Prix & Contrat',
    questions: [
      {
        q: 'Comment sont déterminés mes prix contractuels ?',
        a: 'Vos tarifs sont négociés individuellement avec votre commercial selon votre volume d\'achat, votre type de structure et les produits de votre assortiment. Ils sont visibles dans votre portail après connexion.',
      },
      {
        q: 'Puis-je commander des produits qui ne sont pas dans mon contrat ?',
        a: 'Vous pouvez manifester votre intérêt pour des produits hors contrat depuis la fiche produit. Votre commercial vous fera parvenir une offre commerciale.',
      },
      {
        q: 'Les prix peuvent-ils évoluer en cours d\'année ?',
        a: 'Vos prix sont fixes pour la durée de votre contrat. En cas de révision, vous en serez informé par écrit au moins 30 jours à l\'avance.',
      },
      {
        q: 'Qu\'est-ce que le MOQ ?',
        a: 'Le MOQ (Minimum Order Quantity) est la quantité minimale d\'un produit à commander. Il varie selon les produits et est indiqué sur chaque fiche produit de votre catalogue contractualisé.',
      },
    ],
  },
  {
    category: 'Paiement & Facturation',
    questions: [
      {
        q: 'Quels modes de paiement sont acceptés ?',
        a: 'Selon votre contrat, vous pouvez payer par virement bancaire (à commercial@synzyn.ma), carte bancaire, chèque ou espèces à la livraison, ou bénéficier d\'un crédit client.',
      },
      {
        q: 'Comment effectuer un paiement par virement ?',
        a: 'Effectuez votre virement à commercial@synzyn.ma en mentionnant votre numéro de commande ou de facture en référence. Votre commercial vous confirmera la réception.',
      },
      {
        q: 'Où puis-je trouver mes factures ?',
        a: 'Toutes vos factures sont disponibles dans la section "Mes factures" de votre tableau de bord. Vous pouvez les télécharger en PDF.',
      },
      {
        q: 'J\'ai une facture en retard de paiement. Que dois-je faire ?',
        a: 'Contactez votre commercial ou écrivez à commercial@synzyn.ma pour régulariser votre situation. Des pénalités de retard peuvent s\'appliquer selon vos conditions contractuelles.',
      },
    ],
  },
  {
    category: 'Produits & Qualité',
    questions: [
      {
        q: 'Les produits SYN+ZYN sont-ils testés dermatologiquement ?',
        a: 'Oui, tous nos produits sont testés dermatologiquement et conformes à la réglementation EU et internationale. Les certifications spécifiques à chaque produit sont indiquées sur la fiche produit.',
      },
      {
        q: 'Quelle est la durée de conservation (DLC) des produits ?',
        a: 'La DLC varie selon les produits (12 à 36 mois). Elle est indiquée sur chaque fiche produit et sur l\'emballage.',
      },
      {
        q: 'Comment gérer les produits en rupture de stock ?',
        a: 'Les produits en rupture restent visibles sur le site avec leur date de disponibilité estimée. Vous ne pouvez pas les commander en rupture, mais vous pouvez manifester votre intérêt.',
      },
      {
        q: 'Est-il possible d\'obtenir des échantillons ?',
        a: 'Oui, contactez votre commercial ou faites une demande via la section "Support" de votre tableau de bord.',
      },
    ],
  },
];

export default function FAQ() {
  useSEO({
    title: 'FAQ | SYN+ZYN B2B — Questions fréquentes',
    description: 'Questions fréquentes sur le portail B2B SYN+ZYN — commandes, livraisons, paiements, produits et conditions contractuelles.',
    canonical: '/faq',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        { '@type': 'Question', 'name': 'Quel est le montant minimum de commande ?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'La commande minimum est de 20 000 MAD HT par livraison.' } },
        { '@type': 'Question', 'name': 'Quels sont les délais de livraison ?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Les délais de livraison sont de 5 à 7 jours ouvrés selon les produits commandés.' } },
        { '@type': 'Question', 'name': 'Comment obtenir un accès au portail B2B ?', 'acceptedAnswer': { '@type': 'Answer', 'text': "Remplissez le formulaire de demande d'accès. Un commercial vous contactera sous 2-3 jours ouvrés." } },
        { '@type': 'Question', 'name': 'Quels modes de paiement sont acceptés ?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Virement bancaire, carte bancaire, chèque ou espèces à la livraison, selon votre contrat.' } },
      ],
    },
  });

  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...FAQ_DATA.map((f) => f.category)];

  const filtered = FAQ_DATA.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (item) =>
        (activeCategory === 'all' || activeCategory === cat.category) &&
        (!search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-dark py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-courier text-3xl text-brand-cream tracking-brand-wide uppercase mb-3">
            FAQ
          </h1>
          <p className="font-courier text-brand-taupe text-xs tracking-brand mb-5">
            Questions fréquemment posées par nos clients B2B.
          </p>
          <div className="relative max-w-lg">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe" />
            <input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-brand-beige px-4 py-2.5 pl-9 font-courier text-xs text-brand-dark placeholder-brand-taupe focus:outline-none focus:border-brand-taupe"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-courier text-xs uppercase tracking-brand px-3 py-1.5 border transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-dark text-brand-cream border-brand-dark'
                  : 'border-brand-beige text-brand-taupe hover:border-brand-dark hover:text-brand-dark'
              }`}
            >
              {cat === 'all' ? 'Tous' : cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-courier text-sm text-brand-taupe">Aucune réponse trouvée pour votre recherche.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((cat) => (
              <div key={cat.category}>
                <h2 className="font-courier text-sm text-brand-taupe uppercase tracking-brand-wide mb-3">
                  {cat.category}
                </h2>
                <div className="space-y-2">
                  {cat.questions.map((item) => {
                    const key = `${cat.category}-${item.q}`;
                    const isOpen = openItem === key;
                    return (
                      <div key={key} className="bg-white border border-brand-beige">
                        <button
                          className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                          onClick={() => setOpenItem(isOpen ? null : key)}
                        >
                          <span className="font-courier text-xs text-brand-dark leading-snug">
                            {item.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp size={14} className="text-brand-taupe flex-shrink-0" />
                          ) : (
                            <ChevronDown size={14} className="text-brand-taupe flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 border-t border-brand-beige pt-3">
                            <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-brand-dark p-6 text-center">
          <MessageSquare size={24} className="mx-auto text-brand-taupe mb-3" />
          <p className="font-courier text-sm text-brand-cream mb-1">Vous ne trouvez pas votre réponse ?</p>
          <p className="font-courier text-xs text-brand-taupe tracking-brand mb-4">
            Notre équipe commerciale est là pour vous aider.
          </p>
          <Link to="/contact" className="btn-outline-light inline-block">
            Contacter un commercial
          </Link>
        </div>
      </div>
    </div>
  );
}
