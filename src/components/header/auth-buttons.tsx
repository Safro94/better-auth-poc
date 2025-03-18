'use client'

import { authClient } from '@/lib/auth-client'
import { Button, Skeleton } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const DesktopAuthButtons = () => {
  const { data, isPending } = authClient.useSession()

  if (!data?.session && isPending) {
    return (
      <Button variant='faded'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='rounded-full w-6 h-6' />
      </Button>
    )
  }

  return <>{data?.session ? <UserAvatarDropdown /> : <SignButtons />}</>
}

export const UserAvatarDropdown = () => {
  const { data } = authClient.useSession()
  const router = useRouter()

  return (
    <>
      {data?.session && (
        <>
          <span>{data.user.name}</span>

          <Button
            key='signout'
            className='cursor-pointer'
            onPress={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess() {
                    router.push('/')
                  },
                  onError(context) {
                    console.log(context.error.message)
                  },
                },
              })
            }}
          >
            Sign Out
          </Button>
        </>
      )}
    </>
  )
}

export const SignButtons = () => (
  <>
    <Button as={Link} href='/sign-in' size='md' className='bg-green-200'>
      Log in
    </Button>

    <Button as={Link} href='/sign-up' size='md' className='bg-green-200'>
      Sign up
    </Button>
  </>
)
