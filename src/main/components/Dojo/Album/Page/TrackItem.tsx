import styled from "@emotion/styled"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"

import { Audiotrack } from "@mui/icons-material"

import { observer } from "mobx-react-lite"
import { FC } from "react"
import { AlbumProps, Track } from "../../Album/Album"

import { useStores } from "../../../../hooks/useStores"
import ethLogo from "../../../../images/ethereum-logo.svg"

import { v4 as uuid } from "uuid"
import { toolTip as ToolTip } from "../../../../helpers/tootlTip"

const Container = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: flex;
  align-items: center;
  overflow: auto;
`

const TrackTitle = styled.span`
  color: #99badd;
  background: none;
  border-radius: 5px;
  padding-left: 10px;
  overflow-x: scroll;
  width: 10rem;
  :hover {
    opacity: 0.5;
    color: white;
  }
`
const Value = styled.span`
  color: white;
  width: 4rem;
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`

const EthLogo = styled.img`
  position: relative;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-left: 5px;
`

const PriceContainer = styled.div`
  display: flex;
  alignitems: center;
  marginleft: 5px;
`

const EthIcon = styled(ethLogo)``

const TrackItem: FC<{
  song: Track
  album: AlbumProps
}> = observer(({ song, album }) => {
  const stores = useStores()
  const {
    services: { streamer },
    playlist,
  } = stores

  const handlePlay = () => {
    console.log("playing")
    streamer.active = song
    streamer.play()
  }

  const handleQueue = (song: Track) => {
    playlist.addNext(song)
  }

  return (
    <Container key={"track-item-" + song.hash ?? song.id ?? uuid()}>
      <PriceContainer>
        <EthLogo src={`url(${ethLogo})`} />
        <Value>{song.value}</Value>
      </PriceContainer>

      <TrackTitle>{song.title}</TrackTitle>

      <>
        <ToolTip title={"Play track"}>
          <Audiotrack className="playIcon" onClick={handlePlay} />
        </ToolTip>

        <ToolTip title={"Add to queue"}>
          <PlaylistAddIcon
            className="playIcon"
            onClick={(e) => handleQueue(song)}
          />
        </ToolTip>
      </>
    </Container>
  )
})

export default TrackItem
