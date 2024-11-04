'use client';
import Cookie from 'js-cookie';
import React from 'react';
import { Moon, Sun } from 'react-feather';


import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import styles from '../Header/Header.module.css';

export function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Update the state variable.
    // This causes the Sun/Moon icon to flip.
    setTheme(nextTheme);

    // Write the cookie for future visits
    Cookie.set('theme', nextTheme, {
      expires: 1000,
    });

    // Apply the new colors to the root HTML tag.
    const COLORS =
      nextTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute(
      'data-color-theme',
      nextTheme
    );

    Object.entries(COLORS).forEach(([key, value]) => {
      root.style.setProperty(`${key}`, value);
    })
    // ✂️ Repeat for all colors
  }

  return (
    <button
      className={styles.action}
      onClick={handleClick}
    >
      {theme === 'light' ? (
        <Sun size="1.5rem" />
      ) : (
        <Moon size="1.5rem" />
      )}
    </button>
  );
}
