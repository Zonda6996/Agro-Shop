import { ROUTES } from '@/shared/lib/routes'
import { redirect } from 'next/navigation'

const AccountPage = () => {
	redirect(ROUTES.ACCOUNT_ORDERS)
}

export default AccountPage
