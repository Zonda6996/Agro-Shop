import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { MoveRightIcon } from 'lucide-react'
import Link from 'next/link'

interface CategoryCardProps {
	name: string
	description: string
	icon: React.ReactNode
	slug: string
}

export const CategoryCard = ({
	name,
	description,
	icon,
	slug,
}: CategoryCardProps) => {
	return (
		<Link href={`${ROUTES.PRODUCTS}?category=${slug}`}>
			<div className='flex flex-col px-3 py-5 items-center text-center gap-3 border border-gray-300 bg-gray-200/30 rounded-2xl cursor-pointer hover:scale-105 hover:bg-gray-200 duration-400 transition-all h-full'>
				<div className='w-fit flex items-center justify-center rounded-full p-3 border border-primary'>
					{icon}
				</div>
				<p className='font-semibold text-xl font-[Montserrat]'>{name}</p>
				<p className='font-[Montserrat] text-sm text-gray-600'>{description}</p>
				<Button
					className='mt-auto self-end font-[Montserrat] h-0'
					variant='link'
				>
					Перейти <MoveRightIcon />
				</Button>
			</div>
		</Link>
	)
}
