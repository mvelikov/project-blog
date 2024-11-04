import clsx from 'clsx';
import {
  Spline_Sans_Mono,
  Work_Sans,
} from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import { cookies } from 'next/headers';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedTheme = cookies().get('theme');
  const theme = savedTheme?.value || 'light';

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header theme={theme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
