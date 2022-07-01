import ReactPlayer from "react-player"
import { useStores } from "../../hooks/useStores"

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
