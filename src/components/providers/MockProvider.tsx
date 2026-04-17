'use client';

import { useRouter } from 'next/navigation';
import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react';

import { Switch } from '@/components/ui/switch';
import { persistClientMockEnabled } from '@/lib/api/mock-state.client';
import { cn } from '@/lib/utils';
import { MOCK_STORAGE_KEY, USE_MOCK } from '@/mock';

interface MockContextValue {
   isMockEnabled: boolean;
   isReady: boolean;
   setMockEnabled: (enabled: boolean) => void;
}

interface MockProviderProps {
   children: React.ReactNode;
}

const MockContext = createContext<MockContextValue | null>(null);

export function MockProvider({ children }: MockProviderProps) {
   const router = useRouter();
   const [isMockEnabled, setIsMockEnabled] = useState(USE_MOCK);
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      setIsReady(true);

      const storedValue = window.localStorage.getItem(MOCK_STORAGE_KEY);

      if (storedValue === null) {
         persistClientMockEnabled(USE_MOCK);
         return;
      }

      const nextValue = storedValue === 'true';

      setIsMockEnabled(nextValue);
      persistClientMockEnabled(nextValue);
   }, []);

   const handleSetMockEnabled = useCallback(
      (enabled: boolean) => {
         setIsMockEnabled(enabled);
         persistClientMockEnabled(enabled);
         router.refresh();
      },
      [router],
   );

   const value = useMemo<MockContextValue>(
      () => ({
         isMockEnabled,
         isReady,
         setMockEnabled: handleSetMockEnabled,
      }),
      [handleSetMockEnabled, isMockEnabled, isReady],
   );

   return (
      <MockContext.Provider value={value}>
         {children}
         <MockDevToggle />
      </MockContext.Provider>
   );
}

export function useMock() {
   const context = useContext(MockContext);

   if (!context) {
      throw new Error('useMock must be used within MockProvider.');
   }

   return context;
}

function MockDevToggle() {
   const { isMockEnabled, isReady, setMockEnabled } = useMock();

   if (process.env.NODE_ENV !== 'development') {
      return null;
   }

   return (
      <div className='fixed bottom-4 left-4 z-50'>
         <div
            className={cn(
               'flex items-center gap-3 border border-border-strong bg-bg/90 px-3 py-2 backdrop-blur-sm',
               'shadow-[0_10px_30px_rgba(12,20,38,0.18)]',
            )}
         >
            <div className='space-y-0.5'>
               <p className='font-mono text-[10px] uppercase tracking-[0.16em] text-blue-base'>
                  Dev data
               </p>
               <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted'>
                  {isReady && isMockEnabled ? 'mock on' : 'mock off'}
               </p>
            </div>

            <Switch
               aria-label='Alternar uso de dados mock'
               checked={isMockEnabled}
               disabled={!isReady}
               onCheckedChange={setMockEnabled}
               size='sm'
            />
         </div>
      </div>
   );
}
