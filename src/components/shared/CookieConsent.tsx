import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const COOKIE_KEY = 'merkury-cookie-consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Delay showing to avoid layout shift
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setIsVisible(false);
    // Mock analytics event
    console.log('[Analytics] Cookie consent: accepted');
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setIsVisible(false);
    console.log('[Analytics] Cookie consent: declined');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="section-container">
        <div className="bg-card rounded-2xl shadow-xl border p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">🍪 Súbory cookies</h3>
            <p className="text-sm text-muted-foreground">
              Používame cookies na zlepšenie vášho zážitku z nakupovania, personalizáciu obsahu a analýzu návštevnosti. 
              Kliknutím na "Prijať" súhlasíte s ich používaním.{' '}
              <a href="/sukromie" className="text-primary hover:underline">
                Viac informácií
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="outline" onClick={handleDecline}>
              Odmietnuť
            </Button>
            <Button onClick={handleAccept}>
              Prijať všetky
            </Button>
          </div>
          <button 
            onClick={handleDecline}
            className="absolute top-4 right-4 md:hidden p-1 rounded-full hover:bg-muted"
            aria-label="Zavrieť"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
