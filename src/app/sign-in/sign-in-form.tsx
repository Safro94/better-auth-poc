'use client'

import { signIn } from '@/lib/auth-client'
import { Button, Input } from '@heroui/react'
import { FC, FormEvent, useState } from 'react'

interface Props {
  callbackUrl: string
}

export const SignInForm: FC<Props> = ({ callbackUrl }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    await signIn.email({
      email,
      password,
      callbackURL: callbackUrl || '/',
      fetchOptions: {
        onResponse: () => {
          setIsLoading(false)
        },
        onRequest: () => {
          setIsLoading(true)
        },
        onError(context) {
          console.log(context.error.message)
        },
      },
    })
  }

  return (
    <form className='space-y-2' onSubmit={handleSubmit}>
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
        fullWidth
        type='submit'
        color='default'
        size='lg'
        className='border cursor-pointer'
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Sign in
      </Button>
    </form>
  )
}
