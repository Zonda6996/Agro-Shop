import prisma from '@/shared/lib/prisma'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { ProductForm } from './components/ProductForm'

export default async function CreateProductPage() {
	const categories = await prisma.category.findMany()

	return (
		<div className='max-w-2xl'>
			<div className='flex items-center gap-4 mb-8'>
				<Link href='/admin/products'>
					<Button variant='outline'>← Назад</Button>
				</Link>
				<h1 className='text-2xl font-bold'>Новый товар</h1>
			</div>
			<ProductForm categories={categories} />
		</div>
	)
}
