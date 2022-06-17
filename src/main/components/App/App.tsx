import { ChakraProvider } from "@chakra-ui/react"
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

export function App() {
  return (
    <React.StrictMode>
      <Web3Provider>
        <ChakraProvider>
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
        </ChakraProvider>
      </Web3Provider>
    </React.StrictMode>
  )
}
