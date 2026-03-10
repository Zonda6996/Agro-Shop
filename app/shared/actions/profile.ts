'use server'

import { auth } from '../lib/auth'
import prisma from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '../lib/routes'
import {
	UpdateProfileData,
	updateProfileSchema,
} from '../lib/validations/profile'

export async function updateProfileAction(data: UpdateProfileData) {
	const session = await auth()
	if (!session?.user?.id) return { error: 'Не авторизован' }

	const parsed = updateProfileSchema.safeParse(data)
	if (!parsed.success) return { error: parsed.error.issues[0].message }

	await prisma.user.update({
		where: { id: Number(session.user.id) },
		data: { name: parsed.data.name },
	})

	revalidatePath(ROUTES.ACCOUNT_PROFILE)
	return { success: true }
}
