'use client'

interface FavoriteButtonProps {
	productId: number
	isFavorite: boolean
}

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toggleFavoriteAction } from '../actions/favorites'
import { ROUTES } from '../lib/routes'
import { Button } from './button'
import { HeartIcon } from 'lucide-react'
import clsx from 'clsx'

export const FavoriteButton = ({
	isFavorite,
	productId,
}: FavoriteButtonProps) => {
	const [optimistic, setOptimistic] = useState(isFavorite)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const onClick = async () => {
		setOptimistic(prev => !prev)
		setIsLoading(true)

		const result = await toggleFavoriteAction(productId)

		if (result.error) {
			setOptimistic(prev => !prev)
			router.push(ROUTES.LOGIN)
		}

		setIsLoading(false)
	}

	return (
		<Button
			variant={'ghost'}
			size={'icon'}
			disabled={isLoading}
			onClick={onClick}
			className='hover:bg-transparent hover:scale-130'
		>
			<HeartIcon
				className={clsx(
					'w-4 h-4 transition-colors ',
					optimistic ? 'fill-red-500 text-red-500' : 'text-gray-400',
				)}
			/>
		</Button>
	)
}
