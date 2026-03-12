'use client'

import { registerAction } from '@/shared/actions/auth'
import { RegisterData, registerSchema } from '@/shared/lib/validations/auth'
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
import { ROUTES } from '@/shared/lib/routes'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { GoogleIcon } from '@/shared/assets/icons/Icon'
import { Spinner } from '@/shared/ui/spinner'

export const RegisterForm = ({
	...props
}: React.ComponentProps<typeof Card>) => {
	const router = useRouter()
	const [serverError, setServerError] = useState<string | null>(null)
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterData>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (data: RegisterData) => {
		setServerError(null)

		const result = await registerAction(data)

		if (result?.error) {
			setServerError(result.error)
			return
		}

		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		})

		router.push(ROUTES.HOME)
		router.refresh()
	}

	return (
		<Card className='w-full max-w-md mx-auto border-0 mb-5' {...props}>
			<CardHeader>
				<CardTitle>Создайте аккаунт</CardTitle>
				<CardDescription>
					Введите свои данные ниже, чтобы создать аккаунт
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='name'>Имя</FieldLabel>
							<Input
								{...register('name')}
								id='name'
								type='text'
								placeholder='Иван'
								required
							/>
						</Field>
						{errors.name && (
							<p className='text-red-500 text-sm'>{errors.name.message}</p>
						)}
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input
								{...register('email')}
								id='email'
								type='email'
								placeholder='m@example.com'
								required
							/>
							<FieldDescription>
								Мы будем использовать это для связи с вами. Мы не будем делиться
								вашим email ни с кем другим.
							</FieldDescription>
						</Field>
						{errors.email && (
							<p className='text-red-500 text-sm'>{errors.email.message}</p>
						)}
						<Field>
							<FieldLabel htmlFor='password'>Пароль</FieldLabel>
							<Input
								{...register('password')}
								id='password'
								type='password'
								required
							/>
							<FieldDescription>
								Должен содержать как минимум 8 символов.
							</FieldDescription>
						</Field>
						{errors.password && (
							<p className='text-red-500 text-sm'>{errors.password.message}</p>
						)}
						<Field>
							<FieldLabel htmlFor='confirm-password'>
								Подтвердить пароль
							</FieldLabel>
							<Input
								{...register('confirmPassword')}
								id='confirm-password'
								type='password'
								required
							/>
							<FieldDescription>
								Пожалуйста, подтвердите ваш пароль.
							</FieldDescription>
						</Field>
						{errors.confirmPassword && (
							<p className='text-red-500 text-sm'>
								{errors.confirmPassword.message}
							</p>
						)}

						{serverError && (
							<p className='text-red-500 text-sm text-center'>{serverError}</p>
						)}
						<FieldGroup>
							<Field>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting && <Spinner/>}
									Создать аккаунт
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
									Зарегистрироваться с помощью Google
									{isGoogleLoading && <Spinner />}
								</Button>
								<FieldDescription className='px-6 text-center'>
									Уже есть аккаунт?{' '}
									<Link href={ROUTES.LOGIN} className='text-foreground'>
										Войти
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	)
}
