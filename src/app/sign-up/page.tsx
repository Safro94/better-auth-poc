import { SignUpForm } from './sign-up-form'

interface Props {
  searchParams?: Promise<Record<string, string>>
}

export default async function SignUp({ searchParams }: Props) {
  const urlSearchParams = new URLSearchParams(await searchParams)
  const callbackUrl = urlSearchParams.get('callbackUrl') as string

  return (
    <div className='flex items-center justify-center'>
      <SignUpForm callbackUrl={callbackUrl} />
    </div>
  )
}
