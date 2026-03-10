'use server'

import bcrypt from 'bcryptjs'
import { auth } from '../lib/auth'
import prisma from '../lib/prisma'
import { ChangePasswordData, changePasswordSchema } from '../lib/validations/password'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '../lib/routes'

export async function changePasswordAction(data: ChangePasswordData) {
	const session = await auth()
	if (!session?.user?.id) return { error: 'Не авторизован' }

	const parsed = changePasswordSchema.safeParse(data)
	if (!parsed.success) return { error: parsed.error.issues[0].message }

	const user = await prisma.user.findUnique({
		where: { id: Number(session.user.id) },
	})

	if (!user) return { error: 'Пользователь не найден' }

	const passwordMatch = await bcrypt.compare(
		parsed.data.currentPassword,
		user.password,
	)
	if (!passwordMatch) return { error: 'Неверный текущий пароль' }

	const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10)

	await prisma.user.update({
		where: { id: Number(session.user.id) },
		data: { password: hashedPassword },
	})

	revalidatePath(ROUTES.ACCOUNT_PROFILE)
	return { success: true }
}
