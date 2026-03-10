import { Container } from "@/widgets/container/container"
import CheckoutForm from "./components/CheckoutForm"
import OrderSummary from "./components/OrderSummary"

const CheckoutPage = () => {
	return (
		<Container>
			<h1 className='text-3xl font-bold mt-6 mb-8'>Оформление заказа</h1>
			<div className='grid lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2'>
					<CheckoutForm />
				</div>
				<div className='lg:col-span-1'>
					<OrderSummary />
				</div>
			</div>
		</Container>
	)
}

export default CheckoutPage
