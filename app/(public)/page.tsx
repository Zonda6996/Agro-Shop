import { About } from '@/widgets/about/about'
import { Category } from '@/widgets/category/category'
import { Container } from '@/widgets/container/container'
import { Hero } from '@/widgets/hero/hero'
import { Partners } from '@/widgets/partners/partners'

export default async function Home() {
	return (
		<div>
			<Container>
				<Hero />
				<Category />
				<About />
				<Partners />
			</Container>
		</div>
	)
}
