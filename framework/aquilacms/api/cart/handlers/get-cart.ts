import type { AquilacmsCart } from '../../../types'
import { AquilacmsApiError } from '../../utils/errors'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CartHandlers } from '..'

// Return current cart info
const getCart: CartHandlers['getCart'] = async ({
  res,
  body: { cartId },
  config,
}) => {
  let result: { data?: AquilacmsCart } = {}

  if (cartId) {
    try {
      result = await config.storeApiFetch(
        `/v3/carts/${cartId}?include=line_items.physical_items.options`
      )
    } catch (error) {
      if (error instanceof AquilacmsApiError && error.status === 404) {
        // Remove the cookie if it exists but the cart wasn't found
        res.setHeader('Set-Cookie', getCartCookie(config.cartCookie))
      } else {
        throw error
      }
    }
  }

  res.status(200).json({ data: result.data ?? null })
}

export default getCart
