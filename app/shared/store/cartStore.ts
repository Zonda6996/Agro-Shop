import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItemProps {
	id: number
	name: string
	price: number
	quantity: number
	image?: string | null
	stock: number
}

export type AddItemPayload = Omit<CartItemProps, 'quantity'>

export interface CartStore {
	items: CartItemProps[]
	addItem: (product: AddItemPayload) => void
	deleteItem: (id: number) => void
	removeItem: (id: number) => void
	updateQuantity: (id: number, quantity: number) => void
	clearCart: () => void
}

const cartSlice: StateCreator<CartStore> = set => ({
	items: [],

	addItem: product =>
		set(state => {
			const exists = state.items.find(i => i.id === product.id)
			if (exists) {
				return {
					items: state.items.map(i =>
						i.id === product.id
							? {
									...i,
									quantity: Math.min(i.quantity + 1, i.stock ?? Infinity),
								}
							: i,
					),
				}
			}
			return { items: [...state.items, { ...product, quantity: 1 }] }
		}),

	deleteItem: id =>
		set(state => ({
			items: state.items
				.map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
				.filter(i => i.quantity > 0),
		})),

	removeItem: id =>
		set(state => ({
			items: state.items.filter(i => i.id !== id),
		})),

	updateQuantity: (id, quantity) =>
		set(state => ({
			items: state.items.map(i =>
				i.id === id
					? {
							...i,
							quantity: Math.max(1, Math.min(quantity, i.stock ?? Infinity)),
						}
					: i,
			),
		})),

	clearCart: () => set({ items: [] }),
})

export const useCartStore = create<CartStore>()(
	persist(cartSlice, {
		name: 'cart',
		version: 2,
		migrate: () => ({ items: [] }),
		merge: (persisted, current) => {
			const items = ((persisted as CartStore)?.items ?? []).filter(
				i =>
					Number.isInteger(i.quantity) &&
					i.quantity > 0 &&
					Number.isFinite(i.price) &&
					i.price >= 0,
			)
			return { ...current, items }
		},
	}),
)
