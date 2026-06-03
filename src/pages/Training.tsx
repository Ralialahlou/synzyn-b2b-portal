import { Lock, Play, Clock, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSEO } from '../hooks/useSEO';

const VIDEOS = [
  {
    id: 'v001',
    title: 'Introduction à la gamme Skincare SYN+ZYN',
    category: 'Skincare',
    duration: '18 min',
    thumbnail: '#D9A9B1',
    level: 'Débutant',
    description: 'Présentation complète de la gamme skincare : formulations, bénéfices et positionnement professionnel.',
    restricted: false,
  },
  {
    id: 'v002',
    title: 'Protocoles de soins — Hydratation intensive',
    category: 'Skincare',
    duration: '24 min',
    thumbnail: '#B8ABD0',
    level: 'Intermédiaire',
    description: 'Apprenez à mettre en place des protocoles de soins hydratants optimaux pour votre clientèle.',
    restricted: true,
  },
  {
    id: 'v003',
    title: 'Makeup professionnel — Techniques de base',
    category: 'Makeup',
    duration: '32 min',
    thumbnail: '#C27279',
    level: 'Débutant',
    description: 'Les fondamentaux du maquillage professionnel avec les produits SYN+ZYN.',
    restricted: false,
  },
  {
    id: 'v004',
    title: 'PRO Peel — Formation et certification',
    category: 'PRO',
    duration: '45 min',
    thumbnail: '#3F3132',
    level: 'Avancé',
    description: 'Formation complète sur l\'utilisation du PRO Peel 30%. Réservé aux professionnels certifiés.',
    restricted: true,
  },
  {
    id: 'v005',
    title: 'Body Care — Rituels professionnels',
    category: 'Body Care',
    duration: '20 min',
    thumbnail: '#D0B9AB',
    level: 'Intermédiaire',
    description: 'Développez vos ventes body care avec des rituels et recommandations personnalisées.',
    restricted: true,
  },
  {
    id: 'v006',
    title: 'Merchandising et mise en avant produit',
    category: 'Commercial',
    duration: '15 min',
    thumbnail: '#A28B83',
    level: 'Débutant',
    description: 'Conseils de présentation et merchandising pour maximiser vos ventes en point de vente.',
    restricted: false,
  },
];

const WEBINARS = [
  {
    id: 'w001',
    title: 'Lancement gamme Été 2025 — Nouveautés Sun Care',
    date: '15 Juillet 2025',
    time: '14h00',
    duration: '60 min',
    status: 'upcoming',
  },
  {
    id: 'w002',
    title: 'Formation PRO — Peeling et soins intensifs',
    date: '22 Juillet 2025',
    time: '10h00',
    duration: '90 min',
    status: 'upcoming',
  },
];

export default function Training() {
  useSEO({
    title: 'Formation Professionnelle | SYN+ZYN B2B',
    description: 'Accédez aux formations vidéo professionnelles SYN+ZYN — protocoles beauté, techniques de vente et certifications produits. Réservé aux clients B2B.',
    canonical: '/training',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'SYN+ZYN Formation',
      'description': 'Centre de formation professionnelle SYN+ZYN pour partenaires B2B.',
      'url': 'https://b2b.synzyn.ma/training',
    },
  });

  const { isLoggedIn } = useAuth();

  const freeVideos = VIDEOS.filter((v) => !v.restricted);
  const restrictedVideos = VIDEOS.filter((v) => v.restricted);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={18} className="text-brand-taupe" />
            <p className="font-courier text-brand-taupe text-xs tracking-brand-wider uppercase">
              Formation professionnelle
            </p>
          </div>
          <h1 className="font-courier text-3xl text-brand-cream tracking-brand-wide uppercase">
            Centre de formation
          </h1>
          <p className="font-courier text-brand-taupe text-xs tracking-brand mt-2 max-w-xl">
            Maîtrisez nos produits et maximisez vos ventes avec nos formations vidéo professionnelles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Free videos */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
              Formations accessibles
            </h2>
            <span className="font-courier text-xs text-brand-taupe tracking-brand">{freeVideos.length} vidéo(s)</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeVideos.map((video) => (
              <VideoCard key={video.id} video={video} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </div>

        {/* Restricted videos */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
                Formations clients B2B
              </h2>
              {!isLoggedIn && <Lock size={14} className="text-brand-taupe" />}
            </div>
            <span className="font-courier text-xs text-brand-taupe tracking-brand">{restrictedVideos.length} vidéo(s)</span>
          </div>

          {!isLoggedIn && (
            <div className="bg-brand-dark p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-courier text-sm text-brand-cream mb-1">
                  Accès réservé aux clients B2B enregistrés
                </p>
                <p className="font-courier text-xs text-brand-taupe tracking-brand">
                  Connectez-vous pour accéder aux formations avancées et aux protocoles professionnels.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/login" className="btn-outline-light text-xs py-2 px-4">Se connecter</Link>
                <Link to="/register" className="btn-secondary border-brand-taupe text-brand-taupe hover:bg-brand-taupe hover:text-brand-dark text-xs py-2 px-4">
                  Créer un compte
                </Link>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {restrictedVideos.map((video) => (
              <VideoCard key={video.id} video={video} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </div>

        {/* Webinars */}
        <div>
          <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide mb-5">
            Webinaires à venir
          </h2>
          <div className="space-y-3">
            {WEBINARS.map((w) => (
              <div key={w.id} className="bg-white border border-brand-beige p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-courier text-sm text-brand-dark mb-1">{w.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-courier text-xs text-brand-taupe tracking-brand">{w.date} à {w.time}</span>
                    <span className="font-courier text-xs text-brand-taupe tracking-brand flex items-center gap-1">
                      <Clock size={10} />{w.duration}
                    </span>
                  </div>
                </div>
                {isLoggedIn ? (
                  <button className="btn-primary text-xs py-2 px-4">
                    S'inscrire
                  </button>
                ) : (
                  <Link to="/login" className="btn-secondary text-xs py-2 px-4">
                    Connexion requise
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({
  video,
  isLoggedIn,
}: {
  video: (typeof VIDEOS)[0];
  isLoggedIn: boolean;
}) {
  const isAccessible = !video.restricted || isLoggedIn;

  return (
    <div className={`bg-white border border-brand-beige overflow-hidden group ${!isAccessible ? 'opacity-80' : ''}`}>
      {/* Thumbnail */}
      <div
        className="relative aspect-video flex items-center justify-center"
        style={{ backgroundColor: video.thumbnail + '30' }}
      >
        <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
          {isAccessible ? (
            <Play size={20} className="text-brand-dark ml-1" fill="currentColor" />
          ) : (
            <Lock size={16} className="text-brand-taupe" />
          )}
        </div>
        <div className="absolute top-3 left-3 flex gap-1">
          <span className="font-courier text-xs uppercase tracking-brand px-2 py-0.5 bg-white/80 text-brand-dark">
            {video.category}
          </span>
          <span className="font-courier text-xs uppercase tracking-brand px-2 py-0.5 bg-white/80 text-brand-taupe">
            {video.level}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white px-2 py-0.5 rounded">
          <Clock size={9} />
          <span className="font-courier text-xs">{video.duration}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-courier text-xs text-brand-dark leading-tight mb-1">{video.title}</h3>
        <p className="font-courier text-sm text-brand-taupe tracking-brand leading-relaxed">
          {video.description}
        </p>
        <div className="mt-3">
          {isAccessible ? (
            <button className="flex items-center gap-1 font-courier text-xs text-brand-dark hover:text-brand-taupe uppercase tracking-brand transition-colors">
              <Play size={11} />Regarder <ChevronRight size={10} />
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand transition-colors"
            >
              <Lock size={11} />Connexion requise <ChevronRight size={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
