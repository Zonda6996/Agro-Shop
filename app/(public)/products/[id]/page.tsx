import prisma from '@/shared/lib/prisma'
import { ROUTES } from '@/shared/lib/routes'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Container } from '@/widgets/container/container'
import { ArrowLeftIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProductPageProps {
	params: Promise<{ id: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const { id } = await params

	const product = await prisma.product.findUnique({
		where: { id: Number(id) },
		include: { category: true },
	})

	if (!product) notFound()

	const finalPrice = product.isFeatured
		? Number(product.price) * 0.25
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
				{/* Фото */}
				<div className='aspect-square bg-gray-100 border rounded-3xl flex items-center justify-center text-gray-400 font-semibold uppercase tracking-wide'>
					Фото скоро
				</div>

				{/* Инфо */}
				<div className='flex flex-col gap-6 self-start'>
					<div>
						<span className='text-xs text-gray-500 uppercase tracking-wider'>
							{product.category.name}
						</span>
						<h1 className='text-3xl font-bold mt-2'>{product.name}</h1>
					</div>

					{/* Цена */}
					<div className='flex items-center gap-3'>
						<span className='text-4xl font-bold text-gray-900'>
							{finalPrice.toFixed(0)} ₸
						</span>
						{product.isFeatured && (
							<>
								<Badge className='bg-blue-200 text-blue-700'>Скидка 25%</Badge>
								<span className='text-lg text-gray-400 line-through'>
									{product.price.toString()} ₸
								</span>
							</>
						)}
					</div>

					{/* Наличие */}
					{product.stock < 5 ? (
						<Badge variant='destructive' className='w-fit'>
							Осталось мало ({product.stock} шт.)
						</Badge>
					) : (
						<Badge variant='default' className='w-fit'>
							В наличии ({product.stock} шт.)
						</Badge>
					)}

					{/* Описание */}
					{product.description && (
						<div>
							<h2 className='font-semibold text-lg mb-2'>Описание</h2>
							<p className='text-gray-600 leading-relaxed'>
								{product.description}
							</p>
						</div>
					)}

					{/* Кнопки */}
					<div className='flex gap-3'>
						<Button size='lg' className='flex-1'>
							В корзину
							<ShoppingCartIcon className='mr-2 h-5 w-5' />
						</Button>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ProductPage
