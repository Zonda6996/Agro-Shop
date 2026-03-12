import { ROUTES } from '@/shared/lib/routes'
import { Badge } from '@/shared/ui/badge'
import { Container } from '@/widgets/container/container'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './components/AddToCartButton'
import { getProductById } from '@/shared/lib/api/products'
import { auth } from '@/shared/lib/auth'
import { getFavoriteIds } from '@/shared/lib/api/favorites'
import { FavoriteButton } from '@/shared/ui/favoriteButton'
import { formatPrice } from '@/shared/lib/utils'

interface ProductPageProps {
	params: Promise<{ id: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const { id } = await params
	const [product, session] = await Promise.all([
		getProductById(Number(id)),
		auth(),
	])

	if (!product) return notFound()

	const favoriteIds = session?.user?.id
		? await getFavoriteIds(Number(session.user.id))
		: []

	const isFavorite = favoriteIds.includes(product.id)

	const finalPrice = product.isFeatured
		? Number(product.price) * 0.75
		: Number(product.price)

	return (
		<Container>
			<Link
				href={ROUTES.PRODUCTS}
				className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit mt-4'
			>
				<ArrowLeftIcon className='w-4 h-4' />
				Назад к товарам
			</Link>

			<div className='grid md:grid-cols-2 grid-cols-1 gap-12 mt-8'>
				<div className='aspect-square bg-gray-100 border rounded-3xl flex items-center justify-center text-gray-400 font-semibold uppercase tracking-wide'>
					Фото скоро
				</div>

				<div className='flex flex-col gap-6 self-start'>
					{/* Категория и название */}
					<div className='flex items-start justify-between gap-3'>
						<div>
							<span className='text-xs text-gray-500 uppercase tracking-wider'>
								{product.category.name}
							</span>
							<h1 className='text-3xl font-bold mt-2'>{product.name}</h1>
						</div>
						<FavoriteButton productId={product.id} isFavorite={isFavorite} />
					</div>

					{/* Цена */}
					<div className='flex items-center gap-3'>
						<span className='text-4xl font-bold text-gray-900'>
							{formatPrice(finalPrice)} ₸
						</span>
						{product.isFeatured && (
							<>
								<Badge className='bg-blue-200 text-blue-700'>Скидка 25%</Badge>
								<span className='text-lg text-gray-400 line-through'>
									{formatPrice(Number(product.price))} ₸
								</span>
							</>
						)}
					</div>

					{/* Наличие */}
					{product.stock < 5 ? (
						<Badge variant='destructive' className='w-fit'>
							Осталось мало — {product.stock} шт.
						</Badge>
					) : (
						<Badge variant='default' className='w-fit'>
							В наличии — {product.stock} шт.
						</Badge>
					)}

					{/* Описание */}
					{product.description && (
						<div className='bg-gray-50 rounded-2xl p-4'>
							<h2 className='font-semibold mb-2'>Описание</h2>
							<p className='text-gray-600 leading-relaxed text-sm'>
								{product.description}
							</p>
						</div>
					)}

					{/* Характеристики */}
					<div className='bg-gray-50 rounded-2xl p-4 flex flex-col gap-3'>
						<h2 className='font-semibold'>Характеристики</h2>
						<div className='flex justify-between text-sm'>
							<span className='text-gray-500'>Категория</span>
							<span className='font-medium'>{product.category.name}</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span className='text-gray-500'>Наличие</span>
							<span className='font-medium'>{product.stock} шт.</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span className='text-gray-500'>Артикул</span>
							<span className='font-medium'>
								AGR-{product.id.toString().padStart(4, '0')}
							</span>
						</div>
					</div>

					{/* Кнопки */}
					<div className='flex gap-3'>
						<AddToCartButton
							id={product.id}
							name={product.name}
							price={finalPrice}
							image={product.image}
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ProductPage
