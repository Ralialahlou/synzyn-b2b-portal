import { NavLink, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, ShoppingBag,
  PackageCheck, Download, Heart, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', end: true },
  { to: '/dashboard/profile', icon: User, label: 'Mon profil' },
  { to: '/dashboard/contract', icon: PackageCheck, label: 'Mon contrat' },
  { to: '/dashboard/orders', icon: ShoppingBag, label: 'Mes commandes' },
  { to: '/dashboard/invoices', icon: FileText, label: 'Mes factures' },
  { to: '/dashboard/favorites', icon: Heart, label: 'Mes favoris' },
  { to: '/dashboard/downloads', icon: Download, label: 'Documents' },
  { to: '/dashboard/support', icon: MessageSquare, label: 'Support' },
];

export default function DashboardLayout() {
  const { isLoggedIn, client } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Dashboard header bar */}
      <div className="bg-white border-b border-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-courier text-base text-brand-dark uppercase tracking-brand-wide">
                {client?.companyName}
              </h1>
              <p className="font-courier text-xs text-brand-taupe tracking-brand mt-0.5">
                Code client: {client?.clientCode} · {client?.type}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="font-courier text-xs text-brand-taupe tracking-brand">Commercial dédié</p>
                <p className="font-courier text-xs text-brand-dark">{client?.assignedRep.name}</p>
              </div>
              <a
                href={`https://wa.me/${client?.assignedRep.whatsapp?.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-3 flex items-center gap-1"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-52 flex-shrink-0">
            <nav className="bg-white border border-brand-beige">
              {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 font-courier text-xs uppercase tracking-brand border-b border-brand-beige last:border-0 transition-colors ${
                      isActive
                        ? 'bg-brand-dark text-brand-cream'
                        : 'text-brand-taupe hover:bg-brand-cream hover:text-brand-dark'
                    }`
                  }
                >
                  <Icon size={13} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
