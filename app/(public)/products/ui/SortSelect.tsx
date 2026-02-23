'use client'

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
import { useRouter, useSearchParams } from 'next/navigation'

export const SortSelect = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const currentSort = searchParams.get('sort')

	const onChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString())

		if (value === 'popular') params.delete('sort')
		else params.set('sort', value)

		router.push(`?${params.toString()}`)
	}

	return (
		<Select value={currentSort || 'popular'} onValueChange={onChange}>
			<SelectTrigger className='w-full max-w-56'>
				<ArrowDownUpIcon />
				<SelectValue placeholder='Сортировка' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Сортировка</SelectLabel>
					<SelectItem value='popular'>Популярные</SelectItem>
					<SelectItem value='price-asc'>По цене ↑</SelectItem>
					<SelectItem value='price-desc'>По цене ↓</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
