'use client'

import { HeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const useHref = (href: string) => process.env.BETTER_AUTH_URL + href

  return (
    <HeroUIProvider navigate={router.push} useHref={useHref}>
      {children}
    </HeroUIProvider>
  )
}
