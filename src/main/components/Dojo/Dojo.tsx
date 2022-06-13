import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"
import { useTheme } from "../../hooks/useTheme"
import { PlayerPanel } from "./Audio/AudioControls"
import { DojoCSS } from "./DojoCSS"
import Loading from "./Loading"
import SideBar from "./SideBar"
import Socials from "./Socials"

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
      {/* {path === "/app" && <Hero />} */}
      {/* {path === "/dojo" && <Dojo />} */}
      {/* {path === "/home" && <PianoRollEditor />} */}
      {/* {path === "/tempo" && <TempoEditor />} */}
      {!isPlaying && <Loading />}
    </>
  )
})

const Dojo = () => {
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
        <SideBarContainer>
          <LogoDiv>BeatSuite</LogoDiv>
          <SubHeader></SubHeader>
          <SideBar />
          <Socials />
        </SideBarContainer>
        <PlayerPanel />

        <SidePanel></SidePanel>
        <Routes />
      </InterfaceContainer>
    </>
  )
}

const extra = `
{/* <div className="radioContainer">
          <div className="logo">BeatSuite</div>
          {/* <div className="subHeading"></div> */}
          {/* side bar mapping from RadioStations */}
          <SideBar />
          <Socials />
        {/* Audio Controls */}
        <PlayerPanel />

        {/* <div className="unpauseScreen">
          <PauseImage />
          <p style={{ marginTop: "0rem" }}>Music Paused</p>
        </div> */}

        {/* <AdditionSettings youtube={youtubeChannal} radio={stationName} /> */}
        {/* <div className="videoContainer">
          <ReactPlayer
            className="vid"
            width="140%"
            height="140%"
            loop="true"
            playing={livestream}
            volume="mute"
            url={video}
          />
        </div> */}
        {/* <Routes /> */}
        {/* {loading && <Loading />} */}
        {/* <Footer>this is the main footer</Footer> */}
`

export default Dojo
