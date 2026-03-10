import { CheckoutData } from '@/shared/lib/validations/order'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import {
	Field,
	FieldContent,
	FieldLabel,
	FieldDescription,
} from '@/shared/ui/field'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { Control, Controller, FieldErrors } from 'react-hook-form'

interface PaymentSectionProps {
	control: Control<CheckoutData>
	errors: FieldErrors<CheckoutData>
}

const PaymentSection = ({ control, errors }: PaymentSectionProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Способ оплаты</CardTitle>
				<CardDescription>
					Пожалуйста, выберите способ оплаты для вашего заказа.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Controller
					name='paymentMethod'
					control={control}
					render={({ field }) => (
						<RadioGroup
							value={field.value}
							onValueChange={field.onChange}
							className='w-fit gap-6'
						>
							<Field orientation='horizontal'>
								<RadioGroupItem value='CASH' id='cash' />
								<FieldContent>
									<FieldLabel htmlFor='cash'>Наличными</FieldLabel>
									<FieldDescription>Оплатите при получении.</FieldDescription>
								</FieldContent>
							</Field>
							<Field orientation='horizontal'>
								<RadioGroupItem value='KASPI' id='kaspi' />
								<FieldContent>
									<FieldLabel htmlFor='kaspi'>Kaspi перевод</FieldLabel>
									<FieldDescription>Оплатите через Kaspi.</FieldDescription>
								</FieldContent>
							</Field>
							<Field orientation='horizontal'>
								<RadioGroupItem value='INVOICE' id='invoice' />
								<FieldContent>
									<FieldLabel htmlFor='invoice'>Безналичный расчёт</FieldLabel>
									<FieldDescription>
										Для юридических лиц. Выставим счёт после подтверждения.
									</FieldDescription>
								</FieldContent>
							</Field>
						</RadioGroup>
					)}
				/>
				{errors.paymentMethod && (
					<p className='text-red-500 text-sm'>{errors.paymentMethod.message}</p>
				)}
			</CardContent>
		</Card>
	)
}

export default PaymentSection
