import ReactPlayer from "react-player"
import { useStores } from "../../hooks/useStores"

const LiveStreamer = () => {
  const rootStore = useStores()
  const {
    services: { streamer },
  } = rootStore

  const { liveStreamUrl, isPlaying, volume } = streamer
  const url = "Video-Background.mp4"
  return (
    <div className="videoContainer">
      <ReactPlayer
        className="vid"
        width="140%"
        height="140%"
        loop={true}
        playing={true}
        volume={0}
        url={url}
      />
    </div>
  )
}

export default LiveStreamer
