import { Container } from '@/widgets/container/container'
import { Filters } from './components/Filters'
import { SortOption } from '@/api/products/types'
import { ProductList } from './components/ProductList'
import { Search } from './components/Search'

interface ProductsPageProps {
	searchParams: Promise<{
		category?: string
		sort?: SortOption
		query?: string
	}>
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
	const { category, sort, query } = await searchParams
	return (
		<div>
			<Container>
				<div className='grid md:grid-cols-3 grid-cols-1 gap-4 items-center'>
					<Filters />
					<Search />
				</div>
				<ProductList category={category} sort={sort} search={query} />
			</Container>
		</div>
	)
}

export default ProductsPage
