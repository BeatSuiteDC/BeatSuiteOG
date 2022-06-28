import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { useStores } from "../../hooks/useStores"

const LiveStreamer = observer(() => {
  const rootStore = useStores()
  const {
    services: { streamer },
  } = rootStore

  const { isPlaying, volume } = streamer
  const url = "https://www.youtube.com/watch?v=_ITiwPMUzho"

  return (
    <div className="videoContainer">
      <ReactPlayer
        className="vid"
        width="140%"
        height="140%"
        loop={true}
        playing={true}
        volume={isPlaying ? 0 : volume.level}
        url={url}
      />
    </div>
  )
})

export default LiveStreamer
