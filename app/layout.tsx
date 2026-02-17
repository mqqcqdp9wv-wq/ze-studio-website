import { AnalyticsWrapper } from "../components/analytics";
import { Container } from "../components/container";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import "../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
      </head>
      <body>
        <ThemeProvider>
          <div>
            <Header />
            <main>
              {children}
            </main>
            <Footer />

          </div>
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
