import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Indica que o componente foi montado
  }, []);

  function isDark() {
    return theme === 'dark';
  }

  return (
    <button onClick={() => setTheme(isDark() ? 'light' : 'dark')}>
      {mounted && ( // Renderiza o botão somente após o componente ser montado
        <>
          {isDark() ? <Sun /> : <Moon />}
          <span className="sr-only">
            {isDark() ? 'Switch to light theme' : 'Switch to dark theme'}
          </span>
        </>
      )}
    </button>
  );
}
