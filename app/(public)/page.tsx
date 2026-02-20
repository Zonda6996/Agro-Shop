import { Category } from '@/widgets/category/category'
import { Container } from '@/widgets/container/container'
import { Hero } from '@/widgets/hero/hero'
import { Stats } from '@/widgets/stats/stats'

export default async function Home() {
	return (
		<div>
			<Container>
				<Hero />
				<Stats />
				<Category />
			</Container>
		</div>
	)
}
