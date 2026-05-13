import prisma from '@/shared/lib/prisma'
import { ChangeUserRole } from './components/ChangeUserRole'

export default async function AdminUsersPage() {
	const users = await prisma.user.findMany({
		orderBy: { id: 'desc' },
		include: {
			_count: {
				select: { orders: true },
			},
		},
	})

	return (
		<div>
			<h1 className='text-2xl font-bold mb-8'>Пользователи</h1>

			<div className='bg-white rounded-xl shadow-sm overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-gray-50 border-b'>
						<tr>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>ID</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>Имя</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Email
							</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Заказов
							</th>
							<th className='text-left px-6 py-3 text-sm text-gray-500'>
								Роль
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100'>
						{users.map(user => (
							<tr key={user.id} className='hover:bg-gray-50'>
								<td className='px-6 py-4 text-sm text-gray-500'>#{user.id}</td>
								<td className='px-6 py-4 font-medium'>{user.name ?? '—'}</td>
								<td className='px-6 py-4 text-sm text-gray-500'>
									{user.email}
								</td>
								<td className='px-6 py-4 text-sm'>{user._count.orders}</td>
								<td className='px-6 py-4'>
									<ChangeUserRole id={user.id} currentRole={user.role} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
