import prisma from '@/shared/lib/prisma'
import bcrypt from 'bcryptjs'

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

		{
			name: 'Семена томата Бычье сердце',
			description: 'Крупноплодный сорт с высокой урожайностью.',
			price: 950,
			stock: 90,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена огурца Герман F1',
			description: 'Гибридный сорт огурцов для теплиц.',
			price: 1200,
			stock: 100,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена моркови Нантская',
			description: 'Популярный сорт сладкой моркови.',
			price: 650,
			stock: 130,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена капусты Амагер',
			description: 'Позднеспелый сорт белокочанной капусты.',
			price: 780,
			stock: 110,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена арбуза Астраханский',
			description: 'Сладкий сорт арбуза для южных регионов.',
			price: 950,
			stock: 70,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена дыни Колхозница',
			description: 'Ароматная и сладкая дыня.',
			price: 870,
			stock: 80,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена кукурузы сахарной',
			description: 'Сладкая кукуруза для варки и консервирования.',
			price: 1100,
			stock: 75,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена редиса Французский завтрак',
			description: 'Ранний сорт редиса.',
			price: 550,
			stock: 140,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Семена перца Калифорнийское чудо',
			description: 'Сладкий болгарский перец.',
			price: 980,
			stock: 85,
			categoryId: categoryRecords[0].id,
		},
		{
			name: 'Мотоблок Patriot Урал',
			description: 'Мощный мотоблок для обработки больших участков.',
			price: 315000,
			stock: 4,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Культиватор Hyundai T850',
			description: 'Бензиновый культиватор для рыхления почвы.',
			price: 210000,
			stock: 6,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Сеялка ручная Gardena',
			description: 'Удобная сеялка для овощных культур.',
			price: 18000,
			stock: 10,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Опрыскиватель аккумуляторный 16л',
			description: 'Автономный опрыскиватель для сада.',
			price: 28500,
			stock: 12,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Газонокосилка Makita ELM3320',
			description: 'Электрическая газонокосилка для дачи.',
			price: 96000,
			stock: 5,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Мини-трактор Xingtai 244',
			description: 'Компактный трактор для фермерских работ.',
			price: 3450000,
			stock: 1,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Измельчитель веток Bosch AXT',
			description: 'Садовый измельчитель древесины.',
			price: 175000,
			stock: 3,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Насос для воды Karcher BP3',
			description: 'Насос для систем полива.',
			price: 58000,
			stock: 8,
			categoryId: categoryRecords[1].id,
		},
		{
			name: 'Удобрение Аммофос 10кг',
			description: 'Минеральное удобрение для овощных культур.',
			price: 5400,
			stock: 60,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Селитра аммиачная 25кг',
			description: 'Азотное удобрение для повышения урожайности.',
			price: 8700,
			stock: 45,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Вермикомпост 20л',
			description: 'Органическое удобрение для всех видов растений.',
			price: 3600,
			stock: 55,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Биогумус АгроМир',
			description: 'Экологически чистое удобрение.',
			price: 2800,
			stock: 70,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Удобрение Fertika Люкс',
			description: 'Комплексное удобрение для овощей и цветов.',
			price: 2400,
			stock: 80,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Калий сернокислый 5кг',
			description: 'Калийное удобрение для плодовых культур.',
			price: 4100,
			stock: 35,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Суперфосфат гранулированный',
			description: 'Фосфорное удобрение для корневой системы.',
			price: 3200,
			stock: 50,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Комплексное удобрение NPK 16-16-16',
			description: 'Универсальное удобрение.',
			price: 4600,
			stock: 65,
			categoryId: categoryRecords[2].id,
		},
		{
			name: 'Инсектицид Актара',
			description: 'Средство против вредителей овощных культур.',
			price: 2400,
			stock: 40,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Фунгицид Ридомил Голд',
			description: 'Защита растений от грибковых заболеваний.',
			price: 3500,
			stock: 35,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Гербицид Торнадо',
			description: 'Средство для борьбы с сорняками.',
			price: 2900,
			stock: 50,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Фитоспорин-М',
			description: 'Биопрепарат для профилактики заболеваний.',
			price: 1200,
			stock: 90,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Бордосская смесь',
			description: 'Средство для обработки плодовых деревьев.',
			price: 1500,
			stock: 70,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Инсектицид Кораген',
			description: 'Современное средство от насекомых.',
			price: 4800,
			stock: 25,
			categoryId: categoryRecords[3].id,
		},
		{
			name: 'Капельная лента 200м',
			description: 'Система капельного полива.',
			price: 8900,
			stock: 20,
			categoryId: categoryRecords[4].id,
		},
		{
			name: 'Шланг поливочный 30м',
			description: 'Армированный шланг для сада.',
			price: 7200,
			stock: 30,
			categoryId: categoryRecords[4].id,
		},
		{
			name: 'Дождеватель Gardena',
			description: 'Автоматический разбрызгиватель воды.',
			price: 12500,
			stock: 18,
			categoryId: categoryRecords[4].id,
		},
		{
			name: 'Опрыскиватель ручной 8л',
			description: 'Для обработки растений и полива.',
			price: 3900,
			stock: 45,
			categoryId: categoryRecords[4].id,
		},
		{
			name: 'Насос погружной для полива',
			description: 'Погружной насос для систем орошения.',
			price: 34000,
			stock: 9,
			categoryId: categoryRecords[4].id,
		},
		{
			name: 'Лопата штыковая Fiskars',
			description: 'Прочная садовая лопата.',
			price: 9800,
			stock: 40,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Грабли веерные',
			description: 'Инструмент для уборки листьев.',
			price: 3200,
			stock: 55,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Секатор Gardena Classic',
			description: 'Секатор для кустарников и деревьев.',
			price: 7600,
			stock: 35,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Тяпка садовая',
			description: 'Инструмент для рыхления почвы.',
			price: 2500,
			stock: 60,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Садовая тачка 90л',
			description: 'Тачка для перевозки грунта и удобрений.',
			price: 24000,
			stock: 7,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Топор туристический',
			description: 'Компактный топор для хозяйственных работ.',
			price: 8500,
			stock: 22,
			categoryId: categoryRecords[5].id,
		},
		{
			name: 'Теплица 3x4м',
			description: 'Поликарбонатная теплица.',
			price: 215000,
			stock: 3,
			categoryId: categoryRecords[6].id,
		},
		{
			name: 'Теплица 3x8м усиленная',
			description: 'Теплица для круглогодичного использования.',
			price: 385000,
			stock: 2,
			categoryId: categoryRecords[6].id,
		},
		{
			name: 'Агроволокно черное 60г/м²',
			description: 'Материал для мульчирования.',
			price: 3200,
			stock: 45,
			categoryId: categoryRecords[6].id,
		},
		{
			name: 'Пленка тепличная 120 мкм',
			description: 'Пленка для покрытия теплиц.',
			price: 8700,
			stock: 30,
			categoryId: categoryRecords[6].id,
		},
		{
			name: 'Затеняющая сетка 45%',
			description: 'Сетка для защиты растений от солнца.',
			price: 5400,
			stock: 28,
			categoryId: categoryRecords[6].id,
		},
		{
			name: 'Комбикорм для кур 25кг',
			description: 'Полноценный корм для птицы.',
			price: 8900,
			stock: 40,
			categoryId: categoryRecords[7].id,
		},
		{
			name: 'Поилка автоматическая для птицы',
			description: 'Автоматическая система подачи воды.',
			price: 3200,
			stock: 30,
			categoryId: categoryRecords[7].id,
		},
		{
			name: 'Кормушка для кроликов',
			description: 'Металлическая кормушка.',
			price: 2500,
			stock: 35,
			categoryId: categoryRecords[7].id,
		},
		{
			name: 'Сено прессованное 20кг',
			description: 'Корм для сельскохозяйственных животных.',
			price: 4200,
			stock: 50,
			categoryId: categoryRecords[7].id,
		},
		{
			name: 'Доильный аппарат АИД-2',
			description: 'Аппарат для доения коров.',
			price: 420000,
			stock: 1,
			categoryId: categoryRecords[7].id,
		},
	]

	for (const product of products) {
		await prisma.product.create({ data: product })
	}

	const hashedPassword = await bcrypt.hash('123456', 10)

	await prisma.user.upsert({
		where: { email: 'test@test.com' },
		update: {},
		create: {
			email: 'test@test.com',
			password: hashedPassword,
			name: 'Test User',
		},
	})

	console.log('Seed finished')
}

main()
	.catch(e => console.error(e))
	.finally(async () => await prisma.$disconnect())
