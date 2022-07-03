import styled from "@emotion/styled"
import ReactPlayer from "react-player"
import { useStores } from "../../hooks/useStores"

export const BackgroundImage = styled.img`
  background-size: cover;
  filter: blur(10px);
  width: 100%;
  height: 100vh;
  z-index: -10;
  position: absolute;
`

const LiveStreamer = () => {
  const rootStore = useStores()
  const {
    services: { streamer },
  } = rootStore

  const { isPlaying, volume, livestreamUrl } = streamer

  return (
    <div className="videoContainer">
      <ReactPlayer
        className="vid"
        width="140%"
        height="140%"
        loop={true}
        playing={true}
        volume={isPlaying ? 0 : volume}
        url={livestreamUrl}
      />
    </div>
  )
}

export default LiveStreamer
