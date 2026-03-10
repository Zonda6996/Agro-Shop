import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import prisma from './prisma'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),

		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email as string },
				})

				if (!user) return null

				const passwordMatch = await bcrypt.compare(
					credentials.password as string,
					user.password,
				)

				if (!passwordMatch) return null

				return {
					id: String(user.id),
					email: user.email,
					name: user.name,
				}
			},
		}),
	],

	callbacks: {
		...authConfig.callbacks,

		async signIn({ user, account }) {
			if (account?.provider === 'google') {
				await prisma.user.upsert({
					where: { email: user.email! },
					update: {},
					create: {
						email: user.email!,
						name: user.name,
						password: '',
					},
				})
			}

			return true
		},

		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id
			}

			if (account?.provider === 'google' && token.email) {
				const dbUser = await prisma.user.findUnique({
					where: { email: token.email as string },
				})

				if (dbUser) {
					token.id = String(dbUser.id)
					token.name = dbUser.name
				}
			}

			if (token.id) {
				const dbUser = await prisma.user.findUnique({
					where: { id: Number(token.id) },
				})
				if (dbUser) token.name = dbUser.name
			}

			return token
		},
	},
})
