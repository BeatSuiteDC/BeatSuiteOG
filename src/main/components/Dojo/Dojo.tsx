import { useStores } from "../../hooks/useStores"
import { DojoCSS } from "./DojoCSS"
import Loading from "./Loading"
import PauseImage from "./PauseImage"
import SideBar from "./SideBar"
// import { SideBar } from "./SideBar/"

const Dojo = () => {
  console.log("Dojo opened")
  const { router } = useStores()

  return (
    <div>
      <DojoCSS />
      <div className="interfaceContainer">
        <div className="radioContainer">
          <div className="logo">BeatSuite</div>
          <div className="subHeading"></div>
          {/* side bar mapping from RadioStations */}
          <SideBar />
          {/* Socials */}
        </div>
        {/* Audio Controls */}
        <div className="unpauseScreen">
          <PauseImage />
          <p style={{ marginTop: "0rem" }}>Music Paused</p>
        </div>
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

        <Loading />
      </div>
    </div>
  )
}

export default Dojo
