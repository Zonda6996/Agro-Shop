'use client'

import { deleteProductAction } from '@/shared/actions/admin/products'
import { Button } from '@/shared/ui/button'
import { useState } from 'react'

interface Props {
	id: number
}

export const DeleteProductButton = ({ id }: Props) => {
	const [isPending, setIsPending] = useState(false)

	const handleDelete = async () => {
		const confirmed = confirm('Удалить товар? Это действие нельзя отменить.')
		if (!confirmed) return

		setIsPending(true)
		await deleteProductAction(id)
		setIsPending(false)
	}

	return (
		<Button
			variant='destructive'
			size='sm'
			disabled={isPending}
			onClick={handleDelete}
		>
			{isPending ? 'Удаление...' : 'Удалить'}
		</Button>
	)
}
