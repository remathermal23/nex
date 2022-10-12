import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { LoginOperation } from '@vercel/commerce/types/login'
import type { NextResponse } from 'next/server'
import { Provider, SwellConfig } from '..'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: Partial<SwellConfig>
    res: NextResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<SwellConfig>
      res: NextResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    variables,
    res: response,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    res: NextResponse
    config?: Partial<SwellConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch('account', 'login', [variables])

    return {
      result: data,
    }
  }

  return login
}
