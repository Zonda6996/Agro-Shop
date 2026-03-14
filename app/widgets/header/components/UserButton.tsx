import { auth } from '@/shared/lib/auth'
import UserDropdown from './UserDropdown'

const UserButton = async () => {
	const session = await auth()

	if (!session) return null

	if (session) {
		return (
			<UserDropdown name={session?.user?.name} email={session?.user?.email} />
		)
	}


}

export default UserButton
