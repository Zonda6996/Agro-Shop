import { Container } from '@/widgets/container/container'
import { Filters } from './components/Filters'
import { SortOption } from '@/api/products/types'
import { ProductList } from './components/ProductList'
import { Search } from './components/Search'
import { Suspense } from 'react'
import { SkeletonProduct } from './ui/SkeletonProduct'

interface ProductsPageProps {
	searchParams: Promise<{
		category?: string
		sort?: SortOption
		query?: string
	}>
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
	const { category, sort, query } = await searchParams
	const queryString = `${category}-${sort}-${query}`

	return (
		<div>
			<Container>
				<div className='grid md:grid-cols-3 grid-cols-1 gap-4 items-center'>
					<Filters />
					<Search />
				</div>
				<Suspense
					key={queryString}
					fallback={
						<div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6'>
							{Array.from({ length: 10 }).map((_, index) => (
								<SkeletonProduct key={index} />
							))}
						</div>
					}
				>
					<ProductList category={category} sort={sort} search={query} />
				</Suspense>
			</Container>
		</div>
	)
}

export default ProductsPage
