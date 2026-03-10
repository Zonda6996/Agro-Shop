'use server'
import { CheckoutData, checkoutSchema } from '@/shared/lib/validations/order'
import { CartItemProps } from '../store/cartStore'
import { auth } from '../lib/auth'
import prisma from '../lib/prisma'

export async function createOrderAction(
	data: CheckoutData,
	items: CartItemProps[],
) {
	const session = await auth()

	if (!session?.user?.id) {
		return { error: 'Необходимо войти в аккаунт' }
	}

	const parsed = checkoutSchema.safeParse(data)

	if (!parsed.success) {
		return { error: 'Неверные данные' }
	}

	if (!items.length) {
		return { error: 'Корзина пуста' }
	}

	const productIds = items.map(i => i.id)
	const products = await prisma.product.findMany({
		where: { id: { in: productIds } },
	})

	const total = items.reduce((acc, item) => {
		const product = products.find(p => p.id === item.id)
		if (!product) return acc
		return acc + Number(product.price) * item.quantity
	}, 0)

	const order = await prisma.order.create({
		data: {
			userId: Number(session.user.id),
			total,
			name: parsed.data.name,
			phone: parsed.data.phone,
			address: parsed.data.address,
			paymentMethod: parsed.data.paymentMethod,
			deliveryMethod: parsed.data.deliveryMethod,
			items: {
				create: items.map(item => {
					const product = products.find(p => p.id === item.id)
					return {
						productId: item.id,
						quantity: item.quantity,
						price: Number(product!.price),
					}
				}),
			},
		},
	})

	return { success: true, orderId: order.id }
}
