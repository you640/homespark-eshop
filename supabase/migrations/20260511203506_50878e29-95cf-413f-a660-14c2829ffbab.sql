
CREATE TABLE public.product_payment_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  variant_id UUID,
  stripe_product_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  stripe_payment_link_id TEXT NOT NULL,
  url TEXT NOT NULL,
  label TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.product_payment_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view payment links"
ON public.product_payment_links FOR SELECT USING (true);

CREATE POLICY "Admins can manage payment links"
ON public.product_payment_links FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_product_payment_links_updated_at
BEFORE UPDATE ON public.product_payment_links
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_ppl_product_id ON public.product_payment_links(product_id);
