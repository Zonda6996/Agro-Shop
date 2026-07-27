import prisma from '@/shared/lib/prisma'

const images: Record<string, string> = {
	'Агроволокно белое 2x10м': '/images/products/agrovolokno-beloe-2x10m.webp',
	'Капельная лента 100м': '/images/products/kapelnaya-lenta-100m.webp',
	'Корм для кур 10кг': '/images/products/korm-dlya-kur-10kg.webp',
	'Мотоблок "Лидер 7HP"': '/images/products/motoblok-lider-7hp.webp',
	'Поилка для кроликов 2л': '/images/products/poilka-krolikov-2l.webp',
	'Семена арбуза Астраханский':
		'/images/products/semena-arbuza-astrakhanskiy.webp',
	'Семена капусты Амагер': '/images/products/semena-kapusty-amager.webp',
	'Семена кукурузы сахарной': '/images/products/semena-kukuruzy-saharnoy.webp',
	'Семена огурца "Кустовой"': '/images/products/semena-ogurtsa-kustovoy.webp',
	'Семена огурца Герман F1': '/images/products/semena-ogurtsa-german-f1.webp',
	'Семена перца Калифорнийское чудо':
		'/images/products/semena-pertsa-californiyskoye-chudo.webp',
	'Семена редиса Французский завтрак':
		'/images/products/semena-redisa-french-breakfast.webp',
	'Семена томата "Черри"': '/images/products/semena-tomata-cherry.webp',
	'Сеялка ручная': '/images/products/seyalka-ruchnaya.webp',
	'Теплица 3x6м': '/images/products/teplitsa-3x6.webp',
}

async function main() {
	for (const [name, image] of Object.entries(images)) {
		const res = await prisma.product.updateMany({
			where: { name },
			data: { image },
		})
		console.log(res.count ? `OK: ${name}` : `НЕ НАЙДЕН: ${name}`)
	}
	await prisma.$disconnect()
}

main()
