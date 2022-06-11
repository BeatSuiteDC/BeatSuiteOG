import { configure } from "mobx"
import ReactDOM from "react-dom"
import { localized } from "../common/localize/localizedString"
import { Hero } from "../main/components/Hero/Hero"

configure({
  enforceActions: "never",
})

function renderApp() {
  console.log("starting render")
  ReactDOM.render(<Hero />, document.querySelector("#root"))
}

window.onbeforeunload = (e: BeforeUnloadEvent) => {
  e.returnValue = localized(
    "confirm-close",
    "Your edits have not been saved. Be sure to download it before exiting. Do you really want to close it?"
  )
}

renderApp()
