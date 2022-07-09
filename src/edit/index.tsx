import { ThemeContext } from "@emotion/react"
import { configure } from "mobx"
import React from "react"
import { createRoot } from "react-dom/client"
import { defaultTheme } from "../common/theme/Theme"
import { GlobalKeyboardShortcut } from "../main/components/KeyboardShortcut/GlobalKeyboardShortcut"
import RootView from "../main/components/RootView/RootView"
import { EmotionThemeProvider } from "../main/components/Theme/EmotionThemeProvider"
import { GlobalCSS } from "../main/components/Theme/GlobalCSS"
import { MuiThemeProvider } from "../main/components/Theme/MuiThemeProvider"
import { StoreContext } from "../main/hooks/useStores"
import RootStore from "../main/stores/RootStore"
import Web3Provider from "../main/Web3/Web3Provider"

import { localized } from "../common/localize/localizedString"

function App() {
  return (
    <React.StrictMode>
      <Web3Provider>
        <StoreContext.Provider value={new RootStore()}>
          <ThemeContext.Provider value={defaultTheme}>
            <MuiThemeProvider>
              <EmotionThemeProvider>
                <GlobalKeyboardShortcut />
                <GlobalCSS />
                <RootView />
              </EmotionThemeProvider>
            </MuiThemeProvider>
          </ThemeContext.Provider>
        </StoreContext.Provider>
      </Web3Provider>
    </React.StrictMode>
  )
}

configure({
  enforceActions: "never",
})

function renderApp() {
  console.log("starting render main")
  const container = document.querySelector("#root")
  const root = createRoot(container!)
  root.render(<App />)
}

window.onbeforeunload = (e: BeforeUnloadEvent) => {
  e.returnValue = localized(
    "confirm-close",
    "Your edits have not been saved. Be sure to download it before exiting. Do you really want to close it?"
  )
}

renderApp()
