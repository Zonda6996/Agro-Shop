'use client'

import { Container } from '@/widgets/container/container'
import { ProductCard } from './components/ProductCard'
import { Filters } from './components/Filters'
import { useProductsFilter } from '@/shared/hooks/useProductsFilter'

const ProductsPage = () => {
	const { filteredProducts, setSort, category } = useProductsFilter()

	return (
		<div>
			<Container>
				<Filters onSortChange={setSort} category={category} />
				<div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6'>
					{filteredProducts.length === 0 ? (
						<div className='col-span-full text-center text-lg text-muted-foreground'>
							Нет товаров, соответствующих выбранным фильтрам.
						</div>
					) : null}

					{filteredProducts.map(product => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</Container>
		</div>
	)
}

export default ProductsPage
