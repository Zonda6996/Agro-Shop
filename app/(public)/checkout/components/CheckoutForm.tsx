'use client'

import { createOrderAction } from '@/shared/actions/order'
import { ROUTES } from '@/shared/lib/routes'
import { formatPrice } from '@/shared/lib/utils'
import { CheckoutData, checkoutSchema } from '@/shared/lib/validations/order'
import { useCartStore } from '@/shared/store/cartStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	selectClearCart,
	selectItems,
	selectTotalPrice,
} from '@/shared/store/cartSelectors'

import { Button } from '@/shared/ui/button'
import ContactSection from './sections/ContactSection'
import DeliverySection from './sections/DeliverySection'
import PaymentSection from './sections/PaymentSection'
import { Spinner } from '@/shared/ui/spinner'

const CheckoutForm = () => {
	const router = useRouter()
	const items = useCartStore(selectItems)
	const total = useCartStore(selectTotalPrice)
	const clearCart = useCartStore(selectClearCart)
	const [serverError, setServerError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<CheckoutData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			deliveryMethod: 'PICKUP',
			paymentMethod: 'CASH',
		},
	})

	const onSubmit = async (data: CheckoutData) => {
		setServerError(null)

		const result = await createOrderAction(data, items)

		if (result.error) {
			setServerError(result.error)
			return
		}

		clearCart()
		router.push(ROUTES.ORDER(result.orderId!))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
			<ContactSection register={register} errors={errors} />
			<DeliverySection register={register} control={control} errors={errors} />
			<PaymentSection control={control} errors={errors} />

			{serverError && (
				<p className='text-red-500 text-sm text-center'>{serverError}</p>
			)}

			<Button>
				{isSubmitting && <Spinner />}
				Оформить заказ - {formatPrice(total)} ₸
			</Button>
		</form>
	)
}

export default CheckoutForm
