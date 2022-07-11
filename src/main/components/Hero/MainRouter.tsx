import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Loading from "../Dojo/Loading"

const Dojo = React.lazy(() => import("../Dojo/Dojo"))
const RootView = React.lazy(() => import("../RootView/RootView"))
const Hero = React.lazy(() => import("./Hero"))

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/app" element={<Dojo />} />
          <Route path="/edit" element={<RootView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default MainRouter
