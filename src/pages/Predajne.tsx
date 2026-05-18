import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { MapPin } from 'lucide-react';

export default function Predajne() {
  return (
    <Layout>
      <Helmet>
        <title>Naše predajne – Homespark</title>
      </Helmet>
      <div className="section-container py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">Naše predajne</h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass p-8 md:p-10 rounded-[2rem] animate-scale-in">
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <MapPin className="text-primary h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Bratislava - Petržalka</h2>
                <p className="text-muted-foreground">Lužná 5, 851 04 Bratislava</p>
              </div>
            </div>
            
            <div className="space-y-4 border-t border-primary/10 pt-8">
              <div className="flex justify-between items-center">
                <span className="font-medium">Pondelok - Piatok</span>
                <span className="text-muted-foreground">09:00 - 20:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                <span className="font-medium">Sobota - Nedeľa</span>
                <span className="text-muted-foreground">09:00 - 19:00</span>
              </div>
            </div>
            
            <button className="w-full mt-10 btn-hero py-4 text-base shadow-xl shadow-primary/20">
              Navigovať do predajne
            </button>
          </div>
          
          <div className="bg-muted/30 rounded-[2rem] flex items-center justify-center text-muted-foreground italic p-12 text-center border-2 border-dashed border-primary/20">
            <div>
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Mapa sa pripravuje...</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
