import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { useStores } from "../../../hooks/useStores"
import { Loop } from "../Streamer/Looper"

const Player = observer(() => {
  const {
    services: { streamer },
  } = useStores()

  const {
    active,
    playlist,
    loop,
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
      let progress = loop.begin / (streamer.audio?.getDuration() || loop.end)
      streamer.audio?.setState({ played: progress })
      streamer.audio?.seekTo(progress, "fraction")
      return
    }
    console.log("track ended")
    streamer.skip()
  }

  const handleDuration = (d: number) => {
    if (streamer.active) {
      streamer.active.duration = d
    }
  }

  const handleProgress = (p: {
    played: number
    loaded: number
    playedSeconds: number
    loadedSeconds: number
  }) => {
    let progress = p.playedSeconds
    console.log("progress", progress)

    const end = active ? active.sample.end : -1
    const begin = active ? active.sample.begin : 0
    const duration = active ? active?.duration : 1

    console.log("handle progress", { end, begin, duration })

    if (progress >= end) {
      if (setting === Loop.SAMPLE) {
        progress = begin / (duration || end)
      } else if (setting === Loop.ONE) {
        progress = 0
      }

      streamer.audio?.setState({ played: progress })
      streamer.audio?.seekTo(progress, "fraction")
    }

    streamer.active.sample.current = progress
  }

  const handleStart = () => {
    if (streamer.active && streamer.audio) {
      streamer.active.duration = streamer.audio.getDuration()

      const sample = { ...streamer.active.sample }
      sample.current = streamer.audio.getCurrentTime() || 0
      console.log("handle start", { sample })

      if (sample.end === -1) {
        sample.end = streamer.audio.getDuration() - 0.001
      }

      streamer.active.sample = { ...sample }
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
          onProgress={(p) => handleProgress(p)}
          onDuration={(d) => handleDuration(d)}
          onEnded={handleEnded}
          onReady={handleStart}
          onStart={handleStart}
        />
      )}
    </>
  )
})

export default Player
