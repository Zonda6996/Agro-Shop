'use client'

import { Input } from '@/shared/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export const Search = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((value: string) => {
		const params = new URLSearchParams(searchParams)
		if (value) {
			params.set('query', value)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<Input
			placeholder='Что будем искать?'
			onChange={e => handleSearch(e.target.value)}
			defaultValue={searchParams.get('query')?.toString()}
			className=''
		/>
	)
}
