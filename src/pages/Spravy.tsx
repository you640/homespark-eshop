import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Wifi, 
  WifiOff, 
  BookOpen, 
  Terminal,
  Clock,
  Search,
  Inbox
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  categoryName: string;
  imageUrl: string;
}

// Vybrané prémiové obrázky z Unsplash podľa tém
const THEME_IMAGES: Record<string, string> = {
  lighting: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
  smarthome: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
  trends: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
};

// Štýly odznakov pre kategórie s jemnými pastelovými HSL farbami
const CATEGORY_COLORS: Record<string, string> = {
  'Osvetlenie': 'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400',
  'Smart Home': 'border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-400',
  'Bytové doplnky': 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
  'default': 'border-primary/20 bg-primary/5 text-primary'
};

const MOCK_POSTS: WordPressPost[] = [
  {
    id: 101,
    title: { rendered: '5 Tipy pre moderné osvetlenie vašej obývačky' },
    excerpt: { rendered: '<p>Objavte 5 overených tipov pre moderné a útulné osvetlenie obývačky. Správne svetlo dokáže úplne zmeniť charakter a náladu celej miestnosti...</p>' },
    content: { rendered: `
      <p>Osvetlenie je kľúčovým prvkom každého moderného domova. V tomto článku sa pozrieme na 5 overených tipov, ako správne rozmiestniť svetlá, kombinovať ambientné a funkčné svetelné zdroje a vytvoriť tak útulnú atmosféru vo vašej obývačke.</p>
      
      <h3>1. Kombinujte rôzne typy svetiel</h3>
      <p>Nespoliehajte sa len na jedno centrálne stropné svietidlo. Skombinujte ho so stojacími lampami, stolnými lampičkami a jemným LED podsvietením (napr. za televízorom alebo na policiach). Tým vytvoríte hĺbku a priestor bude pôsobiť útulnejšie.</p>
      
      <h3>2. Dbajte na teplotu svetla</h3>
      <p>Pre relaxačné zóny, ako je obývacia izba, je ideálne teplé žlté svetlo (2700K - 3000K). Podporuje tvorbu melatonínu a pomáha telu pripraviť sa na spánok. Naopak, biele svetlo (4000K+) si nechajte do kuchyne alebo pracovne.</p>

      <h3>3. Využite stmievače</h3>
      <p>Stmievateľné LED žiarovky vám umožnia okamžite zmeniť atmosféru – od jasného svetla na čítanie až po intímne prítmie na večerný film.</p>
    ` },
    date: new Date().toISOString(),
    slug: '5-tipov-pre-moderne-osvetlenie',
    categoryName: 'Osvetlenie',
    imageUrl: THEME_IMAGES.lighting
  },
  {
    id: 102,
    title: { rendered: 'Ako premeniť váš domov na smart domácnosť' },
    excerpt: { rendered: '<p>Návod krok za krokom, ako začať s inteligentnou domácnosťou jednoducho a rýchlo, bez nutnosti drahých stavebných úprav...</p>' },
    content: { rendered: `
      <p>Začať so smart domácnosťou nebolo nikdy jednoduchšie. Nemusíte hneď rekonštruovať celý byt a ťahať metre nových káblov. Moderné smart technológie fungujú bezdrôtovo a dajú sa rozširovať postupne.</p>
      
      <h3>Začnite s maličkosťami</h3>
      <p>Ideálním štartom sú inteligentné žiarovky a smart zásuvky. Dajú sa ovládať priamo z telefónu a viete si nastaviť automatické plány (napríklad vypnutie všetkých svetiel pri odchode z domu).</p>
      
      <h3>Pridajte senzory a bezpečnosť</h3>
      <p>V druhom kroku odporúčame pridať pohybové senzory alebo inteligentný zámok na dvere. Nielenže vám to zjednoduší život (svetlo na chodbe sa zapne samo, keď prídete domov s nákupom), ale výrazne to zvýši bezpečnosť vašej domácnosti.</p>
    ` },
    date: new Date(Date.now() - 86400000).toISOString(),
    slug: 'ako-premenit-domov-na-smart',
    categoryName: 'Smart Home',
    imageUrl: THEME_IMAGES.smarthome
  },
  {
    id: 103,
    title: { rendered: 'Trendy v interiérovom dizajne pre tento rok' },
    excerpt: { rendered: '<p>Tento rok sa nesie v znamení prírodných materiálov, teplých zemitých farieb a minimalistických detailov. Pozrite sa, čo poletí...</p>' },
    content: { rendered: `
      <p>Interiérový dizajn sa neustále vyvíja, no tohtoročné trendy sú jasným návratom k prírode, udržateľnosti a útulnému minimalizmu.</p>
      
      <h3>1. Návrat k zemi</h3>
      <p>Teplé zemité tóny ako terakota, olivovo zelená, piesková a krémová nahrádzajú niekdajšiu chladnú sivú. Tieto farby prinášajú do domova pokoj a pocit stability.</p>
      
      <h3>2. Prírodné materiály sú kráľom</h3>
      <p>Drevo s výraznou textúrou, kameň, ľan, ratan a kov. Investícia do kvalitných kusov nábytku z masívu sa oplatí nielen z estetického, ale aj ekologického hľadiska.</p>

      <h3>3. Organické tvary</h3>
      <p>Ostré hrany ustupujú jemným krivkám. Oblé sedačky, kruhové stoly a zrkadlá s organickým tvarom zjemňujú celkový vzhľad miestnosti.</p>
    ` },
    date: new Date(Date.now() - 172800000).toISOString(),
    slug: 'trendy-v-interierovom-dizajne',
    categoryName: 'Bytové doplnky',
    imageUrl: THEME_IMAGES.trends
  }
];

export default function Spravy() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWordPressConnected, setIsWordPressConnected] = useState(false);
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);
  
  // Stavy pre vyhľadávanie a filtrovanie kategórií
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Všetko');

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        // Skúsime načítať príspevky zo spusteného lokálneho WordPressu
        const response = await fetch('http://localhost:18095/wp-json/wp/v2/posts/');
        if (!response.ok) {
          throw new Error('Nepodarilo sa načítať WordPress príspevky');
        }
        
        const data = await response.json();
        
        interface WordPressRawPost {
          id: number;
          title: { rendered: string };
          excerpt: { rendered: string };
          content: { rendered: string };
          date: string;
          slug: string;
        }

        // Namapujeme príspevky a priradíme im prislúchajúce obrázky a kategórie
        const mappedPosts = data.map((post: WordPressRawPost) => {
          const titleText = post.title.rendered.toLowerCase();
          
          let imageUrl = THEME_IMAGES.default;
          let categoryName = 'Bytové doplnky';
          
          if (titleText.includes('svetlo') || titleText.includes('osvetlenie')) {
            imageUrl = THEME_IMAGES.lighting;
            categoryName = 'Osvetlenie';
          } else if (titleText.includes('smart') || titleText.includes('inteligent')) {
            imageUrl = THEME_IMAGES.smarthome;
            categoryName = 'Smart Home';
          } else if (titleText.includes('trend') || titleText.includes('dizajn')) {
            imageUrl = THEME_IMAGES.trends;
            categoryName = 'Bytové doplnky';
          }

          return {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            date: post.date,
            slug: post.slug,
            categoryName,
            imageUrl
          };
        });

        // Zoradíme príspevky od najnovších
        setPosts(mappedPosts);
        setIsWordPressConnected(true);
      } catch (error) {
        console.warn('WordPress API je nedostupné, načítavam prémiové demo príspevky:', error);
        setPosts(MOCK_POSTS);
        setIsWordPressConnected(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Dynamický výpočet doby čítania na základe dĺžky textu (200 slov za minútu)
  const calculateReadingTime = (htmlContent: string) => {
    const textOnly = htmlContent.replace(/<[^>]*>/g, '');
    const wordCount = textOnly.trim().split(/\s+/).length;
    return Math.max(1, Math.round(wordCount / 200));
  };

  // Filtrovanie článkov na základe vyhľadávania a zvolenej kategórie
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.rendered.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'Všetko' || post.categoryName === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Helmet>
        <title>Inšpirácie & Tipy – Homespark</title>
      </Helmet>
      
      <div className="section-container py-12 md:py-16">
        {/* Connection Status Badge */}
        <div className="flex justify-center mb-6">
          {isWordPressConnected ? (
            <Badge variant="outline" className="px-4 py-2 border-emerald-500/30 bg-emerald-500/5 text-emerald-500 flex items-center gap-2 rounded-full animate-pulse font-medium text-xs">
              <Wifi className="h-3.5 w-3.5" />
              <span>Naživo pripojené k WordPressu</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="px-4 py-2 border-amber-500/30 bg-amber-500/5 text-amber-500 flex items-center gap-2 rounded-full font-medium text-xs">
              <WifiOff className="h-3.5 w-3.5" />
              <span>Offline režim (Demo články)</span>
            </Badge>
          )}
        </div>

        {/* Header Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
            Inšpirácie & Tipy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Objavte svet moderného bývania, inteligentných technológií a interiérového dizajnu s našimi blogovými príspevkami.
          </p>
        </div>

        {/* Development Helper banner (visible only when offline) */}
        {!isWordPressConnected && !isLoading && (
          <div className="mb-12 glass p-6 rounded-3xl border-amber-500/20 max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <Terminal className="h-6 w-6" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-foreground">Vývojárska poznámka</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Lokálny WordPress na porte **18095** nie je spustený. Spustite ho pomocou nasledujúceho príkazu vo vašom termináli pre živé prepojenie:
              </p>
              <code className="block mt-2 p-2 bg-black/40 text-rose-300 rounded text-xs overflow-x-auto select-all font-mono">
                docker compose -f local-wordpress/docker-compose.yml up -d db wordpress
              </code>
            </div>
          </div>
        )}

        {/* Vyhľadávanie a Kategórie s prémiovým dizajnom */}
        {!isLoading && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
            {/* Filtre kategórií */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {['Všetko', 'Osvetlenie', 'Smart Home', 'Bytové doplnky'].map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  className={`rounded-full px-5 transition-all duration-300 font-medium text-xs h-9 ${
                    activeCategory === cat 
                      ? 'shadow-md shadow-primary/10' 
                      : 'hover:bg-muted'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Vyhľadávací riadok */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Hľadať články..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full bg-muted/40 border-muted focus:bg-background h-9 text-xs w-full transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-8 space-y-4">
                  <div className="h-4 w-24 bg-muted rounded-full" />
                  <div className="h-6 w-full bg-muted rounded-lg" />
                  <div className="h-6 w-2/3 bg-muted rounded-lg" />
                  <div className="h-4 w-full bg-muted rounded-lg" />
                  <div className="h-4 w-4/5 bg-muted rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty / No Results State */
          filteredPosts.length === 0 ? (
            <div className="text-center py-16 glass rounded-3xl max-w-xl mx-auto border-border/50">
              <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold font-display mb-1">Žiadne články sa nenašli</h3>
              <p className="text-muted-foreground text-sm px-6">
                Skúste zadať iné kľúčové slovo alebo prepnúť filter kategórií na zobrazenie iných príspevkov.
              </p>
              <Button 
                onClick={() => { setSearchQuery(''); setActiveCategory('Všetko'); }}
                variant="outline" 
                className="mt-6 rounded-2xl text-xs"
              >
                Resetovať filtre
              </Button>
            </div>
          ) : (
            /* Blog Grid */
            <div className="grid md:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <article 
                  key={post.id} 
                  className="glass group rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col border border-border/50 hover:border-primary/20 animate-scale-in"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Featured Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title.rendered} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`backdrop-blur-md border font-semibold text-xs px-3 py-1 rounded-full ${CATEGORY_COLORS[post.categoryName] || CATEGORY_COLORS.default}`}>
                        {post.categoryName}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {calculateReadingTime(post.content.rendered)} min. čítania
                      </span>
                    </div>

                    <h3 
                      className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors font-display"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div 
                      className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    <Button 
                      onClick={() => setSelectedPost(post)}
                      className="w-full justify-between items-center bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-all duration-300 rounded-2xl h-11"
                    >
                      <span>Čítať článok</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )
        )}
      </div>

      {/* Full Article Dialog */}
      <Dialog open={selectedPost !== null} onOpenChange={(open) => !open && setSelectedPost(null)}>
        {selectedPost && (
          <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh] p-0 rounded-3xl gap-0 border-border/50 glass">
            {/* Header Image */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden bg-muted">
              <img 
                src={selectedPost.imageUrl} 
                alt={selectedPost.title.rendered} 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className={`mb-3 border backdrop-blur-md font-semibold ${CATEGORY_COLORS[selectedPost.categoryName] || CATEGORY_COLORS.default}`}>{selectedPost.categoryName}</Badge>
                <DialogTitle 
                  className="text-2xl md:text-4xl font-display font-bold tracking-tight text-white drop-shadow-sm"
                  dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }}
                />
              </div>
            </div>

            {/* Post Meta and Body */}
            <div className="p-6 md:p-10 space-y-6">
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b pb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {formatDate(selectedPost.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Napísal: Redakcia Homespark
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {calculateReadingTime(selectedPost.content.rendered)} minúty čítania
                </span>
              </div>

              {/* HTML Content Body */}
              <div 
                className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 space-y-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}
              />

              <div className="flex justify-end pt-6 border-t">
                <Button 
                  onClick={() => setSelectedPost(null)}
                  variant="outline"
                  className="rounded-2xl px-6"
                >
                  Zatvoriť článok
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
}
