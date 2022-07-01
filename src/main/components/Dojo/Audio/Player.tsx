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
            muted={streamer.isMuted}
            url={streamer.active?.src}
            playing={streamer.isPlaying}
            volume={streamer.volume.level}
            ref={(e) => (streamer.audio = e)}
            onProgress={(p) => (streamer.position = p.playedSeconds)}
            onDuration={(d) => (streamer.loop = { ...streamer.loop, end: d })}
            onEnded={handleEnded}
            onReady={handleStart}
            onStart={handleStart}
          />
        </>
      )}
    </div>
  )
})

export default Player
