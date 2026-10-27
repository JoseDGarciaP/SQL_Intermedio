import { useEffect, useState } from 'react';

const KEY = 'sqli-theme';
const BAR = { light: '#0564B1', dark: '#0A2654' };

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function storedTheme() {
  try {
    const t = localStorage.getItem(KEY);
    if (t === 'light' || t === 'dark') return t;
  } catch { /* sin almacenamiento */ }
  return null;
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', BAR[theme]);
}

let current = storedTheme() || (typeof window !== 'undefined' ? systemTheme() : 'light');
const subs = new Set();

export function setTheme(theme) {
  current = theme;
  applyTheme(theme);
  try { localStorage.setItem(KEY, theme); } catch { /* sin almacenamiento */ }
  subs.forEach((fn) => fn(theme));
}

/** Tema actual; si la persona no ha elegido, sigue el del sistema. */
export function useTheme() {
  const [theme, set] = useState(current);
  useEffect(() => {
    subs.add(set);
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onSystem = () => {
      if (!storedTheme()) { current = systemTheme(); applyTheme(current); subs.forEach((fn) => fn(current)); }
    };
    mq?.addEventListener?.('change', onSystem);
    return () => { subs.delete(set); mq?.removeEventListener?.('change', onSystem); };
  }, []);
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')];
}
