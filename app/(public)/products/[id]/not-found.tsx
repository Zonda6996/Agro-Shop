import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { FlaskConicalOff } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
	return (
		<div className='flex-1 flex items-center justify-center pb-40'>
			<div className='flex flex-col justify-center items-center mx-auto p-5 rounded-3xl bg-gray-200'>
				<div className='flex text-7xl items-center font-light heading'>
					4<FlaskConicalOff className='w-16 h-16 text-primary' />4
				</div>
				<div className='text-center mt-4'>
					<p className='text-2xl font-semibold'>Страница не найдена</p>
					<p className='text-gray-500 text-sm mt-1'>
						Возможно, она была удалена или вы перешли по неверной ссылке
					</p>
					<Link href={ROUTES.HOME}>
						<Button className='mt-4'>На главную</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
