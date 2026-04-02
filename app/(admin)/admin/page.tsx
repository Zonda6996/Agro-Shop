import prisma from '@/shared/lib/prisma'

const AdminPage = async () => {
	const [productsCount, ordersCount, usersCount] = await Promise.all([
		prisma.product.count(),
		prisma.order.count(),
		prisma.user.count(),
	])

	const stats = [
		{ label: 'Товаров', value: productsCount },
		{ label: 'Заказов', value: ordersCount },
		{ label: 'Пользователей', value: usersCount },
	]

	return (
		<div>
			<h1 className='text-2xl font-bold mb-8'>Дашборд</h1>
			<div className='grid grid-cols-3 gap-6'>
				{stats.map(({ label, value }) => (
					<div key={label} className='bg-white rounded-xl p-6 shadow-sm'>
						<p className='text-gray-500 text-sm'>{label}</p>
						<p className='text-4xl font-bold mt-2'>{value}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminPage
