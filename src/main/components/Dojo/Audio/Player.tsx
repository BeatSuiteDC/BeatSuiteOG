import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { useStores } from "../../../hooks/useStores"

const Player = observer(() => {
  const {
    services: { streamer },
  } = useStores()

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
          />
        </>
      )}
    </div>
  )
})

function onAudioProgress(audioInfo: any) {
  // console.log('audio progress', audioInfo)
}

// audio reload handle
function onAudioReload(audioInfo: any) {
  console.log("audio reload:", audioInfo)
}

// audio load failed error handle
function onAudioError(
  errMsg: any,
  currentPlayId: any,
  audioLists: any,
  audioInfo: any
) {
  console.error("audio error", errMsg, currentPlayId, audioLists, audioInfo)
}

// theme change handle
// onThemeChange(theme) {
//   console.log('theme change:', theme)
// },

function onAudioListsChange(
  currentPlayId: any,
  audioLists: any,
  audioInfo: any
) {
  console.log("audio lists change:", currentPlayId, audioLists, audioInfo)
}

function onAudioPlayTrackChange(
  currentPlayId: any,
  audioLists: any,
  audioInfo: any
) {
  console.log("audio play track change:", currentPlayId, audioLists, audioInfo)
}

export default Player
