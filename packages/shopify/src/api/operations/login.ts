import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LoginOperation } from '@vercel/commerce/types/login'
import type { ShopifyConfig, Provider } from '..'
import {
  customerAccessTokenCreateMutation,
  setCustomerToken,
  throwUserErrors,
} from '../../utils'
import { CustomerAccessTokenCreateMutation } from '../../../schema'
import type { NextResponse } from 'next/server'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>({
    query = customerAccessTokenCreateMutation,
    variables,
    config,
  }: {
    query?: string
    variables: T['variables']
    res: NextResponse
    config?: ShopifyConfig
  }): Promise<T['data']> {
    config = commerce.getConfig(config)

    const {
      data: { customerAccessTokenCreate },
    } = await config.fetch<CustomerAccessTokenCreateMutation>(query, {
      variables,
    })

    throwUserErrors(customerAccessTokenCreate?.customerUserErrors)

    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return {
      result: customerAccessToken?.accessToken,
    }
  }

  return login
}
