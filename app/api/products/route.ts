import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

type ProductRequestBody = {
	name: string
	price: number
	categoryId: number
	stock: number
	description?: string
	image?: string
}

// GET /api/products
export async function GET() {
	const products = await prisma.product.findMany({
		include: { category: true },
	})

	return NextResponse.json(products)
}

// POST /api/products
export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ProductRequestBody

		if (!body.name || !body.price || !body.categoryId || !body.stock) {
			return NextResponse.json(
				{ message: 'All fields are required' },
				{ status: 400 },
			)
		}

		const newProduct = await prisma.product.create({
			data: { ...body },
		})

		return NextResponse.json(newProduct, { status: 201 })
	} catch (error) {
		console.error('Error creating product:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
