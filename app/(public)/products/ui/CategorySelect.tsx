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
import { ChartBarDecreasingIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategorySelectProps {
	categories: { id: number; name: string; slug: string }[]
}

export const CategorySelect = ({ categories }: CategorySelectProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const currentCategory = searchParams.get('category')

	const onChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString())

		if (value === 'all') params.delete('category')
		else params.set('category', value)

		router.push(`?${params.toString()}`)
	}

	return (
		<Select value={currentCategory || 'all'} onValueChange={onChange}>
			<SelectTrigger className='w-full max-w-56'>
				<ChartBarDecreasingIcon />
				<SelectValue placeholder='Категория' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Категория</SelectLabel>
					<SelectItem value='all'>Все</SelectItem>
					{categories.map(cat => (
						<SelectItem key={cat.id} value={cat.slug}>
							{cat.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
