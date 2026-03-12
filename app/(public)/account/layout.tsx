import { auth } from '@/shared/lib/auth'
import { Container } from '@/widgets/container/container'
import React from 'react'
import AccountNav from './components/AccountNav'

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth()

	return (
		<Container>
			<div className='py-8 flex flex-col gap-6'>
				<div className='flex gap-8 items-start'>
					{/* Sidebar */}
					<aside className='w-64 shrink-0'>
						<div className='bg-white rounded-2xl shadow-sm border p-4 flex flex-col gap-4'>
							{/* Аватар и данные */}
							<div className='flex flex-col items-center gap-2 py-4 border-b'>
								<div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold'>
									{session?.user?.name?.[0]?.toUpperCase() ?? '?'}
								</div>
								<div className='text-center'>
									<p className='font-semibold'>{session?.user?.name}</p>
									<p className='text-gray-500 text-xs'>
										{session?.user?.email}
									</p>
								</div>
							</div>
							<AccountNav />
						</div>
					</aside>

					{/* Контент */}
					<main className='flex-1 min-w-0'>{children}</main>
				</div>
			</div>
		</Container>
	)
}

export default AccountLayout
