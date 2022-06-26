import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { useStores } from "../../../hooks/useStores"
import Album from "../Album/Album"
import Banner from "../Banner/Banner"
import Poster from "../Poster"
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

const Body: FC = observer(() => {
  const { router } = useStores()
  const path = router.path

  console.log({ path })
  return (
    <BodyContainer>
      {path === "home" && (
        <EffectsContainer>
          <EffectsH2>Effects</EffectsH2>
          <EffectsWrapper>
            {effects.map((e, i) => {
              return <Effect label={e}></Effect>
            })}
          </EffectsWrapper>
        </EffectsContainer>
      )}
      {path === "albums" && <Album />}
      {path == "bangers" && <Poster />}
    </BodyContainer>
  )
})

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
  return (
    <li>
      <a href={`#${title.toLowerCase()}`}>{title}</a>
    </li>
  )
}

const Pane: FC = () => {
  return (
    <>
      <MainCSS />
      <Container>
        <Banner />
        {/* <Poster /> */}
        <Body />
        {/* <TransportPlayer /> */}
      </Container>
    </>
  )
}

export default Pane
