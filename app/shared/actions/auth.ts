'use server'

import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma'
import { RegisterData, registerSchema } from '../lib/validations/auth'

export async function registerAction(data: RegisterData) {
	const parsed = registerSchema.safeParse(data)

	if (!parsed.success) {
		return { error: 'Неверные данные' }
	}

	const { name, email, password } = parsed.data

	const existingUser = await prisma.user.findUnique({
		where: { email },
	})

	if (existingUser) {
		return { error: 'Пользователь с таким email уже существует' }
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	await prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
		},
	})

	return { success: true }
}
