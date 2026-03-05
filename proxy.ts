import NextAuth from 'next-auth'
import { authConfig } from '@/shared/lib/auth.config'

export const { auth } = NextAuth(authConfig)

export default auth

export const config = {
	matcher: ['/checkout/:path*', '/account/:path*'],
}
