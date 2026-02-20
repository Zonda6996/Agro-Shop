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

export const SortSelect = ({
	onSortChange,
}: {
	onSortChange: (value: SortOption) => void
}) => {
	return (
		<Select onValueChange={onSortChange}>
			<SelectTrigger className='w-full max-w-56'>
				<ArrowDownUpIcon />
				<SelectValue placeholder='Сортировка' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Сортировка</SelectLabel>
					<SelectItem value='price-asc'>По цене ↑</SelectItem>
					<SelectItem value='price-desc'>По цене ↓</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
