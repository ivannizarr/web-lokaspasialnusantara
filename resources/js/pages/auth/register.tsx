'use client'

import { Head, useForm } from '@inertiajs/react'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { FormEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/layouts/auth-layout'

type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const { t } = useTranslation()
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <AuthLayout title="Loka Spasial" description={t('register.description')}>
      <Head title={t('register.title')} />

      <form className="flex flex-col gap-3" onSubmit={submit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t('register.name')}</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder={t('register.namePlaceholder')}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t('register.email')}</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder={t('register.emailPlaceholder')}
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{t('register.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                tabIndex={3}
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                disabled={processing}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white active:text-white transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">{t('register.confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                required
                tabIndex={4}
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                disabled={processing}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white active:text-white transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPasswordConfirmation ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="font-semibold mt-2 w-full cursor-pointer" tabIndex={5} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {t('register.submit')}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {t('register.alreadyAccount')}{' '}
          <TextLink href={route('login')} tabIndex={6}>
            {t('register.login')}
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  )
}
