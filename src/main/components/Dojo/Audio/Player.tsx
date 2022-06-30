import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { useStores } from "../../../hooks/useStores"

const Player = observer(() => {
  const {
    services: { streamer },
  } = useStores()

  const handleEnded = () => {
    console.log("track ended")
    streamer.skip()
  }

  return (
    <div>
      {streamer.canPlay() && (
        <>
          <ReactPlayer
            style={{ display: "none" }}
            ref={(e) => (streamer.audio = e)}
            url={streamer.active?.src}
            volume={streamer.volume.level}
            muted={streamer.isMuted}
            playing={streamer.isPlaying}
            onEnded={handleEnded}
          />
        </>
      )}
    </div>
  )
})

export default Player
