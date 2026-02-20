'use client'

import { SortOption } from '@/api/products/types'
import { useMemo, useState } from 'react'
import { products } from '../lib/mock/products'
import { useSearchParams } from 'next/navigation'

export const useProductsFilter = () => {
	const searchParams = useSearchParams()
	const category = searchParams.get('category')
	const [sort, setSort] = useState<SortOption>('price-asc')

	const filteredProducts = useMemo(() => {
		return [...products]
			.filter(p => !category || p.category === category)
			.sort((a, b) => {
				if (sort === 'price-asc') return a.price - b.price
				if (sort === 'price-desc') return b.price - a.price
				return 0
			})
	}, [category, sort])

	return {
		filteredProducts,
		category,
		sort,
		setSort,
	}
}
