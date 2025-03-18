import { DesktopAuthButtons } from './auth-buttons'

export const Header = () => {
  return (
    <header className='h-20 flex gap-4 p-6 justify-end'>
      <DesktopAuthButtons />
    </header>
  )
}
