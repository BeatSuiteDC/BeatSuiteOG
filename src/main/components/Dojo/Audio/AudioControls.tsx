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

import { Fade, List, Popper } from "@mui/material"
import { Box } from "@mui/system"
import Player from "./Player"
import PlaylistPopper from "./PlaylistPopper"

export const TransportPlayer: FC = observer(() => {
  const rootStore = useStores()
  const {
    services: { streamer },
    playlist,
  } = rootStore

  const [unmount, setUnmount] = useState<null | SVGSVGElement>(null)

  const handlePlay = (e: React.MouseEvent) => {
    streamer.isPlaying ? streamer.pause() : streamer.play()
  }
  const handlePrevious = (e: React.MouseEvent) => {
    streamer.previous()
  }
  const handleNext = (e: React.MouseEvent) => {
    streamer.skip()
  }
  const handleRewind = (e: React.MouseEvent) => {}
  const handleSeek = (e: React.MouseEvent) => {}
  const handlePlaylistPopper = (e: React.MouseEvent<SVGSVGElement>) => {
    setUnmount(unmount ? null : e.currentTarget)
  }
  const handleLoop = (e: React.MouseEvent) => {}

  const open = Boolean(unmount)
  const id = open ? "playlist-popper" : undefined

  return (
    <Container>
      <CSS />
      <Player />
      <div className="centralControls">
        <AllInclusiveIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handleLoop}
        />
        <SkipPreviousIcon
          className="seekIcon"
          fontSize="medium"
          onClick={handlePrevious}
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
          <Fade in={open} exit={true} timeout={300}>
            <Box className="playlistContainer">
              Queue
              <List component="nav" aria-label="main playlist content">
                {playlist.queue.map((track, i) => {
                  const active = streamer.active === track
                  return (
                    <PlaylistPopper
                      track={track}
                      idx={i}
                      active={active}
                      playlist={playlist}
                    />
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
