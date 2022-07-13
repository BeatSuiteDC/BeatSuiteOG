import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { useStores } from "../../../hooks/useStores"
import CSS, { Container } from "./AudioControlCSS"

import {
  AllInclusive,
  FastForward,
  PauseCircleOutline,
  PlayCircleOutline,
  PlaylistAdd,
  RepeatOn,
  RepeatOneOn,
  Restore,
  SkipNext,
  SkipPrevious,
  UpdateDisabled,
} from "@mui/icons-material"

import { toolTip as ToolTip } from "../../../helpers/tootlTip"

import { Fade, List, Popper } from "@mui/material"
import { Box } from "@mui/system"
import PlaylistPopper from "./PlaylistPopper"

import { Loop } from "../Streamer/Looper"

const LoopIcons = [AllInclusive, RepeatOn, RepeatOneOn, UpdateDisabled]
const loopToolTips = ["Sampler", "Loop All", "Loop 1", "Loop off"]

const increment = 0.05

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
  const handleRewind = (e: React.MouseEvent) => {
    const { begin } = streamer.active.sample
    const current = streamer.position()
    const duration = streamer.active.duration || 1

    let progress = 0
    let tick = 0

    if (_loop.setting === Loop.SAMPLE) {
      progress = begin
    } else {
      tick = duration * increment
      progress = current - tick
    }

    progress += 0.00001
    streamer.currentTick = progress
  }

  const handleSeek = (e: React.MouseEvent) => {
    const { end } = streamer.active.sample

    const current = streamer.position()
    const duration = streamer.active.duration || 1

    let tick = 0

    if (_loop.setting === Loop.SAMPLE) {
      tick = (end - current) * increment
    } else {
      tick = duration * increment
    }

    const progress = tick + current

    streamer.currentTick = progress
  }
  const handlePlaylistPopper = (e: React.MouseEvent<SVGSVGElement>) => {
    setUnmount(unmount ? null : e.currentTarget)
  }

  const { _loop } = streamer
  const LoopIcon = LoopIcons[_loop.setting]

  const handleLoop = (e: React.MouseEvent) => {
    let setting = _loop.setting
    setting = setting > 2 ? 0 : setting + 1
    const enabled = setting === Loop.OFF ? false : true

    streamer.loop.enabled = enabled
    streamer._loop.setting = setting

    console.log({ setting, enabled })
  }

  const open = Boolean(unmount)
  const id = open ? "playlist-popper" : undefined

  return (
    <Container>
      <CSS />

      <div className="centralControls">
        <ToolTip title={loopToolTips[_loop.setting]}>
          <LoopIcon
            className="seekIcon"
            fontSize="medium"
            onClick={handleLoop}
          />
        </ToolTip>
        <ToolTip title="Previous">
          <SkipPrevious
            className="seekIcon"
            fontSize="medium"
            onClick={handlePrevious}
          />
        </ToolTip>
        <ToolTip title="Loop back">
          <Restore
            className="seekIcon"
            fontSize="medium"
            onClick={handleRewind}
          />
        </ToolTip>

        {streamer.isPlaying ? (
          <ToolTip title="Pause">
            <PauseCircleOutline
              className="playPause"
              fontSize="large"
              onClick={handlePlay}
            />
          </ToolTip>
        ) : (
          <ToolTip title="Play">
            <PlayCircleOutline
              className="playPause"
              fontSize="large"
              onClick={handlePlay}
            />
          </ToolTip>
        )}
        <ToolTip title="Seek">
          <FastForward
            className="seekIcon"
            fontSize="medium"
            onClick={handleSeek}
          />
        </ToolTip>

        <ToolTip title="Skip">
          <SkipNext
            className="seekIcon"
            fontSize="medium"
            onClick={handleNext}
          />
        </ToolTip>

        <ToolTip title="Open queue">
          <PlaylistAdd
            aria-describedby={id}
            className="seekIcon"
            fontSize="medium"
            onClick={handlePlaylistPopper}
          />
        </ToolTip>
        <Popper placement="right-start" id={id} open={open}>
          <Fade in={open} exit={true} timeout={300}>
            <Box className="playlistContainer">
              <List component="nav" aria-label="main playlist content">
                {playlist.queue.map((track, i) => {
                  const active = playlist.active === playlist.index(track)
                  return (
                    <div key={`playlist-item-${i}-${track.id}`}>
                      <PlaylistPopper
                        track={track}
                        idx={i}
                        active={active}
                        playlist={playlist}
                      />
                    </div>
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
