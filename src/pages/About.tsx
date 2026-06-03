import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const BRAND_VALUES = [
  {
    label: 'Moderne & Fonctionnel',
    desc: 'Des formulations actuelles, des textures qui s\'intègrent naturellement dans chaque routine beauté.',
    color: '#3F3132',
    textColor: '#FAF8F5',
  },
  {
    label: 'Inclusif & Accessible',
    desc: 'La qualité premium ne devrait pas être un privilège. SYN+ZYN la rend disponible pour tous.',
    color: '#A28B83',
    textColor: '#FAF8F5',
  },
  {
    label: 'Tendance & Polyvalent',
    desc: 'Une gamme qui évolue avec les tendances du marché, sans jamais sacrifier l\'essentiel.',
    color: '#D0B9AB',
    textColor: '#3F3132',
  },
  {
    label: 'Innovant & Évolutif',
    desc: 'Formulations en constante amélioration, développées pour répondre aux besoins de demain.',
    color: '#C27279',
    textColor: '#FAF8F5',
  },
  {
    label: 'Fiable & Orienté valeur',
    desc: 'Chaque produit est le résultat d\'un engagement rigoureux envers la performance et la constance.',
    color: '#B8ABD0',
    textColor: '#3F3132',
  },
];

const PRODUCT_RANGES = [
  {
    category: 'BEAUTY',
    color: '#C27279',
    items: [
      { label: 'Visage', sub: 'Fond de teint, Correcteur, Poudre, Blush, Highlighter, Contouring' },
      { label: 'Lèvres', sub: 'Rouge à lèvres, Gloss, Crayon, Kit lèvres' },
      { label: 'Yeux', sub: 'Mascara, Eye-liner, Fards à paupières, Crayon yeux' },
      { label: 'Sourcils', sub: 'Gel, Mascara, Crayon, Feutre' },
      { label: 'Ongles', sub: 'Vernis, Top coat' },
      { label: 'Accessoires', sub: 'Pinceaux, Éponges, Démaquillants, Faux cils' },
    ],
  },
  {
    category: 'PERSONAL CARE',
    color: '#A28B83',
    items: [
      { label: 'Skincare', sub: 'Nettoyants, Toniques, Sérums, Hydratants, Masques' },
      { label: 'Corps', sub: 'Gels douche, Laits corps, Gommages, Huiles' },
      { label: 'Cheveux', sub: 'Shampoings, Après-shampoings, Soins' },
      { label: 'Solaire', sub: 'SPF 30-50+, Après-soleil' },
      { label: 'Enfants', sub: 'Gamme dermo-pédiatrique douce' },
      { label: 'PRO', sub: 'Soins cabine, Peelings, Protocoles professionnels' },
    ],
  },
];

const TONE_LAYERS = [
  {
    level: 'Couche supérieure',
    words: ['Pure', 'Caring', 'Kind'],
    desc: 'Chaleureux, bienveillant, sincère — notre voix montre notre passion pour la confiance et la beauté authentique.',
    bg: '#D9A9B1',
    text: '#3F3132',
  },
  {
    level: 'Couche intermédiaire',
    words: ['Simple', 'Confident', 'Involved'],
    desc: 'Direct, sûr de lui, impliqué — nous comprenons les besoins de nos clients et y répondons sans superflu.',
    bg: '#A28B83',
    text: '#FAF8F5',
  },
  {
    level: 'Fondation',
    words: ['Innovative', 'Accessible', 'Inclusive'],
    desc: 'Innovant, accessible à tous les genres, âges et profils socio-économiques — la beauté sans frontières.',
    bg: '#3F3132',
    text: '#FAF8F5',
  },
];

const CERTIFICATIONS = [
  'Dermatologiquement testé',
  'ISO 22716',
  'Non-comédogène',
  'Hypoallergénique',
  'Testé ophtalmologiquement',
  'Sans parabènes',
  'Cruelty Free',
];

export default function About() {
  useSEO({
    title: 'À propos de SYN+ZYN | Marque Beauté Premium Accessible',
    description: 'Découvrez SYN+ZYN, marque beauté du Groupe AKSAL — notre vision, mission, valeurs et gamme de produits. Premium quality, accessible price.',
    canonical: '/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'À propos de SYN+ZYN',
      'description': 'Histoire, mission et valeurs de la marque SYN+ZYN, filiale du Groupe AKSAL.',
      'url': 'https://b2b.synzyn.ma/about',
    },
  });

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="bg-brand-dark min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.04]">
          {['simply', 'you.', 'for all', 'people.', 'everyday.'].map((word, i) => (
            <div
              key={i}
              className="absolute font-courier font-bold text-brand-cream whitespace-nowrap"
              style={{
                fontSize: '10vw',
                top: `${i * 20}%`,
                left: `${(i % 2) * 20 - 5}%`,
                transform: 'rotate(-8deg)',
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-6">
                À propos de SYN+ZYN
              </p>
              <h1 className="font-courier text-5xl sm:text-6xl md:text-7xl text-brand-cream uppercase leading-none tracking-brand mb-8">
                SIMPLY<br />
                <span className="text-brand-beige">YOU.</span>
              </h1>
              <p className="font-courier text-brand-taupe text-base leading-relaxed tracking-brand max-w-md">
                SYN+ZYN redéfinit ce que peut être un produit de beauté accessible —
                une formulation sérieuse, une présentation soignée, des performances à la hauteur
                des exigences professionnelles.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/catalogue" className="btn-outline-light inline-flex items-center gap-2">
                  Voir le catalogue <ArrowRight size={14} />
                </Link>
                <Link to="/register" className="border border-brand-taupe/50 text-brand-taupe font-courier text-xs uppercase tracking-brand-wide px-6 py-3 hover:bg-brand-taupe/10 transition-colors">
                  Devenir partenaire
                </Link>
              </div>
            </div>

            {/* Right: brand stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '200+', label: 'Références produits', color: '#D0B9AB' },
                { value: '14', label: 'Catégories', color: '#C27279' },
                { value: 'ISO\n22716', label: 'Certifié', color: '#B8ABD0' },
                { value: '2024', label: 'Lancé par Groupe AKSAL', color: '#A28B83' },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className="p-6 flex flex-col justify-between aspect-square"
                  style={{ backgroundColor: color + '20', borderLeft: `3px solid ${color}` }}
                >
                  <div
                    className="font-courier text-3xl md:text-4xl font-bold leading-none whitespace-pre-line"
                    style={{ color }}
                  >
                    {value}
                  </div>
                  <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mt-3">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-4">
            Notre vision
          </p>
          <blockquote className="font-courier text-2xl sm:text-3xl md:text-4xl text-brand-dark leading-tight tracking-brand max-w-3xl mx-auto">
            "Rendre des produits de beauté de haute qualité, tendance et magnifiquement conçus accessibles à tous —
            <span className="text-brand-taupe italic"> redéfinir ce que peut signifier le mot accessible."</span>
          </blockquote>
          <div className="mt-10 w-16 h-0.5 bg-brand-beige mx-auto" />
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-brand-cream-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Color block visual */}
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { color: '#D9A9B1', h: 'h-40', label: 'SKINCARE' },
                  { color: '#3F3132', h: 'h-56', label: 'MAKEUP' },
                  { color: '#C27279', h: 'h-32', label: 'LÈVRES' },
                  { color: '#B8ABD0', h: 'h-32', label: 'YEUX' },
                  { color: '#D0B9AB', h: 'h-40', label: 'CORPS' },
                  { color: '#A28B83', h: 'h-48', label: 'CHEVEUX' },
                ].map(({ color, h, label }) => (
                  <div
                    key={label}
                    className={`${h} relative flex flex-col justify-end p-2`}
                    style={{ backgroundColor: color }}
                  >
                    <span className="font-courier text-[9px] text-white/70 uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission text */}
            <div className="order-1 md:order-2">
              <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-4">
                Notre mission
              </p>
              <h2 className="font-courier text-3xl md:text-4xl text-brand-dark uppercase tracking-brand leading-tight mb-6">
                La qualité,<br />jamais au<br />détriment<br />du prix.
              </h2>
              <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-4">
                SYN+ZYN crée des produits de beauté qui combinent performance, qualité et accessibilité.
                Avec une offre large — du soin corps au makeup — notre marque en constante évolution
                répond à tous les besoins de soin, rendant la beauté accessible à chacun.
              </p>
              <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand">
                Notre proposition de valeur unique : <strong className="text-brand-dark">une beauté de qualité premium
                à un prix accessible</strong>, comblant le fossé entre le luxe et le quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND VALUES ── */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-3">
              Nos valeurs
            </p>
            <h2 className="font-courier text-3xl md:text-4xl text-brand-dark uppercase tracking-brand-wide">
              Ce qui nous définit
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-brand-beige">
            {BRAND_VALUES.map((v, i) => (
              <div
                key={v.label}
                className="p-6 md:p-8 flex flex-col gap-4 border-b sm:border-b-0 sm:border-r border-brand-beige/40 last:border-0"
                style={{ backgroundColor: v.color }}
              >
                <span
                  className="font-courier text-5xl font-bold opacity-20 leading-none select-none"
                  style={{ color: v.textColor }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-courier text-sm uppercase tracking-brand leading-tight"
                  style={{ color: v.textColor }}
                >
                  {v.label}
                </h3>
                <p
                  className="font-courier text-xs leading-relaxed tracking-brand opacity-80"
                  style={{ color: v.textColor }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT RANGE ── */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-3">
              Notre gamme
            </p>
            <h2 className="font-courier text-3xl md:text-4xl text-brand-dark uppercase tracking-brand-wide mb-3">
              200+ références
            </h2>
            <p className="font-courier text-sm text-brand-taupe tracking-brand max-w-xl mx-auto">
              Une offre complète couvrant tous les besoins beauté et soin personnel — du quotidien au professionnel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCT_RANGES.map((range) => (
              <div key={range.category} className="bg-white border border-brand-beige overflow-hidden">
                {/* Category header */}
                <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: range.color }}>
                  <h3 className="font-courier text-sm text-white uppercase tracking-brand-wider">
                    {range.category}
                  </h3>
                </div>
                {/* Items grid */}
                <div className="grid grid-cols-2 divide-x divide-y divide-brand-beige">
                  {range.items.map((item) => (
                    <div key={item.label} className="p-4">
                      <p className="font-courier text-sm text-brand-dark uppercase tracking-brand mb-1">
                        {item.label}
                      </p>
                      <p className="font-courier text-xs text-brand-taupe leading-relaxed">
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSITIONING STATEMENT ── */}
      <section className="bg-brand-dark py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute font-courier text-brand-cream font-bold uppercase select-none"
            style={{ fontSize: '20vw', bottom: '-2vw', right: '-2vw', lineHeight: 1, letterSpacing: '-0.02em' }}>
            B2B
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-4">
                Positionnement marché
              </p>
              <h2 className="font-courier text-4xl md:text-5xl text-brand-cream uppercase leading-tight tracking-brand mb-6">
                PREMIUM.<br />
                <span className="text-brand-beige">ACCESSIBLE.</span><br />
                POUR TOUS.
              </h2>
              <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand">
                Dans un marché beauté saturé, SYN+ZYN occupe une position unique :
                une esthétique visuelle premium et globale, à un prix d'entrée de gamme.
                Le meilleur des deux mondes — pour vos clients, pour votre marge.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { top: 'Positionnement prix', val: 'Accessible / Entrée de gamme', bar: 25, color: '#D0B9AB' },
                { top: 'Positionnement visuel', val: 'Premium / Global', bar: 80, color: '#C27279' },
                { top: 'Qualité formulation', val: 'Haute performance', bar: 90, color: '#B8ABD0' },
                { top: 'Couverture gamme', val: 'Généraliste complet', bar: 95, color: '#A28B83' },
              ].map(({ top, val, bar, color }) => (
                <div key={top}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-courier text-xs text-brand-taupe uppercase tracking-brand">{top}</span>
                    <span className="font-courier text-xs text-brand-beige tracking-brand">{val}</span>
                  </div>
                  <div className="h-1.5 bg-brand-taupe/20 w-full">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${bar}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TONE OF VOICE ── */}
      <section className="py-20 md:py-28 bg-brand-cream-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-3">
              Notre voix
            </p>
            <h2 className="font-courier text-3xl md:text-4xl text-brand-dark uppercase tracking-brand-wide">
              Ton & communication
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {TONE_LAYERS.map((layer) => (
              <div
                key={layer.level}
                className="p-6 md:p-8"
                style={{ backgroundColor: layer.bg }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <p
                      className="font-courier text-xs uppercase tracking-brand-wider opacity-60 mb-2"
                      style={{ color: layer.text }}
                    >
                      {layer.level}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {layer.words.map((w) => (
                        <span
                          key={w}
                          className="font-courier text-sm uppercase tracking-brand border px-3 py-1"
                          style={{ color: layer.text, borderColor: layer.text + '40' }}
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p
                    className="font-courier text-sm leading-relaxed tracking-brand opacity-80 md:border-l md:pl-6"
                    style={{ color: layer.text, borderColor: layer.text + '30' }}
                  >
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-16 bg-white border-y border-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-6 text-center">
            Certifications & conformité
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 border border-brand-beige bg-brand-cream px-4 py-2.5"
              >
                <CheckCircle2 size={13} className="text-brand-taupe flex-shrink-0" />
                <span className="font-courier text-sm text-brand-dark uppercase tracking-brand">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY B2B ── */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-3">
              Partenariat B2B
            </p>
            <h2 className="font-courier text-3xl md:text-4xl text-brand-dark uppercase tracking-brand-wide mb-4">
              Pourquoi distribuer SYN+ZYN ?
            </h2>
            <p className="font-courier text-sm text-brand-taupe tracking-brand max-w-2xl mx-auto">
              Rejoignez les pharmacies, grandes surfaces, spas et cliniques qui font confiance à SYN+ZYN
              pour offrir à leurs clients une beauté de qualité sans compromis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                title: 'Tarifs contractualisés',
                desc: 'Des prix négociés, des MOQ adaptés à votre volume et des conditions de paiement personnalisées.',
                color: '#3F3132',
              },
              {
                num: '02',
                title: 'Gamme complète',
                desc: '200+ références couvrant makeup, skincare, corps, cheveux, solaire et PRO — un seul fournisseur.',
                color: '#A28B83',
              },
              {
                num: '03',
                title: 'Qualité certifiée',
                desc: 'Toutes les formulations sont testées dermatologiquement et conformes aux normes internationales.',
                color: '#C27279',
              },
              {
                num: '04',
                title: 'Commercial dédié',
                desc: 'Un interlocuteur unique, disponible par email et WhatsApp, pour toutes vos questions et commandes.',
                color: '#B8ABD0',
              },
              {
                num: '05',
                title: 'Formation & support',
                desc: 'Accès à des formations vidéo, protocoles professionnels et matériel de formation exclusif.',
                color: '#D0B9AB',
              },
              {
                num: '06',
                title: 'Portail B2B complet',
                desc: 'Commandez, suivez, téléchargez vos factures et gérez votre compte en toute autonomie.',
                color: '#D9A9B1',
              },
            ].map(({ num, title, desc, color }) => (
              <div key={num} className="bg-white border border-brand-beige p-6 hover:border-brand-taupe transition-colors group">
                <div
                  className="font-courier text-4xl font-bold opacity-15 leading-none mb-4 group-hover:opacity-25 transition-opacity"
                  style={{ color }}
                >
                  {num}
                </div>
                <h3 className="font-courier text-sm text-brand-dark uppercase tracking-brand mb-2">
                  {title}
                </h3>
                <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE COMPANY ── */}
      <section className="bg-white py-20 md:py-28 border-t border-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-4">
                Notre groupe
              </p>
              <h2 className="font-courier text-3xl md:text-4xl text-brand-dark uppercase tracking-brand leading-tight mb-6">
                Une marque<br />du Groupe<br />AKSAL
              </h2>
              <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-4">
                SYN+ZYN est une marque développée et distribuée par KAK Synergy, filiale du Groupe AKSAL —
                l'un des acteurs majeurs du retail et de la distribution au Maroc.
              </p>
              <p className="font-courier text-sm text-brand-taupe leading-relaxed tracking-brand mb-6">
                Fort de la puissance du groupe, SYN+ZYN bénéficie d'un réseau de distribution établi,
                de capacités logistiques éprouvées et d'une expertise profonde du marché marocain et régional.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-brand-beige pt-6">
                {[
                  ['KAK SYNERGY SA', 'Entité commerciale'],
                  ['IF: 52426360', 'Identifiant fiscal'],
                  ['RC: 542021', 'Registre du commerce'],
                  ['ICE: 003043488000053', 'Identifiant commun'],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p className="font-courier text-sm text-brand-dark">{val}</p>
                    <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual block */}
            <div className="relative">
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="bg-brand-dark flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="font-courier text-5xl text-brand-cream font-bold">2024</p>
                      <p className="font-courier text-xs text-brand-taupe uppercase tracking-brand mt-1">Lancement</p>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#C27279' }} className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="font-courier text-5xl text-white font-bold">200+</p>
                      <p className="font-courier text-xs text-white/70 uppercase tracking-brand mt-1">Références</p>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#D0B9AB' }} className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="font-courier text-5xl text-brand-dark font-bold">14</p>
                      <p className="font-courier text-xs text-brand-dark/70 uppercase tracking-brand mt-1">Catégories</p>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#B8ABD0' }} className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="font-courier text-3xl text-brand-dark font-bold leading-tight">ISO<br />22716</p>
                      <p className="font-courier text-xs text-brand-dark/70 uppercase tracking-brand mt-1">Certifié</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-dark py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-courier text-brand-taupe text-xs uppercase tracking-brand-wider mb-4">
            Rejoignez nos partenaires
          </p>
          <h2 className="font-courier text-4xl md:text-5xl text-brand-cream uppercase tracking-brand leading-tight mb-6">
            SIMPLEMENT<br />
            <span className="text-brand-beige">VOUS.</span>
          </h2>
          <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed max-w-lg mx-auto mb-10">
            Pharmacies, revendeurs, spas, cliniques — obtenez vos conditions B2B personnalisées
            et accédez à toute la gamme SYN+ZYN.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-outline-light inline-flex items-center justify-center gap-2">
              Créer un compte B2B <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="border border-brand-taupe/50 text-brand-taupe font-courier text-xs uppercase tracking-brand-wide px-6 py-3 hover:bg-brand-taupe/10 transition-colors inline-flex items-center justify-center">
              Parler à un commercial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
