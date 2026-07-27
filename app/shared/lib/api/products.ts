import { SortOption } from '@/shared/types'
import prisma from '../prisma'

interface GetProductsParams {
	category?: string
	sort?: SortOption
	search?: string
}

function buildOrderBy(sort?: SortOption) {
	if (sort === 'price-asc')
		return [{ price: 'asc' as const }, { id: 'asc' as const }]
	if (sort === 'price-desc')
		return [{ price: 'desc' as const }, { id: 'asc' as const }]
	return [{ id: 'asc' as const }]
}

export async function getProducts({
	category,
	search,
	sort,
}: GetProductsParams) {
	const products = await prisma.product.findMany({
		where: {
			category: category && category !== 'all' ? { slug: category } : undefined,
			name: search ? { contains: search, mode: 'insensitive' } : undefined,
		},
		include: { category: true },
		orderBy: buildOrderBy(sort),
	})

	return products.map(p => ({ ...p, price: Number(p.price) }))
}

export async function getProductById(id: number) {
	const product = await prisma.product.findUnique({
		where: { id },
		include: { category: true },
	})

	if (!product) return null

	return {
		...product,
		price: Number(product.price),
	}
}

export async function getSimilarProducts({
	categoryId,
	productId,
}: {
	categoryId: number
	productId: number
}) {
	const similarProducts = await prisma.product.findMany({
		where: {
			categoryId: categoryId,
			NOT: { id: productId },
			stock: { gt: 0 },
		},
		include: { category: true },
		orderBy: { id: 'asc' },
		take: 8,
	})

	return similarProducts.map(p => ({
		...p,
		price: Number(p.price),
	}))
}
