// import { motion } from "framer-motion"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { useStores } from "../../../hooks/useStores"
import CSS, { Container } from "./AudioControlCSS"

import FastForwardIcon from "@mui/icons-material/FastForward"
import FastRewindIcon from "@mui/icons-material/FastRewind"
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
// type ButtonComponent = {
//   clickHandler: MouseEventHandler
//   class1: string
//   class2: string
//   tooltipKey?: string
//   tooltipValue?: string
//   hotkey?: string
//   imgSrc: any
// }

// const ButtonDiv: FC<ButtonComponent> = ({
//   clickHandler,
//   class1,
//   class2,
//   tooltipKey,
//   tooltipValue,
//   hotkey,
//   imgSrc,
// }) => {
//   const key = tooltipKey ? tooltipKey : ""
//   const value = tooltipValue ? tooltipValue : ""
//   const _hotkey = hotkey ? hotkey : ""
//   return (
//     // <motion.div
//     //   whileHover={{ scale: 1.03 }}
//     //   whileTap={{ scale: 0.9 }}
//     //   onClick={clickHandler}
//     //   className={class1}
//     // >
//     //   <Tooltip title={`${localized(key, value)} [${_hotkey}]`} placement="top">
//     //     <img className={class2} src={imgSrc} />
//     //   </Tooltip>
//     // </motion.div>
//     <></>
//   )
// }

// const PlayerPanel: FC<React.PropsWithChildren<unknown>> = observer(() => {
//   const rootStore = useStores()
//   const {
//     services: { streamer },
//   } = rootStore

//   const { isPlaying, volume } = streamer

//   const [muteCheck2, setUnmute2] = useState("audioOnImg")

//   const [lastPlayedVolume, setLastPlayedVolume] = useState(volume.level)

//   const onClickPlay = (e: any) => {
//     if (!isPlaying) {
//       streamer.play()
//     } else {
//       streamer.pause()
//     }
//   }

//   const handleVolume = (e: any) => {
//     streamer.setVolume(e.target.valueAsNumber)
//   }

//   const handleMute = (e: any) => {
//     // Someone else did this but ef it imma let it rock
//     let classNameVol = e.target.className
//     if (classNameVol === "volumeOn" || classNameVol === "audioOnImg") {
//       setLastPlayedVolume(volume.level)
//       streamer.mute(true)
//     } else if (classNameVol === "volumeOff" || classNameVol === "audioOffImg") {
//       streamer.mute(false)
//       streamer.setVolume(lastPlayedVolume)
//     }
//   }

//   const onClickStop = stop(rootStore)
//   const onClickBackward = rewindOneBar(rootStore)
//   const onClickForward = fastForwardOneBar(rootStore)

//   const AudioControl = styled.div`
//     width: 99%;
//     height: 18vh;
//     text-align: center;
//     font-size: 3rem;
//     color: white;
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     box-sizing: border-box;
//     margin-top: auto;
//     z-index: 1;
//   `
//   return (
//     <>
//       <AudioControl>
//         <CSS />
//         <Tooltip
//           title={`${localized("volume", String(volume.level * 100))}`}
//           placement="top"
//         >
//           <input
//             className="volumeDial"
//             type="range"
//             min={0}
//             max={1}
//             value={volume.level}
//             step={0.01}
//             onChange={handleVolume}
//           />
//         </Tooltip>
//       </AudioControl>
//     </>
//   )
// })

export const TransportPlayer: FC = observer(() => {
  const rootStore = useStores()
  const {
    services: { streamer },
    playlist,
  } = rootStore

  const [unmount, setUnmount] = useState(false)

  const handlePlay = (e: React.MouseEvent) => {
    streamer.isPlaying ? streamer.pause() : streamer.play()
    console.log("Button pressd")
  }
  const handleSkip = (e: React.MouseEvent) => {}
  const handleNext = (e: React.MouseEvent) => {}
  const handleRewind = (e: React.MouseEvent) => {}
  const handleSeek = (e: React.MouseEvent) => {}

  return (
    <Container>
      <CSS />
      <div className="centralControls">
        <SkipPreviousIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handleSkip}
        />
        <FastRewindIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handleRewind}
        />
        {streamer.isPlaying ? (
          <PauseCircleOutlineIcon
            className="playPause"
            fontSize="large"
            onClick={handlePlay}
          />
        ) : (
          <PlayCircleOutlineIcon
            className="playPause"
            fontSize="large"
            onClick={handlePlay}
          />
        )}
        <FastForwardIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handleSeek}
        />
        <SkipNextIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handleNext}
        />
      </div>
    </Container>
  )
})

// {streamer.isPlaying ? null : (
//   <ReactJkMusicPlayer
//     {...streamer.options}
//     audioLists={playlist.audioList()}
//     onThemeChange={(theme) => {
//       console.log("onThemeChange: ", theme)
//       streamer.options = { theme }
//     }}
//     onModeChange={(mode) => {
//       console.log("onModeChange: ", mode)
//       streamer.options = { mode }
//     }}
//     onPlayModeChange={(playMode) => {
//       console.log("onPlayModeChange: ", playMode)
//       streamer.options = { playMode }
//     }}
//     onPlayIndexChange={(playIndex) => {
//       console.log("onPlayIndexChange: ", playIndex)
//       streamer.options = { playIndex }
//     }}
//   />
// )}
