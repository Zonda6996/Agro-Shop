import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { PackageXIcon } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
	return (
		<div className='flex-1 flex items-center justify-center pb-40'>
			<div className='flex flex-col items-center gap-4 p-8 rounded-3xl bg-gray-100 text-center'>
				<PackageXIcon className='w-16 h-16 text-primary' />
				<div>
					<p className='text-2xl font-semibold'>Заказ не найден</p>
					<p className='text-gray-500 text-sm mt-1'>
						Возможно, он был удалён или вы перешли по неверной ссылке
					</p>
				</div>
				<Link href={ROUTES.HOME}>
					<Button>На главную</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
