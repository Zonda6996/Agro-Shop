import { CheckoutData } from '@/shared/lib/validations/order'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface ContactSectionProps {
	register: UseFormRegister<CheckoutData>
	errors: FieldErrors<CheckoutData>
}

const ContactSection = ({ errors, register }: ContactSectionProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Контактные данные</CardTitle>
				<CardDescription>
					Пожалуйста, введите свои контактные данные для оформления заказа.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FieldGroup>
					<Field>
						<FieldLabel>Имя</FieldLabel>
						<Input {...register('name')} placeholder='Иван' />
					</Field>
					{errors.name && (
						<p className='text-red-500 text-sm'>{errors.name.message}</p>
					)}
					<Field>
						<FieldLabel>Телефон</FieldLabel>
						<Input {...register('phone')} placeholder='7 (777) 123-45-67' />
					</Field>
					{errors.phone && (
						<p className='text-red-500 text-sm'>{errors.phone.message}</p>
					)}
				</FieldGroup>
			</CardContent>
		</Card>
	)
}

export default ContactSection
