import { configure } from "mobx"
import { createRoot } from "react-dom/client"

import { App } from "./components/App/App"

configure({
  enforceActions: "never",
})

function renderApp() {
  console.log("starting render main")
  const container = document.querySelector("#root")
  const root = createRoot(container!) // createRoot(container!) if you use TypeScript
  root.render(<App />)
}

renderApp()
