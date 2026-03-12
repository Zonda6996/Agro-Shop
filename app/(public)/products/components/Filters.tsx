import { getCategories } from '@/shared/lib/api/categories'
import { CategorySelect } from '../ui/CategorySelect'
import { SortSelect } from '../ui/SortSelect'

export const Filters = async () => {
	const categories = await getCategories()

	return (
		<div className='flex gap-4'>
			<CategorySelect categories={categories} />
			<SortSelect />
		</div>
	)
}
