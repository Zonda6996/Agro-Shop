import { CartStore } from './cartStore'

export const selectItems = (state: CartStore) => state.items

export const selectTotalItems = (state: CartStore) =>
	state.items.reduce((acc, item) => acc + item.quantity, 0)

export const selectTotalPrice = (state: CartStore) =>
	state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

export const selectAddItem = (state: CartStore) => state.addItem

export const selectDeleteItem = (state: CartStore) => state.deleteItem

export const selectRemoveItem = (state: CartStore) => state.removeItem

export const selectClearCart = (state: CartStore) => state.clearCart
