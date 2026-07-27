import { ProductCard } from '@/shared/ui/productCard'
import type { SerializedProduct } from '@/shared/types'

interface SimilarProductsProps {
	products: SerializedProduct[]
	favoriteIds: number[]
}

export const SimilarProducts = ({
	products,
	favoriteIds,
}: SimilarProductsProps) => {
	if (products.length === 0) return null

	return (
		<section className='mt-16 mb-16'>
			<h2 className='text-2xl lg:text-3xl font-bold mb-6'>Похожие товары</h2>

			<div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8'>
				{products.map(p => (
					<ProductCard
						key={p.id}
						{...p}
						isFavorite={favoriteIds.includes(p.id)}
					/>
				))}
			</div>
		</section>
	)
}
