import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { useStores } from "../../hooks/useStores"
import {
  BreadCrumb,
  DojoCSS,
  InterfaceContainer,
  LogoDiv,
  SideBarContainer,
  SidePanel,
  SubHeader,
} from "./DojoCSS"
import LiveStreamer from "./LiveStreamer"
import Loading from "./Loading"
import { MainePane } from "./MainePane"
import { SearchBar } from "./SearchBar"

// import LiveStreamer from "./LiveStreamer"
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
    services: {
      streamer: { isPlaying },
    },
  } = useStores()

  useEffect(() => {}, [path, isPlaying])

  return (
    <>
      <DojoCSS />
      <LiveStreamer />
      <InterfaceContainer>
        <SideBarContainer>
          <LogoDiv>
            | BeatSuite |{" "}
            <BreadCrumb>
              <PTag>{path}</PTag>
            </BreadCrumb>
          </LogoDiv>

          <SubHeader />

          <SearchBar />

          <SideBar />

          <TrackPlayer trackName="Pure Heat" artistName="DCAT" />
        </SideBarContainer>
        <MainePane />
        <SidePanel></SidePanel>
      </InterfaceContainer>
    </>
  )
})

export default Dojo
