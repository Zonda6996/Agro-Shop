import prisma from '@/shared/lib/prisma'

console.log(process.env.DATABASE_URL)

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'user@example.com',
			name: 'Nikita',
			password: 'qwerty',
		},
	})

	const category = await prisma.category.create({
		data: {
			name: 'Семена',
		},
	})

	const product = await prisma.product.create({
		data: {
			name: 'Пшеница',
			price: 100,
			stock: 50,
			categoryId: category.id,
			description: 'Семена пшеницы высокого качества',
		},
	})

	const order = await prisma.order.create({
		data: {
			userId: user.id,
			total: 500,
		},
	})

	console.log('Seed finished:', { user, category, product, order })
}

main()
	.catch(e => console.error(e))
	.finally(async () => await prisma.$disconnect)
