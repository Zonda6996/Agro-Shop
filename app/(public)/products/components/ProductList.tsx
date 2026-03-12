import { SortOption } from '@/shared/types'
import { ProductCard } from './ProductCard'
import { getProducts } from '@/shared/lib/api/products'
import { auth } from '@/shared/lib/auth'
import { getFavoriteIds } from '@/shared/lib/api/favorites'

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
	const [products, session] = await Promise.all([
		getProducts({ category, search, sort }),
		auth(),
	])

	const favoriteIds = session?.user?.id
		? await getFavoriteIds(Number(session.user.id))
		: []

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
				<ProductCard
					key={p.id}
					{...p}
					isFavorite={favoriteIds.includes(p.id)}
				/>
			))}
		</div>
	)
}
