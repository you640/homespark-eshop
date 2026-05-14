import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, Copy, ExternalLink, Trash2, Plus, ShieldAlert, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price_from: number;
}

interface PaymentLink {
  id: string;
  product_id: string;
  url: string;
  label: string | null;
  amount: number;
  currency: string;
  created_at: string;
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFor, setOpenFor] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ amount: "", label: "", description: "" });

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      const [{ data: prods }, { data: lnks }] = await Promise.all([
        supabase
          .from("products")
          .select("id, name, slug, price_from")
          .eq("is_active", true)
          .order("name"),
        supabase
          .from("product_payment_links")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);
      setProducts(prods ?? []);
      setLinks(lnks ?? []);
      setLoading(false);
    })();
  }, [isAdmin]);

  if (authLoading || roleLoading) {
    return (
      <Layout>
        <div className="section-container py-24 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/prihlasenie" replace />;

  if (!isAdmin) {
    return (
      <Layout>
        <div className="section-container py-16 max-w-xl mx-auto text-center">
          <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-display font-bold mb-3">Prístup zamietnutý</h1>
          <p className="text-muted-foreground mb-6">
            Tento dashboard je dostupný len pre administrátorov. Tvoj účet ({user.email}) nemá rolu
            <code className="px-1 mx-1 rounded bg-muted">admin</code>.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Požiadaj vlastníka projektu, aby ti rolu pridelil.
          </p>
          <Button asChild><Link to="/">Späť na domov</Link></Button>
        </div>
      </Layout>
    );
  }

  const openDialog = (p: Product) => {
    setOpenFor(p);
    setForm({ amount: String(p.price_from ?? ""), label: p.name, description: "" });
  };

  const handleCreate = async () => {
    if (!openFor) return;
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) {
      toast.error("Zadaj platnú cenu");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-create-payment-link", {
        body: {
          product_id: openFor.id,
          name: openFor.name,
          amount,
          label: form.label || openFor.name,
          description: form.description || undefined,
        },
      });
      if (error) throw error;
      if (data?.link) {
        setLinks((prev) => [data.link, ...prev]);
        toast.success("Payment Link vytvorený");
        setOpenFor(null);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chyba");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Naozaj zmazať tento Payment Link?")) return;
    try {
      const { error } = await supabase.functions.invoke("admin-delete-payment-link", {
        body: { id },
      });
      if (error) throw error;
      setLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success("Zmazané");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chyba");
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("URL skopírované");
  };

  const formatLinks = (productName: string, list: PaymentLink[]) =>
    list
      .map((l) => `${l.label ?? productName} – ${formatPrice(l.amount)}\n${l.url}`)
      .join("\n\n");

  const copyProductLinks = async (productName: string, list: PaymentLink[]) => {
    if (list.length === 0) return;
    await navigator.clipboard.writeText(formatLinks(productName, list));
    toast.success(`Skopírovaných ${list.length} odkazov`);
  };

  const copyAllLinks = async () => {
    if (links.length === 0) {
      toast.error("Žiadne payment linky");
      return;
    }
    const productMap = new Map(products.map((p) => [p.id, p.name]));
    const grouped = Object.entries(linksByProduct)
      .map(([pid, list]) => {
        const name = productMap.get(pid) ?? "Produkt";
        return `=== ${name} ===\n${formatLinks(name, list)}`;
      })
      .join("\n\n");
    await navigator.clipboard.writeText(grouped);
    toast.success(`Skopírovaných ${links.length} odkazov`);
  };

  const linksByProduct = links.reduce<Record<string, PaymentLink[]>>((acc, l) => {
    (acc[l.product_id] ??= []).push(l);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="section-container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Admin – Payment Links</h1>
          <p className="text-muted-foreground text-sm">
            Vytvor Stripe Payment Link ku každému produktu. Linky sa vytvárajú priamo v tvojom
            Stripe účte a dajú sa zdielať kdekoľvek.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => {
              const productLinks = linksByProduct[p.id] ?? [];
              return (
                <div key={p.id} className="bg-card border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Od {formatPrice(p.price_from)} · {productLinks.length} payment link
                        {productLinks.length === 1 ? "" : "ov"}
                      </p>
                    </div>
                    <Button size="sm" onClick={() => openDialog(p)}>
                      <Plus className="h-4 w-4 mr-1" /> Nový Payment Link
                    </Button>
                  </div>

                  {productLinks.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {productLinks.map((l) => (
                        <div
                          key={l.id}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">{l.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{l.url}</p>
                          </div>
                          <span className="shrink-0 font-mono text-xs">{formatPrice(l.amount)}</span>
                          <Button size="icon" variant="ghost" onClick={() => copyUrl(l.url)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" asChild>
                            <a href={l.url} target="_blank" rel="noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(l.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {products.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Žiadne produkty.</p>
            )}
          </div>
        )}
      </div>

      <Dialog open={!!openFor} onOpenChange={(o) => !o && setOpenFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nový Payment Link – {openFor?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="amount">Cena (EUR) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="label">Popisok (interný)</Label>
              <Input
                id="label"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Popis pre zákazníka</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="(voliteľné)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFor(null)} disabled={submitting}>
              Zrušiť
            </Button>
            <Button onClick={handleCreate} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Vytvoriť
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
