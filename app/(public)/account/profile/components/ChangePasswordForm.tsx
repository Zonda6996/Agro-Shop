'use client'

import { changePasswordAction } from '@/shared/actions/password'
import {
	ChangePasswordData,
	changePasswordSchema,
} from '@/shared/lib/validations/password'
import { Button } from '@/shared/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ChangePasswordForm = () => {
	const [serverError, setServerError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ChangePasswordData>({
		resolver: zodResolver(changePasswordSchema),
	})

	const onSubmit = async (data: ChangePasswordData) => {
		setServerError(null)
		setSuccess(false)

		const result = await changePasswordAction(data)

		if (result.error) {
			setServerError(result.error)
			return
		}

		setSuccess(true)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
			<FieldGroup>
				<Field>
					<FieldLabel>Текущий пароль</FieldLabel>
					<Input {...register('currentPassword')} type='password' />
					{errors.currentPassword && (
						<p className='text-red-500 text-sm'>
							{errors.currentPassword.message}
						</p>
					)}
				</Field>
				<Field>
					<FieldLabel>Новый пароль</FieldLabel>
					<Input {...register('newPassword')} type='password' />
					{errors.newPassword && (
						<p className='text-red-500 text-sm'>{errors.newPassword.message}</p>
					)}
				</Field>
				<Field>
					<FieldLabel>Подтвердить пароль</FieldLabel>
					<Input {...register('confirmPassword')} type='password' />
					{errors.confirmPassword && (
						<p className='text-red-500 text-sm'>
							{errors.confirmPassword.message}
						</p>
					)}
				</Field>
			</FieldGroup>

			<div className='text-sm min-h-5'>
				{serverError && <span className='text-red-500'>{serverError}</span>}
				{success && (
					<span className='text-green-600'>Пароль успешно изменён!</span>
				)}
			</div>

			<Button
				type='submit'
				className='w-full sm:w-auto'
				disabled={isSubmitting}
			>
				{isSubmitting && <Spinner />}
				Изменить пароль
			</Button>
		</form>
	)
}

export default ChangePasswordForm
