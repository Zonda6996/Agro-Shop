import prisma from '@/shared/lib/prisma'
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { DeleteProductButton } from './components/DeleteProductsButton'
import Link from 'next/link'

export default async function AdminProductsPage() {
	const products = await prisma.product.findMany({
		include: { category: true },
		orderBy: { id: 'desc' },
	})

	return (
		<div>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-2xl font-bold'>Товары</h1>
				<Link href='/admin/products/create'>
					<Button>Добавить товар</Button>
				</Link>
			</div>

			<div className='bg-white rounded-xl shadow-sm overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-gray-50 border-b'>
						<tr>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>ID</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Название
							</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Категория
							</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Цена
							</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Остаток
							</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Действия
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100'>
						{products.map(product => (
							<tr key={product.id} className='hover:bg-gray-50'>
								<td className='px-6 py-4 text-sm text-gray-500'>
									#{product.id}
								</td>
								<td className='px-6 py-4 font-medium'>{product.name}</td>
								<td className='px-6 py-4 text-sm text-gray-500'>
									{product.category.name}
								</td>
								<td className='px-6 py-4 text-sm'>
									{formatPrice(Number(product.price))} ₸
								</td>
								<td className='px-6 py-4 text-sm'>
									<span
										className={
											product.stock < 5 ? 'text-red-500' : 'text-green-600'
										}
									>
										{product.stock} шт.
									</span>
								</td>
								<td className='px-6 py-4'>
									<div className='flex gap-2'>
										<Link href={`/admin/products/${product.id}/edit`}>
											<Button variant='outline' size='sm'>
												Изменить
											</Button>
										</Link>
										<DeleteProductButton id={product.id} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
