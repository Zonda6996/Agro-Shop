import { SortOption } from '@/shared/types'
import { ProductCard } from './ProductCard'
import { getProducts } from '@/shared/lib/api/products'

interface ProductListProps {
	category?: string
	sort?: SortOption
	search?: string
}

export const ProductList = async ({
	category,
	sort,
	search,
}: ProductListProps) => {
	await new Promise(resolve => setTimeout(resolve, 1000))

	const products = await getProducts({ category, search, sort })

	if (products.length === 0) {
		return (
			<div className='mt-10 col-span-full text-center text-lg text-muted-foreground'>
				Нет товаров, соответствующих вашим критериям. Попробуйте изменить
				фильтры или поиск.
			</div>
		)
	}

	return (
		<div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6'>
			{products.map(p => (
				<ProductCard key={p.id} {...p} />
			))}
		</div>
	)
}
