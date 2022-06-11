import { motion } from "framer-motion"
import { ReactNode } from "react"
import { DojoCSS } from "./DojoCSS"

type Page = {
  name: string
  link?: () => ReactNode
}

const Dojo = () => {
  const sidebarPages: Array<Page> = [
    {
      name: "page1",
      link: () => <>{console.log("page 1 clicked")}</>,
    },
  ]
  console.log("Dojo opened")
  return (
    <div>
      <DojoCSS />
      <div className="interfaceContainer">
        <div className="radioContainer">
          <div className="logo">BeatSuite</div>
          <div className="subHeading"></div>
          <div className="radioStationsContainer">
            {/* side bar mapping from RadioStations */}
            <div className="radioList">
              {sidebarPages.map((page, i, a) => {
                const delay = (i / sidebarPages.length) * 1.15
                return (
                  <div>
                    <motion.div
                      animate={{ opacity: [0, 1] }}
                      transition={{ delay: delay }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.09 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={page.link}
                        className="station"
                      >
                        {/* <img className="triangle" src={triangle} alt="" /> */}
                        {page.name}
                      </motion.div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="socialsContainer2">
            <div className="socials">
              {/* <motion.div
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.open("https://github.com/adamPatrick12")
                }}
                className="link"
              >
                <img className="githubLogo" src={github} alt="" />
                Github
              </motion.div> */}
            </div>
          </div>
        </div>
        {/* <div className="audioControlContainer">
          <AudioControls
            plauPause={handlePausePlaySwitch}
            buttonClass={BtnClass}
            playPauseImage={playPauseImg}
            buttonClass2={BtnClass2}
            LiveStreamAudio={currentLivestream}
            LiveStreamPlayPause={livestream}
          />
        </div> */}
        {/* <div className={pauseScreen}>
          <PauseImage />
          <p style={{ marginTop: "0rem" }}>Music Paused</p>
        </div> */}
        {/* <AdditionSettings youtube={youtubeChannal} radio={stationName} /> */}
        {/* <div class="videoContainer">
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

        {/* <Loading /> */}
      </div>
    </div>
  )
}

export default Dojo
