import { MOCK_STORAGE_KEY, USE_MOCK } from '@/mock';

const MOCK_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function readCookieValue(name: string): string | null {
   if (typeof document === 'undefined') {
      return null;
   }

   const cookieEntry = document.cookie
      .split('; ')
      .find(entry => entry.startsWith(`${name}=`));

   if (!cookieEntry) {
      return null;
   }

   return cookieEntry.slice(name.length + 1);
}

export function getClientMockEnabled(): boolean {
   if (typeof window === 'undefined') {
      return USE_MOCK;
   }

   const storedValue = window.localStorage.getItem(MOCK_STORAGE_KEY);

   if (storedValue !== null) {
      return storedValue === 'true';
   }

   const cookieValue = readCookieValue(MOCK_STORAGE_KEY);

   if (cookieValue !== null) {
      return cookieValue === 'true';
   }

   return USE_MOCK;
}

export function persistClientMockEnabled(enabled: boolean): void {
   if (typeof window === 'undefined') {
      return;
   }

   const serializedValue = String(enabled);

   window.localStorage.setItem(MOCK_STORAGE_KEY, serializedValue);
   // biome-ignore lint/suspicious/noDocumentCookie: o toggle precisa persistir um cookie legível no servidor para atualizar Server Components.
   document.cookie = `${MOCK_STORAGE_KEY}=${serializedValue}; Max-Age=${MOCK_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}
