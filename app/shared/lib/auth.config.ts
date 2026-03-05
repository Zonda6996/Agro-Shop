import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string
			}
			return session
		},

		authorized({ auth, request }) {
			const isLoggedIn = !!auth?.user
			const isProtected = ['/checkout', '/account'].some(path =>
				request.nextUrl.pathname.startsWith(path),
			)

			if (isProtected && !isLoggedIn) {
				return Response.redirect(new URL('/login', request.nextUrl))
			}

			return true
		},
	},
	providers: [],
}
