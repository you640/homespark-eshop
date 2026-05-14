import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Copy, ExternalLink, ArrowLeft, LinkIcon, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

const SITE_URL = "https://abode-forge-store.lovable.app";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price_from: number;
  product_images?: { url: string; alt_text: string | null }[];
}

interface PaymentLink {
  id: string;
  url: string;
  label: string | null;
  amount: number;
  currency: string;
}

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data: p } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      setProduct(p as Product | null);

      if (p) {
        const { data: l } = await supabase
          .from("product_payment_links")
          .select("id, url, label, amount, currency")
          .eq("product_id", (p as Product).id)
          .eq("is_active", true)
          .order("created_at", { ascending: false });
        setLinks(l ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  const copy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("URL skopírované");
  };

  const copyAll = async () => {
    if (!product || links.length === 0) return;
    const text = links
      .map((l) => `${l.label ?? product.name} – ${formatPrice(l.amount)}\n${l.url}`)
      .join("\n\n");
    await navigator.clipboard.writeText(text);
    toast.success(`Skopírovaných ${links.length} odkazov`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-container py-24 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="section-container py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Produkt nenájdený</h1>
          <Button asChild><Link to="/">Späť na domov</Link></Button>
        </div>
      </Layout>
    );
  }

  const image = product.product_images?.[0];
  const canonical = `${SITE_URL}/produkt/${product.slug}`;
  const desc = product.short_description ?? `${product.name} – kúpte v MerkuryMarket.`;

  return (
    <Layout>
      <Helmet>
        <title>{`${product.name} – MerkuryMarket`}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="product" />
        {image && <meta property="og:image" content={image.url} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: desc,
          ...(image ? { image: image.url } : {}),
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: product.price_from,
            availability: "https://schema.org/InStock",
            url: canonical,
          },
        })}</script>
      </Helmet>

      <div className="section-container py-6 md:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Späť
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
            {image ? (
              <img
                src={image.url}
                alt={image.alt_text ?? product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Bez obrázka
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-display font-bold mb-3">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mb-6">
              od {formatPrice(product.price_from)}
            </p>
            {product.short_description && (
              <p className="text-muted-foreground mb-4">{product.short_description}</p>
            )}
            {product.description && (
              <div className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-line">
                {product.description}
              </div>
            )}
          </div>
        </div>

        {/* Payment Links section */}
        <section className="bg-card border rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              <h2 className="text-lg md:text-xl font-display font-bold">Platobné odkazy</h2>
            </div>
            {links.length > 1 && (
              <Button size="sm" variant="outline" onClick={copyAll}>
                <CopyCheck className="h-4 w-4 mr-2" />
                Kopírovať všetko ({links.length})
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Priame Stripe Payment Links pre tento produkt – skopíruj a pošli zákazníkovi, alebo
            otvor a zaplať.
          </p>

          {links.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Pre tento produkt zatiaľ nie sú vytvorené žiadne Payment Linky.
              <div className="mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin">Vytvoriť v admin paneli</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="space-y-2">
              {links.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{l.label ?? product.name}</p>
                    <p className="text-xs text-muted-foreground truncate font-mono">{l.url}</p>
                  </div>
                  <span className="shrink-0 font-semibold text-sm">{formatPrice(l.amount)}</span>
                  <Button size="sm" variant="outline" onClick={() => copy(l.url)}>
                    <Copy className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Kopírovať</span>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={l.url} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4 md:mr-1" />
                      <span className="hidden md:inline">Otvoriť</span>
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
}
