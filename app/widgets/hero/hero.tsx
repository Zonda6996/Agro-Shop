import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import combineImg from '../../../public/images/combine.webp'
import twoTractorsImg from '../../../public/images/two-tractors.webp'
import tractorOnFieldImg from '../../../public/images/tractor-on-field.webp'
import { Container } from '../container/container'
import Link from 'next/link'

export const Hero = () => {
	return (
		<section className='flex flex-col gap-4 '>
			{/* <div className='flex justify-between'>
				<div className='max-w-1/2 flex flex-col gap-2 p-6 border border-primary rounded-2xl'>
					<h1 className='font-semibold text-black/70 text-2xl tracking-tighter uppercase font-[montserrat]'>
						<span className='text-primary'>Надёжные</span> решения для сельского
						хозяйства
					</h1>
					<h2 className='text-gray-500/65 tracking-tighter font-[montserrat]'>
						Качественные продукты и технологии для вашего бизнеса
					</h2>
				</div>
				<Button className='self-end w-40 h-10 font-[montserrat]'>
					Каталог
				</Button>
			</div> */}
			{/* Image section */}
			<div className='relative h-125 w-full rounded-2xl overflow-hidden'>
				<Image
					className='rounded-2xl object-cover '
					src={twoTractorsImg}
					alt='Combine'
					priority
					fill
				/>

				{/* Overlay */}
				<div className='absolute inset-0 bg-linear-to-r from-black/40 via-black/20 to-transparent rounded-2xl' />

				{/* Content */}
				<div className='absolute inset-0 flex items-end p-12'>
					<div className='w-full max-5xl bottom-12 left-12 p-6 rounded-2xl text-primary-foreground outline backdrop-blur-xs shadow-lg'>
						<div className='flex items-center justify-between'>
							<div className='text-background'>
								<p className='font-semibold text-2xl '>
									Надёжные решения для агробизнеса
								</p>
								<p className='font-light'>
									Товары для посева, ухода и роста
								</p>
							</div>
							<Button
								size={'lg'}
								className='border-background hover:border-primary'
								variant={'outline'}
							>
								Каталог
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
