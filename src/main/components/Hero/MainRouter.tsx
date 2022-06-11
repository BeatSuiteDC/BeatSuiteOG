import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useStores } from "../../hooks/useStores"
import Dojo from "../Dojo/Dojo"
import { RootView } from "../RootView/RootView"

import { Hero } from "./Hero"

const MainRouter = () => {
  const { router, user } = useStores()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dojo" element={<Dojo />} />
        <Route path="/edit" element={<RootView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter
