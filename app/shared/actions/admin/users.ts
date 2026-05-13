'use server'

import { auth } from '@/shared/lib/auth'
import prisma from '@/shared/lib/prisma'
import { revalidatePath } from 'next/cache'

async function checkAdmin() {
	const session = await auth()
	if (session?.user?.role !== 'ADMIN') {
		throw new Error('Нет доступа')
	}
}

export async function updateUserRoleAction(id: number, role: 'USER' | 'ADMIN') {
	await checkAdmin()

	await prisma.user.update({
		where: { id },
		data: { role },
	})

	revalidatePath('/admin/users')
}
