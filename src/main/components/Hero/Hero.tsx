import ReactPlayer from "react-player"
// import logo from "../../images/logo.jpeg";
import { HeroCSS } from "./HeroCSS"

// import { Link } from "react-router-dom"

export const Hero = () => {
  return (
    <div>
      <HeroCSS />
      <div className="dojoContainer">
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
        {/* <div class="note-position-1 note-amination">&#9835;</div> */}
        {/* <div class="note-position-2 note-amination animation-delay-2"> */}
        {/* &#9833; */}
        {/* </div> */}
        <div className="bubbleContainer">
          <div className="bubble1"></div>
          <div className="bubble2"></div>
          <div className="bubble3"></div>
        </div>
        <div className="wrap">
          {/* <Link to="/music"> */}
          <button className="button">Connect Wallet</button>
          {/* </Link> */}
        </div>
      </div>
      <ReactPlayer
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
      />
    </div>
  )
}
