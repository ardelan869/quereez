import { getCurrentWindow } from '@tauri-apps/api/window';

import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { MinusIcon, SquareIcon, XIcon } from '@phosphor-icons/react';

export default function TitleBar() {
  const handleAction = useCallback(async (action: 'minimize' | 'maximize' | 'close') => {
    const appWindow = getCurrentWindow();

    if (!(action in appWindow)) {
      return;
    }

    await appWindow[action]();
  }, []);

  return (
    <section
      data-tauri-drag-region
      className="bg-accent sticky top-0 flex w-full items-center pl-3"
    >
      <h1 className="pointer-events-none mr-auto">Quereez</h1>
      <Button
        variant="default"
        className="border-0"
        onClick={handleAction.bind(null, 'minimize')}
      >
        <MinusIcon />
      </Button>
      <Button
        variant="secondary"
        className="border-0"
        onClick={handleAction.bind(null, 'maximize')}
      >
        <SquareIcon />
      </Button>
      <Button
        variant="destructive"
        className="border-0"
        onClick={handleAction.bind(null, 'close')}
      >
        <XIcon />
      </Button>
    </section>
  );
}
