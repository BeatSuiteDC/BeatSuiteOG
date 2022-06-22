import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { useStores } from "../../../hooks/useStores"
import Banner from "../Banner/Banner"
import { bears } from "../Featured/Featured"
import Poster from "../Poster"
import { Track } from "../Track"
import {
  BodyContainer,
  Container,
  Effectdiv,
  EffectsContainer,
  EffectsH2,
  EffectsWrapper,
  MainCSS,
} from "./CSS"

type BannerTab = {
  title: string
}

type EffectProps = {
  label: string
}

const Effect: FC<EffectProps> = ({ label }) => {
  return <Effectdiv>{label}</Effectdiv>
}

const effects = ["Wicked", "tough", "wild", "ultra"]

const Body: FC = () => {
  return (
    <BodyContainer>
      <EffectsContainer>
        <EffectsH2>Effects</EffectsH2>
        <EffectsWrapper>
          {effects.map((e, i) => {
            return <Effect label={e}></Effect>
          })}
        </EffectsWrapper>
      </EffectsContainer>
      <div
        className="tracks"
        style={{
          font: "bold",
          paddingRight: "2.75rem",
          width: "100%",
          position: "relative",
        }}
      >
        {bears.map((track, i) => {
          return <Track track={track} key={i} />
        })}
      </div>
    </BodyContainer>
  )
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
        <Poster />
        <Body />
      </Container>
    </>
  )
})

export default Pane
