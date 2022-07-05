import { configure } from "mobx"
import { createRoot } from "react-dom/client"

import { localized } from "../common/localize/localizedString"
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

window.onbeforeunload = (e: BeforeUnloadEvent) => {
  e.returnValue = localized(
    "confirm-close",
    "Your edits have not been saved. Be sure to download it before exiting. Do you really want to close it?"
  )
}

renderApp()
