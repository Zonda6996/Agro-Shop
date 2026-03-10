import { auth } from '@/shared/lib/auth'
import { ROUTES } from '@/shared/lib/routes'
import Link from 'next/link'
import UserDropdown from './UserDropdown'
import { Separator } from '@/shared/ui/separator'

const UserButton = async () => {
	const session = await auth()

	if (session) {
		return (
			<UserDropdown name={session?.user?.name} email={session?.user?.email} />
		)
	}

	return (
		<div className='flex gap-3 items-center'>
			<Link
				className='py-1.5 px-2 rounded-full hover:bg-foreground-hover transition'
				href={ROUTES.LOGIN}
			>
				Войти
			</Link>
			<Separator className='w-[0.8px]! h-4!' orientation='vertical' />
			<Link
				className='py-1.5 px-2 rounded-full hover:bg-foreground-hover transition'
				href={ROUTES.REGISTER}
			>
				Регистрация
			</Link>
		</div>
	)
}

export default UserButton
