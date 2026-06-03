import { Download, FileText, Shield, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

const docTypeConfig = {
  'product-sheet': { icon: FileText, label: 'Fiche produit', color: 'text-brand-taupe' },
  'protocol': { icon: Shield, label: 'Protocole', color: 'text-blue-600' },
  'training': { icon: GraduationCap, label: 'Formation', color: 'text-brand-rose' },
};

export default function Downloads() {
  const { client } = useAuth();

  const allDocs = client?.contractProducts.flatMap((cp) => {
    const product = products.find((p) => p.id === cp.productId);
    return cp.documents.map((doc) => ({
      ...doc,
      productId: cp.productId,
      productName: product?.name || cp.productId,
      productColor: product?.imageColor || '#A28B83',
    }));
  }) || [];

  const grouped = allDocs.reduce<Record<string, typeof allDocs>>((acc, doc) => {
    const type = doc.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">Centre de téléchargement</h2>
        <span className="font-courier text-xs text-brand-taupe tracking-brand">{allDocs.length} document(s)</span>
      </div>

      {(['product-sheet', 'protocol', 'training'] as const).map((type) => {
        const docs = grouped[type];
        if (!docs || docs.length === 0) return null;
        const { icon: Icon, label, color } = docTypeConfig[type];

        return (
          <div key={type} className="bg-white border border-brand-beige">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-brand-beige">
              <Icon size={15} className={color} />
              <h3 className="font-courier text-sm text-brand-dark uppercase tracking-brand-wide">
                {label}s
              </h3>
              <span className="font-courier text-xs text-brand-taupe border border-brand-beige px-1.5 py-0.5 ml-auto">
                {docs.length}
              </span>
            </div>
            <div className="divide-y divide-brand-beige">
              {docs.map((doc) => (
                <div key={`${doc.productId}-${doc.name}`} className="px-5 py-3 flex items-center gap-3 hover:bg-brand-cream transition-colors">
                  <div
                    className="w-8 h-8 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: doc.productColor + '40' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-courier text-xs text-brand-dark truncate">{doc.name}</p>
                    <p className="font-courier text-xs text-brand-taupe tracking-brand">{doc.productName}</p>
                  </div>
                  <a
                    href={doc.url}
                    className="flex items-center gap-1.5 font-courier text-xs text-brand-taupe hover:text-brand-dark uppercase tracking-brand border border-brand-beige px-2.5 py-1.5 hover:bg-white transition-colors flex-shrink-0"
                  >
                    <Download size={10} />
                    PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {allDocs.length === 0 && (
        <div className="bg-white border border-brand-beige p-10 text-center">
          <Download size={32} className="mx-auto text-brand-taupe mb-3" />
          <p className="font-courier text-sm text-brand-taupe">Aucun document disponible.</p>
        </div>
      )}
    </div>
  );
}
