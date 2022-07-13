// import styled from "@emotion/styled"
import { FC, useState } from "react"
import ReactPlayer from "react-player"
import logo from "../../images/logo.png"
import Loading from "../Dojo/Loading"
import ConnectWallet from "./ConnecBtn"
import { HeroCSS } from "./HeroCSS"

const url = "https://www.youtube.com/watch?v=_ITiwPMUzho"

const shortened =
  "https://beatsuite.infura-ipfs.io/ipfs/Qmaquyg5GrnsWDsxCxZ5zfzyEDfekLJAu7LoLT1BYF7vgg"
const Hero: FC<React.PropsWithChildren<unknown>> = () => {
  const [ready, setReady] = useState(false)

  return (
    <div>
      <HeroCSS />
      <div className="heroContainer">
        <div className="videoContainer2">
          <ReactPlayer
            className="react-player"
            url={shortened}
            width="100%"
            height="100%"
            position="relative"
            overflow="hidden"
            playing={true}
            loop={true}
            onStart={() => setReady(true)}
          />
        </div>
      </div>
      {ready ? (
        <div className="titleContainer">
          <img className="heroLogo" src={logo} alt="" />
          <h1 className="tracking-in-expand-fwd">BeatSuite</h1>
          <h3 className="subTitle">Lets make it happen!</h3>
          <div className="note-position-1 note-amination">&#9835;</div>
          <div className="note-position-2 note-amination animation-delay-2">
            &#9833;
          </div>
          <div className="bubbleContainer">
            <div className="bubble1"></div>
            <div className="bubble2"></div>
            <div className="bubble3"></div>
          </div>
          <div className="wrap">
            <ConnectWallet />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Hero
