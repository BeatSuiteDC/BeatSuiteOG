import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { useStores } from "../../hooks/useStores"
import { LIVESTREAM_URL } from "./Streamer/Streamer"

const LiveStreamer = observer(() => {
  const rootStore = useStores()
  const {
    services: { streamer },
  } = rootStore

  const { isPlaying, volume } = streamer

  return (
    <div className="videoContainer">
      <ReactPlayer
        className="vid"
        width="140%"
        height="140%"
        loop={true}
        playing={true}
        volume={isPlaying ? 0 : volume.level}
        url={LIVESTREAM_URL}
      />
    </div>
  )
})

export default LiveStreamer
