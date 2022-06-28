// import { motion } from "framer-motion"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { useStores } from "../../../hooks/useStores"
import CSS, { Container } from "./AudioControlCSS"

import AllInclusiveIcon from "@mui/icons-material/AllInclusive"
import FastForwardIcon from "@mui/icons-material/FastForward"
import FastRewindIcon from "@mui/icons-material/FastRewind"
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import { Fade, Popper } from "@mui/material"

export const TransportPlayer: FC = observer(() => {
  const rootStore = useStores()
  const {
    services: { streamer },
    playlist,
  } = rootStore

  const [unmount, setUnmount] = useState<null | SVGSVGElement>(null)

  const handlePlay = (e: React.MouseEvent) => {
    streamer.isPlaying ? streamer.pause() : streamer.play()
    console.log("Button pressd")
  }
  const handleSkip = (e: React.MouseEvent) => {}
  const handleNext = (e: React.MouseEvent) => {}
  const handleRewind = (e: React.MouseEvent) => {}
  const handleSeek = (e: React.MouseEvent) => {}
  const handlePlaylistPopper = (e: React.MouseEvent<SVGSVGElement>) => {
    setUnmount(unmount ? null : e.currentTarget)
    console.log(unmount)
  }
  const handleLoop = (e: React.MouseEvent) => {}

  const open = Boolean(unmount)
  const id = open ? "playlist-popper" : undefined

  return (
    <Container>
      <CSS />
      <div className="centralControls">
        <AllInclusiveIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handleLoop}
        />
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
        <PlaylistAddIcon
          aria-describedby={id}
          className="seekIcon"
          fontSize="medium"
          onClick={handlePlaylistPopper}
        />
        <Popper placement="right-start" id={id} open={open} anchorEl={unmount}>
          <Fade in={open}>
            <div className="playlistContainer">
              <h2 className="playlistTitle">{"Playlist container"}</h2>
              {playlist.queue.map((track, i) => {
                const active = playlist.active === track
                return (
                  <div className="playlistItem" key={"playlist-item-" + i}>
                    <span className="trackTitle">{track.title}</span>
                  </div>
                )
              })}
            </div>
          </Fade>
        </Popper>
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
