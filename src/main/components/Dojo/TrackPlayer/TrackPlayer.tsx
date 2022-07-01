import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../../hooks/useStores"
import Track from "../../../images/track.png"
import {
  Artist,
  Bottom,
  Container,
  Icon,
  PTag,
  Top,
  TopImg,
  TrackPlayerCSS,
  VolumeDial,
} from "./TrackPlayerCSS"

import {
  VolumeDownOutlined as volDown,
  VolumeOffOutlined as volOff,
  VolumeUpOutlined as volUp,
} from "@mui/icons-material"

export const TrackPlayer: FC = observer(() => {
  const {
    services: { streamer },
  } = useStores()

  const { volume, isPlaying, active } = streamer

  const handleVolume = (e: any) => {
    streamer.volume = e.target.valueAsNumber
  }

  const VolumeIcon = volume > 0.35 ? volUp : volume > 0 ? volDown : volOff

  return (
    <>
      <TrackPlayerCSS />
      <Container>
        <Top>
          <TopImg
            style={{
              animation: `${isPlaying ? "spin 3s linear infinite" : ""}`,
              borderRadius: "100%",
            }}
            src={active?.cover || Track}
          />
          <PTag>
            {streamer.active?.title || "no track"}
            <Artist>{streamer.active?.album || "--"}</Artist>
          </PTag>
        </Top>

        <Bottom>
          <VolumeIcon
            onClick={(e) => streamer.mute(!streamer.isMuted)}
            sx={{ fontSize: 30 }}
            className="volumeIcon"
          />
          <VolumeDial
            min={0}
            max={1}
            value={volume}
            step={0.01}
            onChange={handleVolume}
            type="range"
          />
          <Icon></Icon>
          <Icon></Icon>
        </Bottom>
      </Container>
    </>
  )
})

export default TrackPlayer
