import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import React from "react"
import { defaultTheme } from "../../../common/theme/Theme"
import { StoreContext } from "../../hooks/useStores"
import { ThemeContext } from "../../hooks/useTheme"
import RootStore from "../../stores/RootStore"
import MainRouter from "../Hero/MainRouter"
import Web3Provider from "../Hero/Web3Provider"
import { GlobalKeyboardShortcut } from "../KeyboardShortcut/GlobalKeyboardShortcut"
import { EmotionThemeProvider } from "../Theme/EmotionThemeProvider"
import { GlobalCSS } from "../Theme/GlobalCSS"
import { MuiThemeProvider } from "../Theme/MuiThemeProvider"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.VERCEL_GIT_COMMIT_SHA,
  environment: process.env.VERCEL_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

export function App() {
  return (
    <React.StrictMode>
      <Web3Provider>
        <StoreContext.Provider value={new RootStore()}>
          <ThemeContext.Provider value={defaultTheme}>
            <MuiThemeProvider>
              <EmotionThemeProvider>
                <GlobalKeyboardShortcut />
                <GlobalCSS />
                <MainRouter />
              </EmotionThemeProvider>
            </MuiThemeProvider>
          </ThemeContext.Provider>
        </StoreContext.Provider>
      </Web3Provider>
    </React.StrictMode>
  )
}
