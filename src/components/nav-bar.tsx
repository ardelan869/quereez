import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { HouseIcon } from '@phosphor-icons/react';

function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'text-border hover:bg-border hover:text-foreground grid h-full w-10 place-items-center transition-colors',
        className
      )}
      {...props}
    />
  );
}

const __placeholder_currentPage = 'Home';
const __placeholder_pages = [
  { name: 'Home', icon: HouseIcon },
  { name: 'About', icon: HouseIcon },
  { name: 'Contact', icon: HouseIcon }
];

export default function NavBar() {
  const handleClick = useCallback((name: string) => {
    console.log('clicked', name);
  }, []);

  return (
    <nav className="group fixed bottom-0 left-1/2 grid -translate-x-1/2 place-items-center p-3">
      <div className="bg-foreground/30 absolute top-12 h-16 w-12 blur-3xl transition-all duration-300 group-hover:w-56" />
      <div className="flex h-10 translate-y-8 items-center overflow-hidden rounded-full border backdrop-blur-sm transition-transform group-hover:translate-y-0">
        {__placeholder_pages.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            className={cn(
              name === __placeholder_currentPage && 'bg-border text-foreground'
            )}
            onClick={handleClick.bind(null, name)}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </nav>
  );
}
