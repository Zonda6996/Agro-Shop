export const FEATURED_DISCOUNT = 0.25

export const getFinalPrice = (price: number, isFeatured: boolean) =>
	isFeatured ? Math.round(price * (1 - FEATURED_DISCOUNT)) : price
