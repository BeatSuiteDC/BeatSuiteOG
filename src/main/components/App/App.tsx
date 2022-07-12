import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import { defaultTheme } from "../../../common/theme/Theme"
import { StoreContext } from "../../hooks/useStores"
import { ThemeContext } from "../../hooks/useTheme"
import RootStore from "../../stores/RootStore"
import Web3Provider from "../../Web3/Web3Provider"
import MainRouter from "../Hero/MainRouter"
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
