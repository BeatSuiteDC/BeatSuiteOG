import styled from "@emotion/styled"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"

import {
  Audiotrack,
  AutoFixHigh,
  CloudUpload,
  RemoveCircleOutline,
  UploadFile,
} from "@mui/icons-material"

import { Link } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ChangeEvent, FC, useRef } from "react"
import { EmptyAlbum, Track } from "../Album/Album"

import { useStores } from "../../../hooks/useStores"
import ethLogo from "../../../images/ethereum-logo.png"
import { createTrack } from "../../../IPFS"

import { toolTip as ToolTip } from "../../../helpers/tootlTip"

const Container = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: flex;
  align-items: center;
  overflow: auto;
`

const TrackInput = styled.input`
  color: #99badd;
  background: none;
  border-radius: 5px;
  padding-left: 10px;
  overflow-x: scroll;
  width: 20rem;
  :hover {
    opacity: 0.5;
    color: white;
  }
`
const Value = styled.input`
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

const TrackItem: FC<{
  song: Track
  album: EmptyAlbum
}> = observer(({ song, album }) => {
  const audioRef = useRef<HTMLInputElement>(null)
  const key = Math.floor(Math.random() * 1000)

  const {
    services: { streamer },
    playlist,
  } = useStores()

  const handlePlay = () => {
    console.log("playing")
    streamer.active = song
    streamer.play()
  }
  const handleQueue = (song: Track) => {
    playlist.addNext(song)
  }

  const handleRemove = () => {
    album.remove(song)
    if (playlist.inQueue(song)) {
      playlist.remove(song)
    }
  }

  const triggerInput = () => {
    audioRef.current?.click()
  }
  const triggerHash = async () => {
    if (song.hash !== undefined) {
      // call ipfs remove hash function
    } else {
      const idx = album.ids.indexOf(song.id)
      const track = await createTrack(song, album)
      album.updateTrack(idx, track)
    }
  }

  const openDojo = () => {
    album.editing = song
  }

  const uploadTrack = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    console.log("** removed **")
    if (file) {
      try {
        // album.updateTrack(key, file)
        // const track = { ...album.songs[key] }
        // playlist.addToQueue(track)
        // console.log("uploaded", track.title)
      } catch (ex) {
        console.error(ex)
      }
    }
  }

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)

    if (isNaN(value)) {
      return
    }

    if (value < 0.0001) {
      value = 0.0001
    }

    song.value = value == 0 ? "0.0" : String(value)
  }

  return (
    <Container key={"track-item-" + song.id}>
      <RemoveCircleOutline className="removeIcon" onClick={handleRemove} />
      <div style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
        <EthLogo src={ethLogo} />
        <Value type="text" onChange={handleValue} value={song.value} />
      </div>

      <TrackInput
        type="text"
        onChange={(e) => (song.title = e.target.value)}
        value={song.title}
      />

      <ToolTip title={"Save track"}>
        <CloudUpload
          className={song.hash ? "playIcon" : "uploadIcon"}
          onClick={triggerHash}
        />
      </ToolTip>

      <ToolTip title={"Upload file"}>
        <UploadFile className="playIcon" onClick={triggerInput} />
      </ToolTip>

      {song.data ? (
        <>
          <Audiotrack className="playIcon" onClick={handlePlay} />
          <PlaylistAddIcon
            className="playIcon"
            onClick={(e) => handleQueue(song)}
          />
        </>
      ) : (
        <Link href="/edit">
          <ToolTip title={"Open editor"}>
            <AutoFixHigh
              onClick={(e) => openDojo()}
              id="disabled"
              className="playIcon"
            />
          </ToolTip>
        </Link>
      )}
      <input
        style={{ display: "none" }}
        accept="audio/*"
        type="file"
        ref={audioRef}
        onChange={uploadTrack}
      />
    </Container>
  )
})

export default TrackItem
