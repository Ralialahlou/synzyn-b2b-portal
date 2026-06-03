import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/ui/CartDrawer';
import ScrollToTop from './components/ui/ScrollToTop';

import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Training from './pages/Training';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import About from './pages/About';

import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Profile from './pages/dashboard/Profile';
import Contract from './pages/dashboard/Contract';
import Orders from './pages/dashboard/Orders';
import Invoices from './pages/dashboard/Invoices';
import Favorites from './pages/dashboard/Favorites';
import Downloads from './pages/dashboard/Downloads';
import Support from './pages/dashboard/Support';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/training" element={<Training />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contract" element={<Contract />} />
            <Route path="orders" element={<Orders />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="support" element={<Support />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
