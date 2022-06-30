import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"
import dashboard from "../../images/dashboard.png"
import TimePatrol from "./Audio/TimePatrol"
import {
  BackgroundImage,
  BreadCrumb,
  DojoCSS,
  InterfaceContainer,
  LogoDiv,
  SideBarContainer,
  SidePanel,
} from "./DojoCSS"
import Loading from "./Loading"
import { MainePane } from "./MainePane"
import { SearchBar } from "./SearchBar"

import SideBar from "./SideBar"
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
      {/* <LiveStreamer /> */}
      <BackgroundImage src={dashboard} />
      <InterfaceContainer>
        <SideBarContainer>
          <LogoDiv>
            | BeatSuite |{" "}
            <BreadCrumb>
              <PTag>{path}</PTag>
            </BreadCrumb>
          </LogoDiv>

          <SearchBar />

          <SideBar />

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
