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

export const CategorySelect = () => {
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
					<SelectItem value='seeds'>Семена</SelectItem>
					<SelectItem value='equipment'>Оборудование</SelectItem>
					<SelectItem value='fertilizers'>Удобрения</SelectItem>
					<SelectItem value='plant-protection'>Защита растений</SelectItem>
					<SelectItem value='irrigation'>Полив и орошение</SelectItem>
					<SelectItem value='garden-tools'>Садовые инструменты</SelectItem>
					<SelectItem value='greenhouse-materials'>
						Теплицы и укрвные материалы
					</SelectItem>
					<SelectItem value='animal-products'>
						Товары для животноводства
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
