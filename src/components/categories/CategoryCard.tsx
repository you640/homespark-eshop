import { Link } from 'react-router-dom';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, string> = {
  'nabytok': '🪑',
  'dlazba-podlahy': '🏠',
  'kupelne': '🚿',
  'dvere': '🚪',
  'kurenie': '🔥',
  'zahrada': '🌿',
  'naradie': '🔧',
  'default': '📦',
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const icon = CATEGORY_ICONS[category.slug] || CATEGORY_ICONS.default;

  return (
    <Link 
      to={`/kategoria/${category.slug}`}
      className={cn('category-card flex flex-col items-center justify-center p-6 text-center', className)}
    >
      {category.image_url ? (
        <div className="relative w-20 h-20 mb-4 rounded-xl overflow-hidden">
          <img 
            src={category.image_url} 
            alt={category.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <span className="text-5xl mb-4">{icon}</span>
      )}
      <h3 className="font-semibold text-foreground">{category.name}</h3>
      {category.description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  );
}

// Compact horizontal variant
export function CategoryChip({ category, className }: CategoryCardProps) {
  const icon = CATEGORY_ICONS[category.slug] || CATEGORY_ICONS.default;

  return (
    <Link 
      to={`/kategoria/${category.slug}`}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors',
        className
      )}
    >
      <span>{icon}</span>
      <span className="font-medium text-sm">{category.name}</span>
    </Link>
  );
}
