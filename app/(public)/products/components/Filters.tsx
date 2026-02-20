import { SortOption } from '@/api/products/types'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import { ArrowDownUpIcon } from 'lucide-react'
import { CategorySelect } from '../ui/CategorySelect'
import { SortSelect } from '../ui/SortSelect'

export const Filters = ({
	category,
	onSortChange,
}: {
	onSortChange: (value: SortOption) => void
	category: string | null
}) => {
	return (
		<div className='flex gap-4'>
			<CategorySelect category={category} />
			<SortSelect onSortChange={onSortChange} />
		</div>
	)
}
