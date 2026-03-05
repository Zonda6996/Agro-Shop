import { auth } from '@/shared/lib/auth'
import { ROUTES } from '@/shared/lib/routes'
import Link from 'next/link'

const UserButton = async () => {
	const session = await auth()

	if (session) {
		return (
			<span className='text-sm font-medium'>
				{session.user?.name ?? session.user.email}
			</span>
		)
	}

  return (
		<div className='flex gap-3 items-center'>
			<Link href={ROUTES.LOGIN}>Войти</Link>
			<Link href={ROUTES.REGISTER}>Регистрация</Link>
		</div>
	)
}

export default UserButton