export const ROUTES = {
	HOME: '/',
	PRODUCTS: '/products',
	PRODUCT: (id: number) => `/products/${id}`,
	CART: '/cart',
	CHECKOUT: '/checkout',
	LOGIN: '/login',
	REGISTER: '/register',
	ACCOUNT: '/account',
	ORDER: (id: number) => `/orders/${id}`,
	ACCOUNT_ORDERS: '/account/orders',
	ACCOUNT_PROFILE: '/account/profile',
	ACCOUNT_FAVORITES: '/account/favorites'
}
