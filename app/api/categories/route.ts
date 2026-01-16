import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

type CategoryRequestBody = {
	name: string
}

// GET /api/categories
export async function GET() {
	const category = await prisma.category.findMany()

	return NextResponse.json(category)
}

// POST /api/categories
export async function POST(request: Request) {
	try {
		const body = (await request.json()) as CategoryRequestBody

		if (!body.name) {
			return NextResponse.json({ message: 'Name is required' }, { status: 400 })
		}

		const newCategory = await prisma.category.create({
			data: { ...body },
		})

		return NextResponse.json(newCategory, { status: 201 })
	} catch (error) {
		console.error('Error creating category:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
