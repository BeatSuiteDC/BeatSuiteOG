import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { useStores } from "../../../hooks/useStores"
import Banner from "../Banner/Banner"
import Poster from "../Poster"
import { Container, MainCSS } from "./CSS"

type BannerTab = {
  title: string
}

const Routes: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const {
    router: { path },
    services: {
      streamer: { isPlaying },
    },
  } = useStores()

  console.log({ isPlaying, path })
  return (
    <>
      <Poster />

      {/* <PathContainer>{path === "/home" && <Featured />}</PathContainer> */}
      {/* {path === "a" && <Hero />} */}
      {/* {path === "/home" && <PianoRollEditor />} */}
      {/* {path === "/tempo" && <TempoEditor />} */}
      {/* {!isPlaying && <Loading />} */}
    </>
  )
})

const TabComponent: FC<BannerTab> = ({ title }) => {
  const href = title.toLowerCase()
  return (
    <li>
      <a href={`#${href}`}>{title}</a>
    </li>
  )
}

const Pane: FC<React.PropsWithChildren<unknown>> = observer(() => {
  return (
    <>
      <MainCSS />
      <Container>
        <Banner />
        <Routes />
      </Container>
    </>
  )
})

export default Pane
