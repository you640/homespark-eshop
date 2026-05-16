import { Link } from 'react-router-dom';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Home, Lightbulb, Armchair, Sparkles } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

// Map categories to proper icons and gradient backgrounds
const CATEGORY_CONFIG: Record<string, { icon: typeof Home; gradient: string; emoji: string }> = {
  'smart home': {
    icon: Home,
    gradient: 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20',
    emoji: '🏠',
  },
  'osvetlenie': {
    icon: Lightbulb,
    gradient: 'from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20',
    emoji: '💡',
  },
  'bytové doplnky': {
    icon: Armchair,
    gradient: 'from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20',
    emoji: '🛋️',
  },
};

const DEFAULT_CONFIG = {
  icon: Sparkles,
  gradient: 'from-primary/10 to-amber-500/10 hover:from-primary/20 hover:to-amber-500/20',
  emoji: '✨',
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const config = CATEGORY_CONFIG[category.slug] || DEFAULT_CONFIG;
  const IconComponent = config.icon;

  return (
    <Link 
      to={`/kategoria/${category.slug}`}
      className={cn(
        'category-card group flex flex-col items-center justify-center p-8 text-center',
        `bg-gradient-to-br ${config.gradient}`,
        className
      )}
    >
      <div className="mb-5 p-4 rounded-2xl bg-white/60 dark:bg-white/10 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
        <IconComponent className="h-8 w-8 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground">{category.name}</h3>
      {category.description && (
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  );
}

// Compact horizontal variant
export function CategoryChip({ category, className }: CategoryCardProps) {
  const config = CATEGORY_CONFIG[category.slug] || DEFAULT_CONFIG;

  return (
    <Link 
      to={`/kategoria/${category.slug}`}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors',
        className
      )}
    >
      <span>{config.emoji}</span>
      <span className="font-medium text-sm">{category.name}</span>
    </Link>
  );
}
