import { TOKEN_URL } from './constants'
import {
  TAPIResponseError,
  TAPIResponseErrorRaw,
  TAPIResponseSuccess,
} from 'services/types/data'

export const checkResponse = <T extends TAPIResponseSuccess>(
  response: Response,
): Promise<T | TAPIResponseError> =>
  response.ok
    ? response.json()
    : response.status === 401 && response.url !== TOKEN_URL.href
    ? Promise.reject(response)
    : response.json().then(
        (error: TAPIResponseErrorRaw): TAPIResponseError => ({
          ...error,
          success: false,
        }),
      )

export const checkResponseSuccess = <T extends TAPIResponseSuccess>(
  data: T | TAPIResponseError,
): Promise<T> => (data?.success ? Promise.resolve(data) : Promise.reject(data))

export const composeHeaders = (): HeadersInit => {
  const token = getCookie('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(
  name: string,
  value: string | null,
  props?: { expires?: number },
): void {
  type TPropsWithExpirationDate = Omit<typeof props, 'expires'> & {
    expires: Date | null
  }
  type TSerializedProps = Omit<typeof props, 'expires'> & {
    expires: string
  }
  let propsWithExpirationDate: TPropsWithExpirationDate = {
    ...props,
    expires: null,
  }
  let serializedProps: TSerializedProps = { ...props, expires: '' }
  const exp = props?.expires
  let expDate: Date | null = null
  if (typeof exp === 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    propsWithExpirationDate.expires = d
    expDate = d
  }
  if (expDate && expDate.toUTCString) {
    serializedProps.expires = expDate.toUTCString()
  }
  value = encodeURIComponent(value ?? '')
  let updatedCookie: string = name + '=' + value
  updatedCookie += `;expires=${serializedProps.expires}`
  document.cookie = updatedCookie
}

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 })
}
