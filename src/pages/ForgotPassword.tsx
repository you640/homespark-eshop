import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await resetPassword(email.trim());
      if (error) {
        toast.error('Nepodarilo sa odoslať e-mail', { description: error.message });
      } else {
        toast.success('E-mail na obnovu hesla bol odoslaný');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout hideFooter hideMobileCart>
      <SEO title="Obnova hesla" noIndex />
      <div className="section-container flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-xl border bg-card p-6">
          <Mail className="h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-display font-bold">Obnova hesla</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Zadajte e-mail a pošleme vám odkaz na nastavenie nového hesla.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">E-mail</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              Odoslať odkaz
            </Button>
          </form>
          <Button variant="link" className="mt-4 px-0" asChild>
            <Link to="/prihlasenie">Späť na prihlásenie</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
