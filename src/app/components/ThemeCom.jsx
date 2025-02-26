






'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


// когда страница загрузится чтобы React знал какая тема, светлая или темная, чтобы все применилось
export default function ThemeCom({ children }) {
  const { theme, setTheme } = useTheme();

  // чтобы убедиться что страница загрузилась/mounted и только тогда theme поменять
  const [mounted, setMounted] = useState(false);

  // useEffect() говорит, когда страница загрузилась/mounted полностью то установи setMounted() в true
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen'>
        {children}
      </div>
    </div>
  );
}