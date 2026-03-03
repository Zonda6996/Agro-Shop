import { Button } from './button'

interface QuantityStepperProps {
	quantity: number
	onIncrease: () => void
	onDecrease: () => void
}

export const QuantityStepper = ({
	quantity,
	onIncrease,
	onDecrease,
}: QuantityStepperProps) => {
	return (
		<div className='flex items-center justify-center gap-2'>
			<Button onClick={onDecrease} variant='outline' size='xs'>
				−
			</Button>
			<span className='bg-gray-200/70 py-1 px-3 rounded-md text-sm min-w-8 text-center'>
				{quantity}
			</span>
			<Button onClick={onIncrease} variant='outline' size='xs'>
				+
			</Button>
		</div>
	)
}
