'use client'

import { FC, FormEvent, useState } from 'react'
import { signUp } from '@/lib/auth-client'
import { Button, Input } from '@heroui/react'
import { useRouter } from 'next/navigation'

interface Props {
  callbackUrl?: string
}

//TODO: uncomment the credentials when the bug is fixed https://github.com/better-auth/better-auth/issues/1006
export const SignUpForm: FC<Props> = ({ callbackUrl }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    //TODO: check why the callbackUrl is not working or wait till BA fixes the bug https://github.com/better-auth/better-auth/issues/1006
    await signUp.email({
      email,
      password,
      name,
      callbackURL: callbackUrl || '/',
      fetchOptions: {
        onResponse: () => {
          setIsLoading(false)
        },
        onRequest: () => {
          setIsLoading(true)
        },
        onError: (context) => {
          console.log(context.error.message)
        },
        onSuccess: () => {
          //had to add this because callback url doesn't work, it does work in sign in
          router.push(callbackUrl || '/')
        },
      },
    })
  }

  return (
    <form className='space-y-2' onSubmit={handleSubmit}>
      <Input
        name='name'
        label='Full name'
        labelPlacement='outside'
        classNames={{
          input: 'border',
        }}
      />

      <Input
        name='email'
        type='email'
        label='Email'
        labelPlacement='outside'
        classNames={{
          input: 'border',
        }}
      />

      <Input
        name='password'
        label='Password'
        type='password'
        labelPlacement='outside'
        classNames={{
          input: 'border',
        }}
      />

      <Button
        type='submit'
        size='lg'
        className='border cursor-pointer'
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        Accept and join
      </Button>
    </form>
  )
}
