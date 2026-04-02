'use client'

import { updateProductAction } from '@/shared/actions/admin/products'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useActionState } from 'react'

interface Props {
	product: {
		id: number
		name: string
		description: string | null
		price: number
		stock: number
		categoryId: number
		isFeatured: boolean
	}
	categories: { id: number; name: string }[]
}

export const EditProductForm = ({ product, categories }: Props) => {
	const updateAction = updateProductAction.bind(null, product.id)
	const [state, action, isPending] = useActionState(updateAction, null)

	return (
		<form
			action={action}
			className='bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4'
		>
			{state?.error && <p className='text-red-500 text-sm'>{state.error}</p>}

			<div className='flex flex-col gap-1'>
				<label className='text-sm font-medium'>Название</label>
				<Input name='name' defaultValue={product.name} required />
			</div>

			<div className='flex flex-col gap-1'>
				<label className='text-sm font-medium'>Описание</label>
				<textarea
					name='description'
					defaultValue={product.description ?? ''}
					className='border rounded-md px-3 py-2 text-sm min-h-24 resize-none outline-none focus:ring-2 focus:ring-primary/50'
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div className='flex flex-col gap-1'>
					<label className='text-sm font-medium'>Цена (₸)</label>
					<Input
						name='price'
						type='number'
						defaultValue={Number(product.price)}
						required
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label className='text-sm font-medium'>Остаток (шт.)</label>
					<Input
						name='stock'
						type='number'
						defaultValue={product.stock}
						required
					/>
				</div>
			</div>

			<div className='flex flex-col gap-1'>
				<label className='text-sm font-medium'>Категория</label>
				<select
					name='categoryId'
					defaultValue={product.categoryId}
					className='border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50'
				>
					{categories.map(cat => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>

			<div className='flex items-center gap-2'>
				<input
					name='isFeatured'
					type='checkbox'
					id='isFeatured'
					value='true'
					defaultChecked={product.isFeatured}
				/>
				<label htmlFor='isFeatured' className='text-sm font-medium'>
					Товар со скидкой 25%
				</label>
			</div>

			<Button type='submit' disabled={isPending}>
				{isPending ? 'Сохранение...' : 'Сохранить изменения'}
			</Button>
		</form>
	)
}
