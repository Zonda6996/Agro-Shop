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
				session.user.role = token.role as string
			}
			return session
		},

		authorized({ auth, request }) {
			const isLoggedIn = !!auth?.user
			const isAdmin = auth?.user?.role === 'ADMIN'

			const isProtected = ['/checkout', '/account'].some(path =>
				request.nextUrl.pathname.startsWith(path),
			)

			const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

			if (isAdminRoute && !isAdmin) {
				return Response.redirect(new URL('/', request.nextUrl))
			}

			if (isProtected && !isLoggedIn) {
				return Response.redirect(new URL('/login', request.nextUrl))
			}

			return true
		},
	},
	providers: [],
}
