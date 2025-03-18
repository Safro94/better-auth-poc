import { SignInForm } from './sign-in-form'

interface Props {
  searchParams?: Promise<Record<string, string>>
}

export default async function SignIn({ searchParams }: Props) {
  const urlSearchParams = new URLSearchParams(await searchParams)
  const callbackUrl = urlSearchParams.get('callbackUrl') as string

  return (
    <div className='flex items-center justify-center'>
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  )
}
