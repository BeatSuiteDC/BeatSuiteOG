import ReactPlayer from "react-player/lazy"
import { useStores } from "../../../hooks/useStores"
import { Loop } from "../Streamer/Looper"

type Progress = {
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}

const Player = () => {
  const rootStore = useStores()
  const streamer = rootStore.services.streamer

  const {
    active,
    playlist,
    _loop: { setting },
  } = streamer

  const handleEnded = () => {
    console.log("ended", { setting })
    if (setting === Loop.ALL) {
      if (active === undefined || playlist.indexOf(active) >= playlist.length) {
        streamer.active = playlist[0]
        return
      }
    }
    if (setting === Loop.ONE) {
      streamer.previous()
      return
    }
    if (setting === Loop.SAMPLE) {
      const { begin } = active.sample
      const progress = begin / active.duration || 0
      streamer.currentTick = progress
      return
    }
    console.log("track ended")
    streamer.skip()
  }

  const handleDuration = (d: number) => {
    console.log("handle-duration", d)
    if (streamer.active) {
      streamer.active.duration = d
    }
  }

  const handleProgress = (e: Progress) => {
    let progress = streamer.position()
    console.log("handle-progress", progress)

    const end = active ? active.sample.end : 0.99999
    const begin = active ? active.sample.begin : 0.00001
    const duration = active ? active.duration : 1

    console.log("handle progress", { end, begin, duration })

    if (progress >= end) {
      if (setting === Loop.SAMPLE) {
        progress = begin / (duration || end)
      } else if (setting === Loop.ONE) {
        progress = 0
      }
    }

    streamer.currentTick = progress
  }

  const handleReady = (player: ReactPlayer) => {
    streamer.audio = player
    streamer.audio.getInternalPlayer()
    if (streamer.active) {
      console.log("ready...")
      // streamer.currentTick = player.getCurrentTime()
      streamer.active.duration = player.getDuration()

      let { end } = streamer.active.sample

      if (end === -1) {
        end = player.getDuration() - 0.00001
      }

      streamer.active.sample.end = end
    }
  }

  const handleStart = () => {
    console.log("starting...")
    if (streamer.active && streamer.audio) {
      // streamer.position = streamer.audio.getCurrentTime()
      streamer.active.duration = streamer.audio.getDuration()
    }
  }

  return (
    <>
      {streamer.canPlay() && (
        <ReactPlayer
          style={{ display: "none" }}
          muted={streamer.isMuted}
          url={streamer.active?.src}
          playing={streamer.isPlaying}
          volume={streamer.volume}
          loop={streamer.loop.enabled}
          ref={(e) => (streamer.audio = e)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onReady={handleReady}
          onStart={handleStart}
        />
      )}
    </>
  )
}

export default Player
