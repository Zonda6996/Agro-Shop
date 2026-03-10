import { z } from 'zod'

export const checkoutSchema = z
	.object({
		name: z
			.string()
			.min(2, 'Имя должно быть не менее 2 символов')
			.max(50, 'Имя должно быть не более 50 символов'),
		phone: z
			.string()
			.min(10, 'Введите корректный номер телефона')
			.max(15, 'Введите корректный номер телефона')
			.regex(/^\+?[0-9\s\-()]+$/, 'Введите корректный номер телефона'),
		deliveryMethod: z.enum(['PICKUP', 'DELIVERY']),
		address: z.string().optional(),
		paymentMethod: z.enum(['CASH', 'KASPI', 'INVOICE']),
	})
	.refine(
		data => {
			if (data.deliveryMethod === 'DELIVERY' && !data.address) {
				return false
			}
			return true
		},
		{
			message: 'Укажите адрес доставки',
			path: ['address'],
		},
	)

export type CheckoutData = z.infer<typeof checkoutSchema>
