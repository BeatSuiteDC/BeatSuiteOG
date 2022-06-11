import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RootView } from "../RootView/RootView"
import { Hero } from "./Hero"

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/edit" element={<RootView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
