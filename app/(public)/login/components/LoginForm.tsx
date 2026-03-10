'use client'

import { cn } from '@/shared/lib/utils'
import { LoginData, loginSchema } from '@/shared/lib/validations/auth'
import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { ROUTES } from '@/shared/lib/routes'
import Link from 'next/link'
import { GoogleIcon } from '@/shared/assets/icons/Icon'
import { Spinner } from '@/shared/ui/spinner'

export const LoginForm = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	const router = useRouter()
	const [serverError, setServerError] = useState<string | null>(null)
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginData) => {
		setServerError(null)

		const result = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		})

		if (result?.error) {
			setServerError('Неверный email или пароль')
			return
		}

		router.push(ROUTES.HOME)
		router.refresh()
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='w-full max-w-md mx-auto border-0'>
				<CardHeader>
					<CardTitle>Войдите в свой аккаунт</CardTitle>
					<CardDescription>Введите данные для входа в аккаунт</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor='email'>Email</FieldLabel>
								<Input
									{...register('email')}
									id='email'
									type='email'
									placeholder='m@example.com'
									required
								/>
								{errors.email && (
									<p className='text-red-500 text-sm'>{errors.email.message}</p>
								)}
							</Field>
							<Field>
								<div className='flex items-center'>
									<FieldLabel htmlFor='password'>Пароль</FieldLabel>
									<a
										href='#'
										className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
									>
										Забыли пароль?
									</a>
								</div>
								<Input
									{...register('password')}
									id='password'
									type='password'
									placeholder='••••••••'
									required
								/>
								{errors.password && (
									<p className='text-red-500 text-sm'>
										{errors.password.message}
									</p>
								)}
							</Field>
							{serverError && (
								<p className='text-red-500 text-sm text-center'>
									{serverError}
								</p>
							)}
							<Field>
								<Button type='submit' disabled={isSubmitting}>
									Войти
									{isSubmitting && <Spinner />}
								</Button>
								<Button
									variant='outline'
									type='button'
									disabled={isGoogleLoading}
									onClick={async () => {
										setIsGoogleLoading(true)
										await signIn('google', { callbackUrl: ROUTES.HOME })
									}}
								>
									<GoogleIcon className='w-5! h-5!' />
									Войти с помощью Google
									{isGoogleLoading && <Spinner />}
								</Button>
								<FieldDescription className='text-center'>
									Нет аккаунта?
									<Link href={ROUTES.REGISTER} className='text-foreground'>
										Зарегистрироваться
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
