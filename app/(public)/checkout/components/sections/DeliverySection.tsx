import { CheckoutData } from '@/shared/lib/validations/order'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldDescription,
} from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	useWatch,
} from 'react-hook-form'

interface DeliverySectionProps {
	register: UseFormRegister<CheckoutData>
	control: Control<CheckoutData>
	errors: FieldErrors<CheckoutData>
}

const DeliverySection = ({
	control,
	errors,
	register,
}: DeliverySectionProps) => {
	const deliveryMethod = useWatch({
		control,
		name: 'deliveryMethod',
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Способ доставки</CardTitle>
				<CardDescription>
					Пожалуйста, выберите способ доставки для вашего заказа.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Controller
					name='deliveryMethod'
					control={control}
					render={({ field }) => (
						<RadioGroup
							value={field.value}
							onValueChange={field.onChange}
							className='w-fit gap-6'
						>
							<Field orientation='horizontal'>
								<RadioGroupItem value='PICKUP' id='pickup' />
								<FieldContent>
									<FieldLabel htmlFor='pickup'>Самовывоз</FieldLabel>
									<FieldDescription>Можете забрать со склада.</FieldDescription>
								</FieldContent>
							</Field>
							<Field orientation='horizontal'>
								<RadioGroupItem value='DELIVERY' id='delivery' />
								<FieldContent>
									<FieldLabel htmlFor='delivery'>Доставка</FieldLabel>
									<FieldDescription>Доставим к вашему адресу.</FieldDescription>
								</FieldContent>
							</Field>
						</RadioGroup>
					)}
				/>
				{deliveryMethod === 'PICKUP' && (
					<div className='p-3 mt-6 bg-gray-50 rounded-xl text-sm'>
						<p className='font-medium'>Адрес склада:</p>
						<p className='text-gray-500'>г. Астана, ул. Складская, 15</p>
						<p className='text-gray-500'>Пн-Пт: 9:00 - 18:00</p>
					</div>
				)}
				{deliveryMethod === 'DELIVERY' && (
					<Field className='mt-6'>
						<FieldLabel>Адрес доставки</FieldLabel>
						<Input
							{...register('address')}
							placeholder='г. Астана, ул. Примерная, д. 1, подъезд 1'
						/>
						{errors.address && (
							<p className='text-red-500 text-xs'>{errors.address.message}</p>
						)}
					</Field>
				)}
			</CardContent>
		</Card>
	)
}

export default DeliverySection
