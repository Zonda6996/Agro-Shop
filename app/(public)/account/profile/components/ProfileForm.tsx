'use client'

import { updateProfileAction } from '@/shared/actions/profile'
import {
	UpdateProfileData,
	updateProfileSchema,
} from '@/shared/lib/validations/profile'
import { Button } from '@/shared/ui/button'
import { FieldGroup, Field, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ProfileFormProps {
	name: string
	email: string
}

const ProfileForm = ({ email, name }: ProfileFormProps) => {
	const [serverError, setServerError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UpdateProfileData>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: { name },
	})

	const onSubmit = async (data: UpdateProfileData) => {
		setServerError(null)
		setSuccess(false)

		const result = await updateProfileAction(data)

		if (result.error) {
			setServerError(result.error)
			return
		}

		if (result.success) {
			setSuccess(true)
			router.refresh()
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<FieldGroup>
				<Field>
					<FieldLabel>Имя</FieldLabel>
					<Input {...register('name')} placeholder='Иван' />
					{errors.name && (
						<p className='text-red-500 text-sm'>{errors.name.message}</p>
					)}
				</Field>
				<Field>
					<FieldLabel>Email</FieldLabel>
					<Input value={email} disabled />
				</Field>
			</FieldGroup>

			<div className='text-sm min-h-5'>
				{serverError && <p className='text-red-500'>{serverError}</p>}
				{success && <p className='text-green-600'>Профиль успешно обновлён!</p>}
			</div>

			<Button className='w-full sm:w-auto' type='submit' disabled={isSubmitting}>
				{isSubmitting && <Spinner />}
				Сохранить
			</Button>
		</form>
	)
}

export default ProfileForm
