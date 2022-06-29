import { observer } from "mobx-react-lite"
import ReactJkMusicPlayer from "react-jinke-music-player"
import { useStores } from "../../../hooks/useStores"

const Player = observer(() => {
  const {
    services: { streamer },
    playlist,
  } = useStores()

  return (
    <div>
      {streamer.canPlay() && (
        <ReactJkMusicPlayer
          style={{ display: "none" }}
          getAudioInstance={(instance) => {
            streamer.audio = instance
          }}
          audioLists={playlist.toAudioList()}
          {...streamer.options}
          onAudioProgress={onAudioProgress}
          onAudioReload={onAudioReload}
          onAudioError={onAudioError}
          onAudioListsChange={onAudioListsChange}
          onAudioPlayTrackChange={onAudioPlayTrackChange}
        />
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
