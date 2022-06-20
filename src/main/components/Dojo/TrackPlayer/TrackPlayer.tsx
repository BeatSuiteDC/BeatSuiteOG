import { observer } from "mobx-react-lite"
import React, { FC } from "react"
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

type Tracklist = {
  trackName: string
  artistName: string
  children?: any
}

export const TrackPlayer: FC<React.PropsWithChildren<Tracklist>> = observer(
  ({ trackName, artistName }) => {
    const {
      services: { streamer },
    } = useStores()

    const { volume, isPlaying, isMuted } = streamer

    const handleVolume = (e: any) => {
      streamer.setVolume(e.target.valueAsNumber)
    }
    return (
      <>
        <TrackPlayerCSS />
        <Container>
          <Top>
            <TopImg
              style={{
                animation: `${isPlaying ? "spin 3s linear infinite" : ""}`,
              }}
              src={Track}
            />
            <PTag>
              {trackName} <Artist>{artistName}</Artist>
            </PTag>
          </Top>

          <Bottom>
            <Icon></Icon>
            <VolumeDial
              min={0}
              max={1}
              value={volume.level}
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
  }
)

export default TrackPlayer
