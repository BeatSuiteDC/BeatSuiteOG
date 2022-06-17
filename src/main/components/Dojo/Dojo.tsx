import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"
import { useTheme } from "../../hooks/useTheme"
import { PlayerPanel } from "./Audio/AudioControls"
import { DojoCSS } from "./DojoCSS"
import Featured from "./Featured/Featured"
import SideBar from "./SideBar"
import Socials from "./Socials"
import Layout from "./WalletLayout/Layout"

const Routes: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const {
    router: { path },
    services: {
      streamer: { isPlaying },
    },
  } = useStores()

  const Container = styled.div`
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
      <Container>{path === "/home" && <Featured />}</Container>
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
  const theme = useTheme()

  const InterfaceContainer = styled.div`
    width: 98%;
    height: 97vh;
    display: flex;
    margin-left: 30px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  `
  const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 15vw;
    align-content: flex-end;
    padding-
  `
  const LogoDiv = styled.div`
    width: 250%;
    height: 10%;
    text-align: center;
    font-size: 32px;
    color: white;
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 7px;
    transform: scale(1, 0.9);
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    z-index: 1;
  `
  const SubHeader = styled.div`
    width: 99%;
    height: 7%;
    text-align: center;
    font-size: 20px;
    color: white;
    margin-bottom: 2rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 7px;
    transform: scale(1, 0.9);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    text-decoration-line: underline;
  `

  const SidePanel = styled.div`
    height: 100%;
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-left: 11rem;
    z-index: 1;
  `

  return (
    <>
      <DojoCSS />
      <InterfaceContainer>
        {/* <LiveStreamer /> */}
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
      </InterfaceContainer>
    </>
  )
}

export default Dojo
