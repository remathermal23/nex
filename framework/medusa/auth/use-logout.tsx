import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import { useCallback } from 'react'
import Cookies from 'js-cookie'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: 'auth',
    method: 'logout',
  },
  async fetcher({ options, fetch }) {
    await fetch({ ...options })

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(
        async function logout(input) {
          const data = await fetch({ input })
          return data
        },
        [fetch]
      )
    },
}