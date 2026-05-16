import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(event);
      // Show the custom prompt after 5 seconds
      const timer = setTimeout(() => {
        const isDismissed = localStorage.getItem('pwa-install-dismissed');
        if (!isDismissed) {
          setShowPrompt(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Also check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install');
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[60] animate-slide-up md:bottom-8 md:left-auto md:right-8 md:w-96">
      <div className="glass rounded-2xl p-4 shadow-2xl border-primary/20">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Download className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display font-bold text-lg">Nainštalujte si appku</h3>
              <button 
                onClick={dismissPrompt}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Získajte rýchlejší prístup a exkluzívne ponuky priamo na ploche.
            </p>
            <div className="mt-4 flex gap-2">
              <Button 
                onClick={handleInstall}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 border-0 text-white"
              >
                Inštalovať
              </Button>
              <Button 
                variant="ghost" 
                onClick={dismissPrompt}
                className="flex-1"
              >
                Neskôr
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
