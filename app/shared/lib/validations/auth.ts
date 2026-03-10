import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email('Введите корректный email').min(1, 'Email обязателен'),
	password: z
		.string()
		.min(1, 'Пароль обязателен')
		.min(8, 'Пароль должен быть не менее 8 символов'),
})

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, 'Имя обязательно')
			.min(2, 'Имя должно быть не менее 2 символов'),
		email: z.email('Введите корректный email').min(1, 'Email обязателен'),
		password: z
			.string()
			.min(1, 'Пароль обязателен')
			.min(8, 'Пароль должен быть не менее 8 символов'),
		confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
