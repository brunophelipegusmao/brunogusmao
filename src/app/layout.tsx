import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Nunito_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Container from "@/components/container";
import MobileDock from "@/components/mobile/mobile-dock";

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

export const metadata: Metadata = {
  title: {
    default: "Bruno Gusmão | Web Desenvolvedor Full Stack",
    template: "%s | Bruno Gusmão",
  },
  description:
    "Portfólio profissional de Bruno Gusmão, com foco em desenvolvimento web full stack, interfaces responsivas e comunicação clara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={cn(
        "h-full dark",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        nunitoSans.variable,
        robotoHeading.variable,
      )}
      style={{ colorScheme: "dark" }}
    >
      <body className="relative isolate flex min-h-[100svh] flex-col overflow-x-hidden bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const root = document.documentElement;
                const storedTheme = localStorage.getItem("theme");
                const isDark = storedTheme !== "light";

                root.classList.toggle("dark", isDark);
                root.style.colorScheme = isDark ? "dark" : "light";
              } catch (error) {
                document.documentElement.classList.add("dark");
              }
            })();
          `}
        </Script>
        {/* Fundo da aplicacao em camadas fixas para tirar a pagina da leitura plana sem competir com o Hero. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className={cn("absolute inset-0", "app-background")} />
          <div className={cn("absolute inset-0 opacity-[0.18]", "app-background-grid")} />
          <div
            className={cn(
              "absolute left-[-12rem] top-[8vh] h-[18rem] w-[18rem] rounded-full blur-3xl",
              "sm:h-[22rem] sm:w-[22rem]",
              "bg-[radial-gradient(circle,var(--page-glow-primary),transparent_72%)]",
            )}
          />
          <div
            className={cn(
              "absolute right-[-14rem] top-[18vh] h-[20rem] w-[20rem] rounded-full blur-3xl",
              "sm:h-[24rem] sm:w-[24rem]",
              "bg-[radial-gradient(circle,var(--page-glow-secondary),transparent_74%)]",
            )}
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-[-18rem] h-[18rem] blur-3xl",
              "sm:h-[22rem]",
              "bg-[radial-gradient(circle_at_bottom,var(--page-glow-accent),transparent_70%)]",
            )}
          />
        </div>

        <Container className="relative z-10">
          <Header />
          {children}
        </Container>

        <MobileDock />
      </body>
    </html>
  );
}
