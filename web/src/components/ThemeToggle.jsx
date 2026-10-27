import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme.js';

/** Botón para cambiar entre modo claro y oscuro. */
export default function ThemeToggle({ className = 'icon-btn' }) {
  const [theme, toggle] = useTheme();
  const dark = theme === 'dark';
  const label = dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  return (
    <button type="button" className={className} onClick={toggle} aria-label={label} title={label}>
      {dark ? <Sun size={21} /> : <Moon size={21} />}
    </button>
  );
}
