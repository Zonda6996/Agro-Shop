import prisma from '@/shared/lib/prisma'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditProductForm } from './components/EditProductForm'

interface Props {
	params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
	const { id } = await params

	const [product, categories] = await Promise.all([
		prisma.product.findUnique({ where: { id: Number(id) } }),
		prisma.category.findMany(),
	])

	if (!product) return notFound()

	const serializedProduct = {
		...product,
		price: Number(product.price), 
	}

	return (
		<div className='max-w-2xl'>
			<div className='flex items-center gap-4 mb-8'>
				<Link href='/admin/products'>
					<Button variant='outline'>← Назад</Button>
				</Link>
				<h1 className='text-2xl font-bold'>Редактирование товара</h1>
			</div>
			<EditProductForm product={serializedProduct} categories={categories} />
		</div>
	)
}
