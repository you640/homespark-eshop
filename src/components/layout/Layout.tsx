import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileCartButton } from '@/components/cart/MobileCartButton';
import { CookieConsent } from '@/components/shared/CookieConsent';
import { InstallPrompt } from '@/components/shared/InstallPrompt';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  hideMobileCart?: boolean;
}

export function Layout({ children, hideFooter = false, hideMobileCart = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      {!hideMobileCart && <MobileCartButton />}
      <CookieConsent />
      <InstallPrompt />
    </div>
  );
}
