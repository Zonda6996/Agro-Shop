import { Button } from '@/shared/ui/button'
import { MoveRightIcon } from 'lucide-react'

interface CategoryCardProps {
	name: string
	description: string
	icon: React.ReactNode
}

export const CategoryCard = ({
	name,
	description,
	icon,
}: CategoryCardProps) => {
	return (
		<div className='flex flex-col px-3 py-5 items-center text-center gap-3 border border-gray-300 bg-gray-200/30 rounded-2xl cursor-default hover:scale-105 hover:bg-gray-200 duration-400 transition-all'>
			<div className='w-fit flex items-center justify-center rounded-full p-3 border border-primary'>
				{icon}
			</div>
			<p className='font-semibold text-xl font-[Montserrat]'>{name}</p>
			<p className='font-[Montserrat]'>{description}</p>
			<Button
				className='mt-auto self-end font-[Montserrat] h-0'
				variant={'link'}
			>
				Перейти
				<MoveRightIcon />
			</Button>
		</div>
	)
}
