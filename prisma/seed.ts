import prisma from '@/shared/lib/prisma'

console.log(process.env.DATABASE_URL)

async function main() {
	const categories = [
		{ name: 'Семена', slug: 'seeds' },
		{ name: 'Оборудование', slug: 'equipment' },
		{ name: 'Удобрения', slug: 'fertilizers' },
		{ name: 'Защита растений', slug: 'plant-protection' },
		{ name: 'Полив и орошение', slug: 'irrigation' },
		{ name: 'Садовые инструменты', slug: 'garden-tools' },
		{ name: 'Теплицы и укрывные материалы', slug: 'greenhouse-materials' },
		{ name: 'Товары для животноводства', slug: 'animal-products' },
	]

	const categoryRecords = []

	for (const item of categories) {
		const category = await prisma.category.upsert({
			where: { slug: item.slug },
			update: {},
			create: { name: item.name, slug: item.slug },
		})
		categoryRecords.push(category)
	}

	const products = [
		// Семена
		{
			name: 'Семена томата "Черри"',
			description:
				'Высококачественные семена для выращивания вкусных и сочных томатов черри.',
			price: 840,
			stock: 100,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена огурца "Кустовой"',
			description:
				'Семена огурца для открытого грунта и теплиц, урожайные и устойчивые к болезням.',
			price: 720,
			stock: 80,
			categoryId: categoryRecords[0].id,
		},

		// Оборудование
		{
			name: 'Сеялка ручная',
			description: 'Простая и надежная сеялка для небольших участков.',
			price: 15000,
			stock: 5,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Мотоблок "Лидер 7HP"',
			description: 'Мотоблок для обработки средних и больших участков.',
			price: 120000,
			stock: 2,
			categoryId: categoryRecords[1].id,
		},

		// Удобрения
		{
			name: 'Комплексное удобрение NPK 10-10-10',
			description: 'Сбалансированное питание для овощных и плодовых культур.',
			price: 2500,
			stock: 50,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Органическое удобрение "Вермикомпост"',
			description: 'Натуральное удобрение для здорового роста растений.',
			price: 3200,
			stock: 30,
			categoryId: categoryRecords[2].id,
		},

		// Защита растений
		{
			name: 'Инсектицид "Актеллик"',
			description: 'Средство от насекомых-вредителей для овощей и фруктов.',
			price: 1800,
			stock: 25,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Фунгицид "ХОМ"',
			description: 'Эффективная защита от грибковых заболеваний.',
			price: 2200,
			stock: 20,
			categoryId: categoryRecords[3].id,
		},

		// Полив и орошение
		{
			name: 'Капельная лента 100м',
			description:
				'Система капельного полива для равномерного увлажнения растений.',
			price: 5500,
			stock: 15,
			categoryId: categoryRecords[4].id,
		},
		{
			name: 'Ручной распылитель 5л',
			description: 'Компактный опрыскиватель для садовых и тепличных растений.',
			price: 1500,
			stock: 40,
			categoryId: categoryRecords[4].id,
		},

		// Садовые инструменты
		{
			name: 'Лопата садовая',
			description: 'Прочная лопата для посадки и перекопки земли.',
			price: 1200,
			stock: 50,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Секатор профессиональный',
			description: 'Секатор для обрезки деревьев и кустарников.',
			price: 1800,
			stock: 30,
			categoryId: categoryRecords[5].id,
		},

		// Теплицы и укрывные материалы
		{
			name: 'Теплица 3x6м',
			description:
				'Каркасная теплица с поликарбонатным покрытием для всех сезонов.',
			price: 75000,
			stock: 2,
			categoryId: categoryRecords[6].id,
		},
		{
			name: 'Агроволокно белое 2x10м',
			description: 'Защитное укрывное полотно для заморозков и насекомых.',
			price: 2200,
			stock: 25,
			categoryId: categoryRecords[6].id,
		},

		// Товары для животноводства
		{
			name: 'Корм для кур 10кг',
			description: 'Сбалансированный корм для несушек и бройлеров.',
			price: 4500,
			stock: 40,
			categoryId: categoryRecords[7].id,
		},
		{
			name: 'Поилка для кроликов 2л',
			description: 'Удобная поилка для домашних и фермерских кроликов.',
			price: 1800,
			stock: 20,
			categoryId: categoryRecords[7].id,
		},
	]

	for (const product of products) {
		await prisma.product.create({ data: product })
	}

	console.log('Seed finished')
}

main()
	.catch(e => console.error(e))
	.finally(async () => await prisma.$disconnect())
