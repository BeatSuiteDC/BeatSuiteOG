import styled from "@emotion/styled"
import AirplayIcon from "@mui/icons-material/Airplay"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { observer } from "mobx-react-lite"
import { ChangeEvent, FC, useRef } from "react"
import { useStores } from "../../../hooks/useStores"
import { Track } from "../Album/Album"

const Container = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: flex;
  align-items: center;
  overflow: auto;
`

const TrackInput = styled.input`
  color: #99badd;
  background: none;
  margin-left: 4rem;
  border-radius: 5px;
  padding-left: 10px;
  overflow-x: scroll;
  width: 20rem;
  :hover {
    opacity: 0.5;
  }
`

const TrackItem: FC<{ key: number; song: Track }> = observer(
  ({ key, song }) => {
    const { playlist, album } = useStores()

    const audioRef = useRef<HTMLInputElement>(null)

    const handlePlay = (song: Track) => {
      console.log("playing")
      if (!playlist.inQueue(song)) {
        console.log("track not in queue")
        playlist.addNext(song)
      }
      console.log("setting active")
      playlist.setActive(song)
    }

    const triggerInput = () => {
      audioRef.current?.click()
    }

    const uploadTrack = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.item(0)
      if (file) {
        try {
          album.updateTrack(key, file)
          console.log("uploaded", { ...album.songs[key] })
        } catch (ex) {
          console.error(ex)
        }
      }
    }

    return (
      <Container key={key}>
        <RemoveCircleOutlineIcon
          className="removeIcon"
          onClick={(e) => album.remove(key)}
        />
        <TrackInput
          type="text"
          onChange={(e) => (song.title = e.target.value)}
          value={song.title}
        />
        <CloudUploadIcon
          className="uploadIcon"
          onClick={(e) => triggerInput()}
        />

        {song.src ? (
          <AirplayIcon className="playIcon" onClick={(e) => handlePlay(song)} />
        ) : (
          <PlayDisabledIcon id="disabled" className="playIcon" />
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
  }
)

export default TrackItem
