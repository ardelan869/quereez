import { cn } from '@/lib/utils'

import { useCallback } from 'react'

function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'grid h-full w-10 place-items-center text-border transition-colors hover:bg-border hover:text-foreground',
        className
      )}
      {...props}
    />
  )
}

export default function NavBar() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return (
    <nav className="group fixed bottom-0 left-1/2 grid -translate-x-1/2 place-items-center p-3">
      <div className="absolute top-12 h-16 w-12 bg-foreground/30 blur-3xl transition-all duration-300 group-hover:w-56" />
      <div className="flex h-10 translate-y-8 items-center overflow-hidden rounded-full border backdrop-blur-sm transition-transform group-hover:translate-y-0">
        <Button className={cn(true && 'bg-border text-foreground')} onClick={handleClick}>
          {/* <Icon className="h-5 w-5" /> */}
        </Button>
      </div>
    </nav>
  )
}
