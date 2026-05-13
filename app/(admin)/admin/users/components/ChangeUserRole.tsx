'use client'

import { updateUserRoleAction } from '@/shared/actions/admin/users'
import { useState } from 'react'

interface Props {
	id: number
	currentRole: string
}

export const ChangeUserRole = ({ id, currentRole }: Props) => {
	const [isPending, setIsPending] = useState(false)

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setIsPending(true)
		await updateUserRoleAction(id, e.target.value as 'USER' | 'ADMIN')
		setIsPending(false)
	}

	return (
		<select
			defaultValue={currentRole}
			onChange={handleChange}
			disabled={isPending}
			className='border rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50'
		>
			<option value='USER'>USER</option>
			<option value='ADMIN'>ADMIN</option>
		</select>
	)
}
