import { configure } from "mobx"
import React from "react"
import { createRoot } from "react-dom/client"
import Hero from "../main/components/Hero/Hero"
import Web3Provider from "../main/Web3/Web3Provider"

configure({
  enforceActions: "never",
})

function App() {
  return (
    <React.StrictMode>
      <Web3Provider>
        <Hero />
      </Web3Provider>
    </React.StrictMode>
  )
}

function renderApp() {
  console.log("starting render intro")
  const container = document.querySelector("#root")
  const root = createRoot(container!)
  root.render(<App />)
}

renderApp()
