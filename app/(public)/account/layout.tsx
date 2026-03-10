import { auth } from '@/shared/lib/auth'
import { Container } from '@/widgets/container/container'
import React from 'react'
import AccountNav from './components/AccountNav'

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth()

	return (
		<Container>
			<div className='py-10 flex flex-col gap-6'>
				{/* Шапка */}
				<div>
					<h1 className='text-2xl font-bold heading'>Личный кабинет</h1>
					<p className='text-gray-500 text-sm mt-1'>{session?.user?.email}</p>
				</div>

				<div className='flex gap-8 items-start'>
					{/* Sidebar */}
					<aside className='w-56 shrink-0'>
						<AccountNav />
					</aside>

					{/* Контент */}
					<main className='flex-1 min-w-0'>{children}</main>
				</div>
			</div>
		</Container>
	)
}

export default AccountLayout
