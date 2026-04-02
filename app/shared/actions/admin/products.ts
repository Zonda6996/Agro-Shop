'use server'

import { auth } from '@/shared/lib/auth'
import prisma from '@/shared/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const productSchema = z.object({
	name: z.string().min(2, 'Минимум 2 символа'),
	description: z.string().optional(),
	price: z.coerce.number().positive('Цена должна быть больше 0'),
	stock: z.coerce.number().int().min(0, 'Остаток не может быть отрицательным'),
	categoryId: z.coerce.number(),
	isFeatured: z.coerce.boolean().default(false),
})

async function checkAdmin() {
	const session = await auth()
	if (session?.user?.role !== 'ADMIN') {
		throw new Error('Нет доступа')
	}
}

export async function createProductAction(
	prevState: unknown,
	formData: FormData,
) {
	await checkAdmin()

	const parsed = productSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		price: formData.get('price'),
		stock: formData.get('stock'),
		categoryId: formData.get('categoryId'),
		isFeatured: formData.get('isFeatured'),
	})

	if (!parsed.success) {
		return { error: parsed.error.issues[0].message }
	}

	await prisma.product.create({ data: parsed.data })

	revalidatePath('/admin/products')
	revalidatePath('/products')
	redirect('/admin/products')
}

export async function deleteProductAction(id: number) {
	await checkAdmin()

	await prisma.product.delete({ where: { id } })

	revalidatePath('/admin/products')
	revalidatePath('/products')
}

export async function updateProductAction(
	id: number,
	prevState: unknown,
	formData: FormData,
) {
	await checkAdmin()

	const parsed = productSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		price: formData.get('price'),
		stock: formData.get('stock'),
		categoryId: formData.get('categoryId'),
		isFeatured: formData.get('isFeatured'),
	})

	if (!parsed.success) {
		return { error: parsed.error.issues[0].message }
	}

	await prisma.product.update({
		where: { id },
		data: parsed.data,
	})

	revalidatePath('/admin/products')
	revalidatePath('/products')
	redirect('/admin/products')
}
