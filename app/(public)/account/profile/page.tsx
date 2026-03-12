import { auth } from '@/shared/lib/auth'
import prisma from '@/shared/lib/prisma'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import ProfileForm from './components/ProfileForm'
import ChangePasswordForm from './components/ChangePasswordForm'

const ProfilePage = async () => {
	const session = await auth()
	const user = await prisma.user.findUnique({
		where: { id: Number(session?.user?.id) },
	})

	const isGoogleUser = !user?.password

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-lg font-semibold heading'>Профиль</h2>
			<Card>
				<CardHeader>
					<CardTitle>Личные данные</CardTitle>
					<CardDescription>Обновите своё имя в профиле.</CardDescription>
				</CardHeader>
				<CardContent>
					<ProfileForm name={user?.name ?? ''} email={user?.email ?? ''} />
				</CardContent>
			</Card>

			{!isGoogleUser && (
				<Card>
					<CardHeader>
						<CardTitle>Смена пароля</CardTitle>
						<CardDescription>Придумайте новый надёжный пароль.</CardDescription>
					</CardHeader>
					<CardContent>
						<ChangePasswordForm />
					</CardContent>
				</Card>
			)}
		</div>
	)
}

export default ProfilePage
