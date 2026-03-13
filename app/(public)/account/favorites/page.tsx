import { getFavoritesByUserId } from '@/shared/lib/api/favorites'
import { auth } from '@/shared/lib/auth'
import { ROUTES } from '@/shared/lib/routes'
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { FavoriteButton } from '@/shared/ui/favoriteButton'
import { HeartOffIcon } from 'lucide-react'
import Link from 'next/link'

const FavoritesPage = async () => {
	const session = await auth()
	const favorites = await getFavoritesByUserId(Number(session?.user.id))

	if (!favorites.length) {
		return (
			<div className='flex flex-col items-center gap-4 py-20 text-center'>
				<HeartOffIcon className='w-12 h-12 text-gray-300' />
				<div>
					<p className='font-semibold'>Нет избранных товаров</p>
					<p className='text-gray-500 text-sm mt-1'>
						Добавляйте понравившиеся товары нажав на сердечко
					</p>
				</div>
				<Link href={ROUTES.PRODUCTS}>
					<Button variant='outline'>Перейти в каталог</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-lg font-semibold heading'>Избранное</h2>
			<div className='grid grid-cols-1 gap-4'>
				{favorites.map(({ product }) => (
					<Card key={product.id}>
						<CardContent className='flex items-center justify-between gap-2'>
							<div className='flex flex-col gap-1'>
								<Link
									href={ROUTES.PRODUCT(product.id)}
									className='font-medium hover:underline'
								>
									{product.name}
								</Link>
								<p className='text-sm text-gray-500'>
									{formatPrice(Number(product.price))} ₸
								</p>
							</div>
							<div className='flex items-center gap-3'>
								<Link href={ROUTES.PRODUCT(product.id)}>
									<Button variant='outline' size='sm'>
										Перейти
									</Button>
								</Link>
								<FavoriteButton productId={product.id} isFavorite={true} />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default FavoritesPage
