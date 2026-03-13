import { Button } from './button'

interface QuantityStepperProps {
	quantity: number
	onIncrease: () => void
	onDecrease: () => void
	size?: 'sm' | 'lg'
}

export const QuantityStepper = ({
	quantity,
	onIncrease,
	onDecrease,
	size = 'sm',
}: QuantityStepperProps) => {
	const isLarge = size === 'lg'

	return (
		<div
			className={`flex items-center gap-2 ${isLarge ? 'w-full' : 'justify-center'}`}
		>
			<Button
				onClick={onDecrease}
				variant='outline'
				size={isLarge ? 'default' : 'xs'}
			>
				−
			</Button>
			<span
				className={`bg-gray-200/70 rounded-md text-center min-w-8 ${isLarge ? 'py-2 px-4 text-base' : 'py-1 px-3 text-sm'}`}
			>
				{quantity}
			</span>
			<Button
				onClick={onIncrease}
				variant='outline'
				size={isLarge ? 'default' : 'xs'}
			>
				+
			</Button>
		</div>
	)
}
