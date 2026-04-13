declare module '@/fetch/fetch.js' {
  export function $fetch(url: string, method: string, body?: any): Promise<any>
}
