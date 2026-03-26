import '@/styles/index.css';

import { useEffect } from 'react';

import TitleBar from '@/components/title-bar';
import NavBar from '@/components/nav-bar';

function App() {
  useEffect(() => {
    function toggleDarkMode(isDark: boolean) {
      document.documentElement.classList.toggle('dark', isDark);
    }

    function eventListener(event: MediaQueryListEvent) {
      toggleDarkMode(event.matches);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', eventListener);

    toggleDarkMode(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', eventListener);
    };
  }, []);

  return (
    <main id="app" className="bg-background">
      <TitleBar />

      <NavBar />
    </main>
  );
}

export default App;
