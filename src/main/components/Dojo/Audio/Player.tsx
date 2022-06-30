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
  const handleStart = () => {
    streamer.position = streamer.audio?.getCurrentTime() || 0
    const loop = streamer.loop
    streamer.loop = {
      ...loop,
      end: streamer.audio?.getDuration() || loop.end,
      begin: loop.begin || 0,
    }
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
            onDuration={(d) => (streamer.loop = { ...streamer.loop, end: d })}
            onProgress={(p) => (streamer.position = p.playedSeconds)}
            onReady={() => console.log("onReady")}
            onStart={handleStart}
          />
        </>
      )}
    </div>
  )
})

export default Player
