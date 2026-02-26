import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export const SkeletonProduct = () => {
	return (
		<Card className='rounded-3xl border-0'>
			<CardContent>
				<Skeleton className='aspect-square w-full max-h-60' />
			</CardContent>
			<CardHeader>
				<Skeleton className='h-4 w-2/3' />
				<Skeleton className='h-4 w-1/2' />
			</CardHeader>
			<CardFooter className='flex gap-4'>
				<Skeleton className='h-6 w-full' />
				<Skeleton className='h-6 w-full' />
			</CardFooter>
		</Card>
	)
}
