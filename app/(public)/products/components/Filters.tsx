import { CategorySelect } from '../ui/CategorySelect'
import { SortSelect } from '../ui/SortSelect'

export const Filters = () => {
	return (
		<div className='flex gap-4'>
			<CategorySelect  />
			<SortSelect  />
		</div>
	)
}
