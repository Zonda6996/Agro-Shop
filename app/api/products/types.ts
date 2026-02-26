export interface ProductCardProps {
	id: number
	name: string
	price: number
	category: string
	stock: number
}

export type SortOption = 'price-asc' | 'price-desc' | 'popular'
