import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderCancel from "./pages/OrderCancel";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import Spravy from "./pages/Spravy";
import Predajne from "./pages/Predajne";
import Wishlist from "./pages/Wishlist";
import Sukromie from "./pages/Sukromie";
import Podmienky from "./pages/Podmienky";
import Search from "./pages/Search";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import { About, Contact, Shipping, Returns, Tracking } from "./pages/Info";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

const queryClient = new QueryClient();

type NavigatorWithBadging = Navigator & {
  setAppBadge?(contents?: number): Promise<void>;
  clearAppBadge?(): Promise<void>;
};

const AppContent = () => {
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    // Badging API
    if ('setAppBadge' in navigator) {
      const nav = navigator as NavigatorWithBadging;
      if (itemCount > 0) {
        nav.setAppBadge?.(itemCount).catch(() => {});
      } else {
        nav.clearAppBadge?.().catch(() => {});
      }
    }
  }, [itemCount]);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/prihlasenie" element={<Login />} />
        <Route path="/registracia" element={<Register />} />
        <Route path="/kosik" element={<Cart />} />
        <Route path="/kategoria/:slug" element={<Category />} />
        <Route path="/produkt/:slug" element={<Product />} />
        <Route path="/pokladna" element={<Checkout />} />
        <Route path="/objednavka/success" element={<OrderSuccess />} />
        <Route path="/objednavka/cancel" element={<OrderCancel />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/spravy" element={<Spravy />} />
        <Route path="/predajne" element={<Predajne />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/vyhladavanie" element={<Search />} />
        <Route path="/ucet" element={<Account />} />
        <Route path="/ucet/objednavky" element={<Orders />} />
        <Route path="/sledovanie" element={<Tracking />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/doprava" element={<Shipping />} />
        <Route path="/vratenie" element={<Returns />} />
        <Route path="/zabudnute-heslo" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/sukromie" element={<Sukromie />} />
        <Route path="/podmienky" element={<Podmienky />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
