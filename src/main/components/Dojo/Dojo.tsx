import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"
// import { PlayerPanel } from "./Audio/AudioControls"
// import {
//   DojoCSS,
//   InterfaceContainer,
//   LogoDiv,
//   SideBarContainer,
//   SidePanel,
//   SubHeader,
// } from "./DojoCSS"
import Featured from "./Featured/Featured"
import LiveStreamer from "./LiveStreamer"
// import SideBar from "./SideBar"
// import Socials from "./Socials"
// import Layout from "./WalletLayout/Layout"

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
      <PathContainer>{path === "/home" && <Featured />}</PathContainer>
      {/* {path === "/app" && <Hero />} */}
      {/* {path === "/home" && <PianoRollEditor />} */}
      {/* {path === "/tempo" && <TempoEditor />} */}
      {/* {!isPlaying && <Loading />} */}
    </>
  )
})

const Dojo = () => {
  const {
    router: { path },
  } = useStores()

  return (
    <>
      <LiveStreamer />
      {/* <DojoCSS />
      <InterfaceContainer>
        <SideBarContainer>
          <LogoDiv>
            BeatSuite <>{path}</>
          </LogoDiv>
          <SubHeader />
          <SideBar />
          <Socials />
        </SideBarContainer>

        <PlayerPanel />

        <SidePanel>
          <Layout />
        </SidePanel>

        <Routes />
      </InterfaceContainer> */}
    </>
  )
}

export default Dojo
