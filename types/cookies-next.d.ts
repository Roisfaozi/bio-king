declare module 'cookies-next' {
  export function getCookie(name: string, options?: any): string | undefined;
  export function setCookie(name: string, value: string, options?: any): void;
  export function deleteCookie(name: string, options?: any): void;
  export function hasCookie(name: string, options?: any): boolean;
}
