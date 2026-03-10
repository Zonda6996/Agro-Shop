import { getOrderById } from '@/shared/lib/api/orders'
import { auth } from '@/shared/lib/auth'
import { ROUTES } from '@/shared/lib/routes'
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import { Container } from '@/widgets/container/container'
import { CheckCircleIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Separator } from '@/shared/ui/separator'
import Link from 'next/link'
import NotFound from './not-found'

type Params = {
	params: Promise<{ id: string }>
}

const OrderPage = async ({ params }: Params) => {
	const { id } = await params
	const session = await auth()
	const order = await getOrderById(Number(id))

	if (!order) notFound()

	if (order.userId !== Number(session?.user?.id)) NotFound()

	const paymentLabels: Record<string, string> = {
		CASH: 'Наличными',
		KASPI: 'Kaspi перевод',
		INVOICE: 'Безналичный расчёт',
	}

	return (
		<Container>
			<div className='max-w-2xl mx-auto py-10'>
				<div className='flex flex-col items-center gap-3 text-center mb-8'>
					<CheckCircleIcon className='w-16 h-16 text-primary' />
					<h1 className='text-3xl font-bold'>Заказ оформлен!</h1>
					<p className='text-gray-500'>
						Заказ №{order.id} успешно создан. Мы свяжемся с вами в ближайшее
						время.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Детали заказа №{order.id}</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-4'>
						<div className='grid grid-cols-2 gap-4 text-sm'>
							<div>
								<p className='text-gray-500'>Имя</p>
								<p className='font-medium'>{order.name}</p>
							</div>
							<div>
								<p className='text-gray-500'>Телефон</p>
								<p className='font-medium'>{order.phone}</p>
							</div>
							<div>
								<p className='text-gray-500'>Доставка</p>
								<p className='font-medium'>
									{order.deliveryMethod === 'PICKUP' ? 'Самовывоз' : 'Доставка'}
								</p>
								{order.deliveryMethod === 'PICKUP' && (
									<>
										<p className='text-xs text-gray-500 mt-1'>
											г. Астана, ул. Складская, 15
										</p>
										<p className='text-xs text-gray-500 mt-1'>
											Пн-Пт: 9:00 - 18:00
										</p>
									</>
								)}
							</div>
							<div>
								<p className='text-gray-500'>Оплата</p>
								<p className='font-medium'>
									{paymentLabels[order.paymentMethod]}
								</p>
							</div>
							{order.address && (
								<div className='col-span-2'>
									<p className='text-gray-500'>Адрес</p>
									<p className='font-medium'>{order.address}</p>
								</div>
							)}
						</div>

						<Separator className='bg-gray-200' />

						<div className='flex flex-col gap-3'>
							{order.items.map(item => (
								<div key={item.id} className='flex justify-between text-sm'>
									<div>
										<p className='font-medium'>{item.product.name}</p>
										<p className='text-gray-500'>
											{item.quantity} шт × {formatPrice(Number(item.price))} ₸
										</p>
									</div>
									<span className='font-medium'>
										{formatPrice(Number(item.price) * item.quantity)} ₸
									</span>
								</div>
							))}
						</div>

						<Separator className='bg-gray-200' />

						<div className='flex justify-between font-semibold text-lg'>
							<span>Итого</span>
							<span>{formatPrice(Number(order.total))} ₸</span>
						</div>
					</CardContent>
				</Card>

				<div className='flex gap-4 mt-6'>
					<Link href={ROUTES.PRODUCTS} className='flex-1'>
						<Button variant='outline' className='w-full'>
							Продолжить покупки
						</Button>
					</Link>
					<Link href={ROUTES.ACCOUNT} className='flex-1'>
						<Button className='w-full'>Мои заказы</Button>
					</Link>
				</div>
			</div>
		</Container>
	)
}

export default OrderPage
