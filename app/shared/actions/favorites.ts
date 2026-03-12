'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '../lib/auth'
import prisma from '../lib/prisma'
import { ROUTES } from '../lib/routes'

export async function toggleFavoriteAction(productId: number) {
	const session = await auth()
	if (!session?.user?.id) return { error: 'Необходимо войти в аккаунт' }

	const userId = Number(session.user.id)

	const existing = await prisma.favorite.findUnique({
		where: { userId_productId: { userId, productId } },
	})

	if (existing) {
		await prisma.favorite.delete({
			where: { userId_productId: { userId, productId } },
		})
	} else {
		await prisma.favorite.create({
			data: { userId, productId },
		})
	}

	revalidatePath(ROUTES.PRODUCTS)
	revalidatePath(ROUTES.PRODUCT(productId))
	revalidatePath(ROUTES.ACCOUNT_FAVORITES)

	return { success: true }
}
