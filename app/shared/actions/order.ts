'use server'

import { z } from 'zod'
import { CheckoutData, checkoutSchema } from '@/shared/lib/validations/order'
import { CartItemProps } from '../store/cartStore'
import { auth } from '../lib/auth'
import prisma from '../lib/prisma'
import { getFinalPrice } from '../lib/pricing'

const orderItemsSchema = z
	.array(
		z.object({
			id: z.number().int().positive(),
			quantity: z.number().int().min(1).max(999),
		}),
	)
	.min(1)

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

	const parsedItems = orderItemsSchema.safeParse(items)
	if (!parsedItems.success) {
		return { error: 'Корзина повреждена, обновите страницу' }
	}

	const quantityById = new Map<number, number>()
	for (const item of parsedItems.data) {
		quantityById.set(item.id, (quantityById.get(item.id) ?? 0) + item.quantity)
	}

	const productIds = [...quantityById.keys()]
	const products = await prisma.product.findMany({
		where: { id: { in: productIds } },
	})

	if (products.length !== productIds.length) {
		return { error: 'Некоторые товары больше недоступны' }
	}

	const orderItems = products.map(p => ({
		productId: p.id,
		quantity: quantityById.get(p.id) ?? 0,
		price: getFinalPrice(Number(p.price), p.isFeatured),
	}))

	const total = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

	try {
		const order = await prisma.$transaction(async tx => {
			for (const item of orderItems) {
				const updated = await tx.product.updateMany({
					where: { id: item.productId, stock: { gte: item.quantity } },
					data: { stock: { decrement: item.quantity } },
				})

				if (updated.count === 0) {
					const product = products.find(p => p.id === item.productId)
					throw new Error(
						`Товар "${product?.name}" недоступен в таком количестве`,
					)
				}
			}

			return tx.order.create({
				data: {
					userId: Number(session.user.id),
					total,
					name: parsed.data.name,
					phone: parsed.data.phone,
					address: parsed.data.address,
					paymentMethod: parsed.data.paymentMethod,
					deliveryMethod: parsed.data.deliveryMethod,
					items: { create: orderItems },
				},
			})
		})

		return { success: true, orderId: order.id }
	} catch (error) {
		return {
			error:
				error instanceof Error ? error.message : 'Не удалось создать заказ',
		}
	}
}
