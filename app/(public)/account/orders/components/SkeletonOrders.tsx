import { Card, CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { Separator } from '@/shared/ui/separator'

export const SkeletonOrders = () => {
	return (
		<Card>
			<CardContent className='flex flex-col gap-4'>
				{/* Шапка */}
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<Skeleton className='h-4 w-24' />
						<Skeleton className='h-4 w-32' />
					</div>
					<Skeleton className='h-5 w-20 rounded-full' />
				</div>

				{/* Товары */}
				<div className='flex flex-col gap-2'>
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className='flex justify-between gap-5'>
							<Skeleton className='h-4 w-2/3' />
							<Skeleton className='h-4 w-16 shrink-0' />
						</div>
					))}
				</div>

				<Separator className='bg-gray-200' />

				{/* Итого и кнопка */}
				<div className='flex items-center justify-between gap-2'>
					<Skeleton className='h-4 w-28' />
					<Skeleton className='h-8 w-24 rounded-md' />
				</div>
			</CardContent>
		</Card>
	)
}
