// import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"
import logo from "../../images/logo.png"
import ConnectWallet from "./ConnecBtn"
import { HeroCSS } from "./HeroCSS"

export const Hero: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const { user } = useStores()

  return (
    <div>
      {user.isConnected && <Navigate to="/dojo" />}
      <HeroCSS />
      <div className="heroContainer">
        <div className="videoContainer2">
          {/* <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=1h0toNIaYRI"
            width="100%"
            height="100%"
            position="relative"
            overflow="hidden"
            playing={true}
            loop={true}
            muted={true}
          /> */}
        </div>
      </div>
      <div className="titleContainer">
        <img className="heroLogo" src={logo} alt="" />
        <h1 className="tracking-in-expand-fwd">BeatSuite</h1>
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
          <ConnectWallet />
        </div>
      </div>
    </div>
  )
})
