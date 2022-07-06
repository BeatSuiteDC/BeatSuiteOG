import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { useStores } from "../../../hooks/useStores"
import { Loop } from "../Streamer/Looper"

const BackgroundImage = styled.img`
  background-size: cover;
  filter: blur(10px);
  width: 100%;
  height: 100vh;
  z-index: -10;
  position: absolute;
`

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
    if (setting === Loop.SAMPLE) {
      console.log("duration", { setting })
      return
    }

    streamer.loop.end = d
  }

  const handleProgress = (p: {
    played: number
    playedSeconds: number
    loaded: number
    loadedSeconds: number
  }) => {
    let progress = p.playedSeconds

    if (progress >= loop.end) {
      if (setting === Loop.SAMPLE) {
        progress = loop.begin / (streamer.audio?.getDuration() || loop.end)
      }
      streamer.audio?.setState({ played: progress })
      streamer.audio?.seekTo(progress, "fraction")
    }
    streamer.loop.current = progress
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
