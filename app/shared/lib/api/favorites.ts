import prisma from '../prisma'

export async function getFavoritesByUserId(userId: number) {
	return prisma.favorite.findMany({
		where: { userId },
		include: { product: true },
		orderBy: { createdAt: 'desc' },
	})
}

export async function getFavoriteIds(userId: number) {
	const favorites = await prisma.favorite.findMany({
		where: { userId },
		select: { productId: true },
	})

	return favorites.map(f => f.productId)
}
