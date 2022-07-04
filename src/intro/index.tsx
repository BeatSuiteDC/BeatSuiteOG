import { configure } from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import Hero from "../main/components/Hero/Hero"
import Web3Provider from "../main/Web3/Web3Provider"

configure({
  enforceActions: "never",
})

function App() {
  return (
    <React.StrictMode>
      <Web3Provider>
        {/* <ChakraProvider>
        <StoreContext.Provider value={new RootStore()}>
          <ThemeContext.Provider value={defaultTheme}>
            <MuiThemeProvider>
              <EmotionThemeProvider>
                <GlobalCSS /> */}
        <Hero />
        {/* </EmotionThemeProvider>
            </MuiThemeProvider>
          </ThemeContext.Provider>
        </StoreContext.Provider>
      </ChakraProvider> */}
      </Web3Provider>
    </React.StrictMode>
  )
}

function renderApp() {
  console.log("starting render main")
  ReactDOM.render(<App />, document.querySelector("#root"))
}

renderApp()
