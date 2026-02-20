import {
	EquipmentIcon,
	FertilizersIcon,
	GreenhouseIcon,
	SeedIcon,
	FarmIcon,
	GardenToolsIcon,
	PlantsProtectionIcon,
	WateringIcon,
} from '@/shared/assets/icons/Icon'
import { CategoryCard } from './components/categoryCard'

export const Category = () => {
	return (
		<div className='mt-15'>
			<div className='text-center'>
				<h3 className='text-3xl font-bold '>Категории</h3>
				<h5 className='font-light'>
					Подберите нужные решения для вашего хозяйства
				</h5>
			</div>
			<div className='grid grid-cols-4 mt-8 gap-6'>
				<CategoryCard
					name='Семена'
					description='Высококачественные семена для стабильного урожая'
					icon={<SeedIcon className='text-primary' size={48} />}
				/>

				<CategoryCard
					name='Оборудование'
					description='Надёжная техника для эффективной работы в хозяйстве'
					icon={<EquipmentIcon className='text-primary' size={48} />}
				/>
				<CategoryCard
					name='Удобрения'
					description='Сбалансированное питание для роста и плодородия'
					icon={
						<FertilizersIcon
							className='text-primary'
							viewBox='0 0 20 21'
							size={48}
						/>
					}
				/>
				<CategoryCard
					name='Защита растений'
					description='Современные решения против болезней и вредителей'
					icon={
						<PlantsProtectionIcon
							className='text-primary'
							viewBox='0 0 20 21'
							size={48}
						/>
					}
				/>
				<CategoryCard
					name='Полив и орошение'
					description='Системы точного и экономного водоснабжения'
					icon={
						<WateringIcon
							className='text-primary'
							fill='transparent'
							viewBox='0 0 21 22'
							size={48}
						/>
					}
				/>
				<CategoryCard
					name='Садовые инструменты'
					description='Практичные инструменты для ухода за участком'
					icon={
						<GardenToolsIcon
							className='text-primary'
							fill='transparent'
							viewBox='0 0 19 19'
							size={48}
						/>
					}
				/>
				<CategoryCard
					name='Теплицы и укрывные материалы'
					description='Создание оптимального микроклимата для культур'
					icon={
						<GreenhouseIcon
							className='text-primary'
							viewBox='0 0 16 19'
							size={48}
						/>
					}
				/>
				<CategoryCard
					name='Товары для животноводства'
					description='Всё необходимое для содержания и ухода за животными'
					icon={<FarmIcon className='text-primary' size={48} />}
				/>
			</div>
		</div>
	)
}
