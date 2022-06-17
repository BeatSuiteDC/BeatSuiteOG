import styled from "@emotion/styled"
import { Input } from "@mui/material"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"
import {
  BreadCrumb,
  DojoCSS,
  InterfaceContainer,
  LogoDiv,
  SearchBar,
  SideBarContainer,
  SidePanel,
  SubHeader,
} from "./DojoCSS"
import Loading from "./Loading"
import { MainContainer } from "./MainContainer"

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

  const PathContainer = styled.div`
    position: absolute;
    top: 18%;
    left: 18%;
    z-index: -199;
    height: 60%;
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `

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

const Dojo = () => {
  const {
    router: { path },
  } = useStores()

  return (
    <>
      <DojoCSS />
      {/* <LiveStreamer /> */}
      <InterfaceContainer>
        <SideBarContainer>
          <LogoDiv>
            | BeatSuite |{" "}
            <BreadCrumb>
              <PTag>{path}</PTag>
            </BreadCrumb>
          </LogoDiv>

          <SubHeader />
          <SearchBar placeholder="Search">
            <Input type="text" placeholder="Search.." />
          </SearchBar>

          <SideBar />
          <TrackPlayer trackName="Pure Heat" artistName="DCAT" />
        </SideBarContainer>
        <MainContainer />
        <SidePanel></SidePanel>
      </InterfaceContainer>
      {/* <InterfaceContainer>
      //   <SideBarContainer>
      //     <Socials />
      //   </SideBarContainer>

      //   <PlayerPanel />

      //   <SidePanel>
      //     <Layout />
      //   </SidePanel>

      //   <Routes />
      // </InterfaceContainer>  */}
    </>
  )
}

export default Dojo
