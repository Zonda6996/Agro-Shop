import { z } from 'zod'

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Введите текущий пароль'),
		newPassword: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
		confirmPassword: z.string(),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})
	.refine(data => data.newPassword !== data.currentPassword, {
		message: 'Новый пароль должен отличаться от текущего',
		path: ['newPassword'],
	})

export type ChangePasswordData = z.infer<typeof changePasswordSchema>
