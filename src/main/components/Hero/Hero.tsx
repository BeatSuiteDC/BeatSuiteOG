// import styled from "@emotion/styled"
import { FC } from "react"
import ReactPlayer from "react-player"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"
import ConnectWallet from "./ConnecBtn"
import { HeroCSS } from "./HeroCSS"

export const Hero: FC<React.PropsWithChildren<unknown>> = () => {
  const { user } = useStores()
  const USER = user.connector

  if (USER?.connected) {
    console.log("linking to dojo")
    return <Navigate to="/dojo" />
  }

  return (
    <div>
      <HeroCSS />
      <div className="heroContainer">
        <div className="videoContainer2">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=1h0toNIaYRI"
            width="100%"
            height="100%"
            position="relative"
            overflow="hidden"
            playing={true}
            loop={true}
            muted={true}
          />
        </div>
      </div>
      <div className="titleContainer">
        {/* <img className="dojoLogo" src={logo} alt="" /> */}
        <h1 className="tracking-in-expand-fwd">Beat Suite</h1>
        <h3 className="subTitle"> Lets make it happen! </h3>
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
          {/* <Link to="/music"> */}
          <ConnectWallet />
          {/* </Link> */}
        </div>
      </div>
      {/* <ReactPlayer
        className="react-player"
        url="https://www.youtube.com/embed/lf6refTxQs8?autoplay=1&mute=1&start=1"
        width="0%"
        height="0%"
        position="absolute"
        top="10000px"
        left="1000px"
        overflow="hidden"
        playing={true}
        loop={true}
      /> */}
    </div>
  )
}
