import { useAuthStore } from '../stores/authStore.ts'
import { notify } from '@/services/notify.ts'
import { router } from '@/router'


async function handleResponse(response: Response) {
  if (response.status >= 200 && response.status < 400) {
    try {
      return await response.json()
    } catch (err) {
      return true
    }
  } else if (response.status >= 400 && response.status <= 500) {
    const data = await response.json()
    const message = []

    if (data?.message) {
      notify(data?.message, 'error')
    }
    return { data, error: true }
  } else {
    alert('Server error')
  }
}
export async function $fetch(
  path: String,
  method = 'get',
  body: Record<string, string> | FormData | null = null,
) {
  const url = new URL('http://127.0.0.1:8000/api' + path)

  const auth = useAuthStore()
  const headers = {
    Authorization: `Bearer ${auth.token}`,
    Accept: 'application/json',
  }
  if ((!body || method === 'get') && !(body instanceof FormData)) {
    url.search = new URLSearchParams(body ?? {}).toString()

    return await handleResponse(await fetch(url, { method, headers }))
  }
  // @ts-ignore
  return await handleResponse(await fetch(url, { method, body, headers }))
}
