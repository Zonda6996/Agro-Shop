import { ROUTES } from '@/shared/lib/routes'
import { Badge } from '@/shared/ui/badge'
import { Container } from '@/widgets/container/container'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './components/AddToCartButton'
import { getProductById, getSimilarProducts } from '@/shared/lib/api/products'
import { auth } from '@/shared/lib/auth'
import { getFavoriteIds } from '@/shared/lib/api/favorites'
import { FavoriteButton } from '@/shared/ui/favoriteButton'
import { formatPrice } from '@/shared/lib/utils'
import Image from 'next/image'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb'
import { SimilarProducts } from './components/SimilarProducts'
import { getFinalPrice } from '@/shared/lib/pricing'
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

	const similarProducts = await getSimilarProducts({
		categoryId: product.categoryId,
		productId: product.id,
	})

	const finalPrice = getFinalPrice(Number(product.price), product.isFeatured)

	return (
		<Container>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={ROUTES.HOME}>Главная</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={ROUTES.PRODUCTS}>Ассортимент</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link
								href={`${ROUTES.PRODUCTS}?category=${product.category.slug}`}
							>
								{product.category.name}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className='grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 lg:gap-12 gap-8 mt-8 mb-8 items-start'>
				<div className='relative aspect-square lg:aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden'>
					<Image
						src={product.image || '/placeholder.svg'}
						alt={product.name}
						fill
						sizes='(max-width: 1024px) 100vw, 50vw'
						className='object-cover '
					/>
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
					{product.stock === 0 ? (
						<Badge variant='outline' className='w-fit'>
							Нет в наличии
						</Badge>
					) : product.stock < 5 ? (
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
							stock={product.stock}
						/>
					</div>
				</div>
			</div>
			<SimilarProducts products={similarProducts} favoriteIds={favoriteIds} />
		</Container>
	)
}

export default ProductPage
