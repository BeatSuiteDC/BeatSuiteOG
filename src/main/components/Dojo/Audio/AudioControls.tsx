import { motion } from "framer-motion"
import React, { FC, MouseEventHandler, useState } from "react"
import { useStores } from "../../../hooks/useStores"

import styled from "@emotion/styled"

import { Tooltip } from "@mui/material"
import { observer } from "mobx-react-lite"
import ReactPlayer from "react-player"
import { localized } from "../../../../common/localize/localizedString"
import { fastForwardOneBar, rewindOneBar, stop } from "../../../actions"
import { AudioControlCSS } from "./AudioControlCSS"

import pauseBtn from "../../../images/pause.png"
import playBtn from "../../../images/playBtn.png"
import backBtn from "../../../images/skipBack.png"
import fwdBtn from "../../../images/skipForward.png"

type ButtonComponent = {
  clickHandler: MouseEventHandler
  class1: string
  class2: string
  tooltipKey?: string
  tooltipValue?: string
  hotkey?: string
  imgSrc: any
}

const ButtonDiv: FC<ButtonComponent> = ({
  clickHandler,
  class1,
  class2,
  tooltipKey,
  tooltipValue,
  hotkey,
  imgSrc,
}) => {
  const key = tooltipKey ? tooltipKey : ""
  const value = tooltipValue ? tooltipValue : ""
  const _hotkey = hotkey ? hotkey : ""
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.9 }}
      onClick={clickHandler}
      className={class1}
    >
      <Tooltip title={`${localized(key, value)} [${_hotkey}]`} placement="top">
        <img className={class2} src={imgSrc} />
      </Tooltip>
    </motion.div>
  )
}

export const PlayerPanel: FC<React.PropsWithChildren<unknown>> = observer(
  () => {
    const rootStore = useStores()
    const {
      services: { streamer },
    } = rootStore

    const { isPlaying, buttonClass, volume, liveStreamUrl } = streamer

    const [muteCheck2, setUnmute2] = useState("audioOnImg")

    const [lastPlayedVolume, setLastPlayedVolume] = useState(volume.level)

    const onClickPlay = (e: any) => {
      if (!isPlaying) {
        streamer.play()
      } else {
        streamer.pause()
      }
    }

    const handleVolume = (e: any) => {
      streamer.setVolume(e.target.valueAsNumber)
    }

    const handleMute = (e: any) => {
      // Someone else did this but ef it imma let it rock
      let classNameVol = e.target.className
      if (classNameVol === "volumeOn" || classNameVol === "audioOnImg") {
        setLastPlayedVolume(volume.level)
        streamer.mute(true)
      } else if (
        classNameVol === "volumeOff" ||
        classNameVol === "audioOffImg"
      ) {
        streamer.mute(false)
        streamer.setVolume(lastPlayedVolume)
      }
    }

    const onClickStop = stop(rootStore)
    const onClickBackward = rewindOneBar(rootStore)
    const onClickForward = fastForwardOneBar(rootStore)

    const AudioControl = styled.div`
      width: 99%;
      height: 18vh;
      text-align: center;
      font-size: 3rem;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: center;
      box-sizing: border-box;
      margin-top: auto;
      z-index: 1;
    `
    return (
      <>
        <AudioControl>
          <AudioControlCSS />

          <ButtonDiv
            class1={volume.mute}
            class2={muteCheck2}
            tooltipKey="rewind"
            tooltipValue={"Rewind"}
            hotkey="cmd+b"
            clickHandler={onClickBackward}
            imgSrc={backBtn}
          />
          <ButtonDiv
            class1={volume.mute}
            class2={muteCheck2}
            tooltipKey="skip"
            tooltipValue={"Skip"}
            hotkey="cmd+f"
            clickHandler={onClickForward}
            imgSrc={fwdBtn}
          />

          <ButtonDiv
            class1={buttonClass.class1}
            class2={buttonClass.class2}
            tooltipKey="play-pause"
            tooltipValue={isPlaying ? "Pause" : "Play"}
            hotkey="space"
            clickHandler={onClickPlay}
            imgSrc={isPlaying ? playBtn : pauseBtn}
          />

          <ButtonDiv
            class1={volume.mute}
            class2={muteCheck2}
            tooltipKey="mute-check"
            tooltipValue={"Mute/Unmute"}
            hotkey="cmd+m"
            clickHandler={handleMute}
            imgSrc={volume.image}
          />

          <Tooltip
            title={`${localized("volume", String(volume.level))}`}
            placement="top"
          >
            <input
              className="volumeDial"
              type="range"
              min={0}
              max={1}
              value={volume.level}
              step={0.01}
              onChange={handleVolume}
            />
          </Tooltip>

          <ReactPlayer
            className="liveStreamPlayer"
            playing={isPlaying}
            volume={volume.level}
            url={liveStreamUrl}
          />
        </AudioControl>
      </>
    )
  }
)
