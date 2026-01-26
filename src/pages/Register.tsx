import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const registerSchema = z.object({
  name: z.string().min(2, 'Meno musí mať aspoň 2 znaky'),
  email: z.string().email('Zadajte platný e-mail'),
  password: z.string().min(6, 'Heslo musí mať aspoň 6 znakov'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'Musíte súhlasiť s podmienkami'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Heslá sa nezhodujú',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false,
    },
  });

  const termsValue = watch('terms');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.name);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Tento e-mail je už registrovaný', {
            description: 'Skúste sa prihlásiť alebo použite iný e-mail.',
          });
        } else {
          toast.error('Registrácia zlyhala', { description: error.message });
        }
      } else {
        toast.success('Registrácia úspešná!', {
          description: 'Teraz sa môžete prihlásiť.',
        });
        navigate('/prihlasenie');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideFooter hideMobileCart>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold">Registrácia</h1>
            <p className="text-muted-foreground mt-2">
              Vytvorte si účet a nakupujte pohodlnejšie.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Meno a priezvisko</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ján Novák"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.sk"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Heslo</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Potvrďte heslo</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsValue}
                  onCheckedChange={(checked) => setValue('terms', checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    Súhlasím s{' '}
                    <Link to="/podmienky" className="text-primary hover:underline">
                      obchodnými podmienkami
                    </Link>{' '}
                    a{' '}
                    <Link to="/sukromie" className="text-primary hover:underline">
                      ochranou súkromia
                    </Link>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-destructive">{errors.terms.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registrujem...
                  </>
                ) : (
                  'Vytvoriť účet'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Už máte účet? </span>
              <Link to="/prihlasenie" className="text-primary font-medium hover:underline">
                Prihláste sa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
