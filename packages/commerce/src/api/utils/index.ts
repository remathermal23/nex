import type { NextApiRequest } from 'next'
import type { ZodSchema } from 'zod'
import type { APIResponse } from './types'

import { NextRequest } from 'next/server'

/**
 * Parses the output data of the API handler and returns a valid APIResponse
 * or throws an error if the data is invalid.
 * @param res  APIResponse
 * @param parser ZodSchema
 */
export const parse = <T>(res: APIResponse<T>, parser: ZodSchema) => {
  if (res.data) {
    res.data = parser.parse(res.data)
  }
  return res
}

/**
 * Returns the body of the request as a JSON object.
 * @param req NextRequest
 */
export const getInput = (req: NextRequest) => req.json().catch(() => ({}))

/**
 * Convert NextApiRequest to NextRequest
 * @param req NextApiRequest
 * @param path string
 */
export const transformRequest = (req: NextApiRequest, path: string) => {
  let body
  const headers = new Headers()

  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    headers.append(req.rawHeaders[i], req.rawHeaders[i + 1])
  }

  if (
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE'
  ) {
    body = JSON.stringify(req.body)
  }

  return new NextRequest(`https://${req.headers.host}/api/commerce/${path}`, {
    headers,
    method: req.method,
    body,
  })
}

export const transformHeaders = (
  headers?: Record<string, string | number | string[]>
) =>
  headers
    ? Object.entries(headers).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => acc.append(key, v))
        } else {
          acc.append(key, `${value}`)
        }
        return acc
      }, new Headers())
    : new Headers()
