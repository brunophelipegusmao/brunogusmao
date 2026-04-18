import "server-only";

import { cookies } from "next/headers";

import { MOCK_STORAGE_KEY, USE_MOCK } from "@/mock";

export async function getServerMockEnabled(): Promise<boolean> {
  const cookieStore = await cookies();
  const storedValue = cookieStore.get(MOCK_STORAGE_KEY)?.value;

  if (storedValue === undefined) {
    return USE_MOCK;
  }

  return storedValue === "true";
}
