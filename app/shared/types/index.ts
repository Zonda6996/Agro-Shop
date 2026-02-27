export type {
	Product,
	Category,
	Order,
	OrderItem,
	User,
} from '../../../generated/prisma/client'

export { PrismaClient } from '../../../generated/prisma/client'

export interface SerializedProduct {
	id: number
	name: string
	price: number
	stock: number
	image?: string | null
	categoryId: number
	description?: string | null
	isFeatured: boolean
	category: {
		id: number
		name: string
		slug: string
	}
}

export type SortOption = 'price-asc' | 'price-desc' | 'popular'