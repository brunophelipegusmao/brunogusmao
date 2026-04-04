import type { Preview } from "@storybook/nextjs-vite";
import { Geist, Geist_Mono, Nunito_Sans, Roboto } from "next/font/google";
import { useLayoutEffect, type ReactNode } from "react";

import "../src/app/globals.css";

const robotoHeading = Roboto({
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rootThemeClassNames = [
  "dark",
  geistSans.variable,
  geistMono.variable,
  nunitoSans.variable,
  robotoHeading.variable,
] as const;

function StorybookRoot({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.classList.contains("dark");
    const previousColorScheme = root.style.colorScheme;
    const previousFontClasses = rootThemeClassNames.map((className) =>
      root.classList.contains(className),
    );

    root.classList.add(...rootThemeClassNames);
    root.style.colorScheme = "dark";

    return () => {
      if (!previousTheme) {
        root.classList.remove("dark");
      }

      root.style.colorScheme = previousColorScheme;

      rootThemeClassNames.forEach((className, index) => {
        if (!previousFontClasses[index]) {
          root.classList.remove(className);
        }
      });
    };
  }, []);

  return <>{children}</>;
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <StorybookRoot>
        <Story />
      </StorybookRoot>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: {},
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
