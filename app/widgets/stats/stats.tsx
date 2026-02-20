import { SquareArrowOutUpRight } from 'lucide-react'

export const Stats = () => {
	return (
		<div className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-25 font-[Montserrat]'>
			<div className='flex items-center justify-between py-6 px-10 rounded-2xl bg-gray-200'>
				<div className=''>
					<p className='mb-2 text-4xl tracking-tighter font-bold'>500+</p>
					<p className='text-sm tracking-tight uppercase'>Товаров</p>
				</div>
			</div>
			<div className='flex items-center justify-between py-6 px-10 rounded-2xl bg-gray-200'>
				<div className=''>
					<p className='mb-2 text-4xl tracking-tighter font-bold'>20+</p>
					<p className='text-sm tracking-tight uppercase'>Категорий</p>
				</div>
				<SquareArrowOutUpRight className='cursor-pointer p-2 w-12 h-12 bg-gray-300 rounded-2xl hover:bg-gray-400/35 transition-colors' />
			</div>
			<div className='flex items-center justify-center py-6 px-10 rounded-2xl bg-gray-950/80 text-primary-foreground'>
				<div className='text-center'>
					<p className='mb-2 text-4xl tracking-tighter font-bold'>5</p>
					<p className='text-sm tracking-tight uppercase'>лет опыта</p>
				</div>
			</div>
		</div>
	)
}
