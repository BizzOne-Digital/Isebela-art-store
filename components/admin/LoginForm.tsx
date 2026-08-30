'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import Button from './ui/Button';

export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations('admin.login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t('error'));
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-admin-body">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-admin-ink outline-none transition focus:border-admin-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-admin-body">
          {t('password')}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-admin-ink outline-none transition focus:border-admin-primary"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-admin-danger/25 bg-admin-danger-soft px-3 py-2 text-sm text-admin-danger">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
