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
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"

import { Fade, List, ListItemButton, ListItemIcon, Popper } from "@mui/material"
import { Box } from "@mui/system"
import { Track } from "../Album/Album"

export const TransportPlayer: FC = observer(() => {
  const rootStore = useStores()
  const {
    services: { streamer },
    playlist,
  } = rootStore

  const [unmount, setUnmount] = useState<null | SVGSVGElement>(null)
  const queue = playlist.queue

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
  const handleQueue = (e: React.MouseEvent, track: Track) => {}

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
          <Fade in={open} exit={true}>
            <Box className="playlistContainer">
              <List component="nav" aria-label="main playlist content">
                {queue &&
                  queue.map((track, i) => {
                    const active = playlist.active === track
                    return (
                      <>
                        <ListItemButton
                          className="playlistItem"
                          key={"playlist-item-" + i}
                          selected={active}
                          onClick={(e) => handleQueue(e, track)}
                        >
                          <ListItemIcon>
                            <PlaylistRemoveIcon
                              className="playlistIcon"
                              onClick={(e) => playlist.remove(track)}
                            />
                          </ListItemIcon>
                          <div className="_trackTitle">{track.title}</div>
                        </ListItemButton>
                      </>
                    )
                  })}
              </List>
            </Box>
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
