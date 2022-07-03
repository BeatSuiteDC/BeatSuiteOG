import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"
import dashboard from "../../images/dashboard.png"
import TimePatrol from "./Audio/TimePatrol"
import {
  BackgroundImage,
  DojoCSS,
  InterfaceContainer,
  LogoDiv,
  SideBarContainer,
  SidePanel,
} from "./DojoCSS"
import Loading from "./Loading"
import { MainePane } from "./MainePane"

import { TrackPlayer } from "./TrackPlayer/TrackPlayer"
import { PTag } from "./TrackPlayer/TrackPlayerCSS"
// import Socials from "./Socials"

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
      {/* {path === "/app" && <Hero />} */}
      {/* {path === "/home" && <PianoRollEditor />} */}
      {/* {path === "/tempo" && <TempoEditor />} */}
      {!isPlaying && <Loading />}
    </>
  )
})

const Dojo = observer(() => {
  const {
    router: { path },
  } = useStores()

  return (
    <>
      <DojoCSS />
      <BackgroundImage src={dashboard} />
      <InterfaceContainer>
        <SideBarContainer>
          <LogoDiv>
            | BeatSuite | <PTag>{path}</PTag>
          </LogoDiv>

          {/* <SideBar /> */}

          <TrackPlayer />
        </SideBarContainer>

        <MainePane />

        <SidePanel>
          <TimePatrol />
        </SidePanel>
      </InterfaceContainer>
    </>
  )
})

export default Dojo
