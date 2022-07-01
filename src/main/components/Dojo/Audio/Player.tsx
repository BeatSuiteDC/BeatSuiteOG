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
    const loop = streamer.loop
    streamer.loop = {
      ...loop,
      current: streamer.audio?.getCurrentTime() || 0,
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
            volume={streamer.volume}
            ref={(e) => (streamer.audio = e)}
            onProgress={(p) =>
              (streamer.loop = { ...streamer.loop, current: p.playedSeconds })
            }
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
