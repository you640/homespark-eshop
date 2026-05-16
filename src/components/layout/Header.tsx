import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/cart-store';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { name: 'Smart Home', slug: 'smart home', icon: '🏠' },
  { name: 'Osvetlenie', slug: 'osvetlenie', icon: '💡' },
  { name: 'Bytové doplnky', slug: 'bytové doplnky', icon: '🛋️' },
  { name: 'Všetky produkty', slug: 'vsetko', icon: '✨' },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vyhladavanie?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "border-b bg-card/80 backdrop-blur-lg shadow-sm py-0" 
        : "border-b bg-card py-1"
    )}>
      {/* Top bar */}
      <div className="hidden border-b bg-muted/50 md:block">
        <div className="section-container flex h-9 items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>📞 +421 123 456 789</span>
            <span>✉️ info@homespark.sk</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link to="/spravy" className="hover:text-foreground transition-colors">
              Novinky & Tipy
            </Link>
            <Link to="/predajne" className="hover:text-foreground transition-colors">
              Predajne
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="section-container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden touch-target">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl font-display font-bold text-gradient">Homespark</span>
                  </Link>
                </div>
                <nav className="flex-1 overflow-auto p-4">
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/kategoria/${cat.slug}`}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors touch-target"
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t space-y-1">
                    <Link
                      to="/ucet"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Môj účet</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Zoznam želaní</span>
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl md:text-2xl font-display font-bold text-gradient">
              Homespark
            </span>
          </Link>

          {/* Desktop search */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Hľadať produkty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-11 rounded-full border-muted bg-muted/50 focus:bg-background"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden touch-target"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Wishlist - desktop only */}
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Zoznam želaní</span>
              </Link>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="touch-target">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Môj účet</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/ucet">Môj účet</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/ucet/objednavky">Moje objednávky</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Odhlásiť sa
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/prihlasenie">Prihlásiť sa</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/registracia">Registrovať sa</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative touch-target">
              <Link to="/kosik">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </Badge>
                )}
                <span className="sr-only">Košík</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile search expanded */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Hľadať produkty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-11 rounded-full"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>

      {/* Desktop categories nav */}
      <nav className="hidden md:block border-t bg-background">
        <div className="section-container">
          <ul className="flex items-center gap-1 py-2 overflow-x-auto hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/kategoria/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
