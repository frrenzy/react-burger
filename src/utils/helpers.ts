import { TOKEN_URL } from './constants'

export const checkResponse = (response: any) =>
  response.ok
    ? response.json()
    : response.status === 401 && response.url !== TOKEN_URL
    ? Promise.reject(response)
    : response.json().then((error: any) => error)

export const checkResponseSuccess = (data: any) =>
  data.success ? Promise.resolve(data) : Promise.reject(data)

export const composeHeaders = () => {
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
  props?: { expires: number | string } & Record<
    string,
    string | number | boolean
  >,
) {
  //@ts-ignore
  props = props || {}
  //@ts-ignore
  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    //@ts-ignore
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    //@ts-ignore
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value ?? '')
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 })
}
