import { useStores } from "../../../hooks/useStores"
import CSS, {
  AlbumContent,
  Artist,
  Cover,
  Details,
  OpenButton,
  TableContent,
  TableHeader,
  Title,
  TitleHeader,
  TopBan,
  TrackInput,
} from "./CSS"

import AddCircleIcon from "@mui/icons-material/AddCircle"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import AirplayIcon from "@mui/icons-material/Airplay"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

import { observer } from "mobx-react-lite"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Opensea from "../../../images/opensea.png"
import { Track } from "../Album/Album"

export default observer(() => {
  const rootStore = useStores()
  const { user, album, playlist } = rootStore

  useEffect(() => {
    const info = user.info
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const [trackIdx, setTrackIdx] = useState<number>(-1)
  const audioRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)

  const triggerInput = (type: "image" | "audio", idx = -1) => {
    if (type === "audio") {
      setTrackIdx(idx)
      audioRef.current?.click()
    } else if (type === "image") {
      imgRef.current?.click()
    }
  }

  const uploadTrack = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (file) {
      try {
        album.updateTrack(trackIdx, file)
        console.log("uploaded", { ...album.songs[trackIdx] })
      } catch (ex) {
        console.error(ex)
      }
    }
  }
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.item(0)
    if (img) {
      album.cover = URL.createObjectURL(img)
      console.log("Album cover", album.cover)
    }
  }
  const handleMint = (e: any) => {}
  const handleSave = (e: any) => {}

  const handlePlay = (song: Track) => {
    console.log("playing")
    if (!playlist.inQueue(song)) {
      console.log("track not in queue")
      playlist.addNext(song)
    }
    console.log("setting active")
    playlist.setActive(song)
  }

  const handleArtist = (e: any) => {
    album.artist = e.target.value
  }

  const handleTitle = (e: any) => {
    album.title = e.target.value
  }

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <div
            className="albumContainer"
            onClick={(e) => triggerInput("image")}
          >
            <Cover id="cover" src={album.cover} alt="albumCover" />
            <AddPhotoAlternateIcon id="icon" className="albumUploadIcon" />
          </div>
          <Details>
            <div>ALBUM</div>
            <Title type="text" onChange={handleTitle} value={album.title} />
            <Artist type="text" onChange={handleArtist} value={album.artist} />
            {album.year} • {album.songs.length} tracks
          </Details>
        </TopBan>

        <TopBan>
          <OpenButton disabled={album.songs.length == 0} onClick={handleSave}>
            Upload
          </OpenButton>
          <OpenButton disabled={album.songs.length == 0} onClick={handleMint}>
            Mint
            <img src={Opensea} style={{ height: "20px" }} />
          </OpenButton>
        </TopBan>

        <TableHeader>
          <AddCircleIcon
            className="addIcon"
            onClick={(e) => album.addTrack()}
          />
          <TitleHeader>BANGERS</TitleHeader>
        </TableHeader>

        {album.songs.map((song: Track, i) => {
          return (
            <div key={i}>
              <TableContent>
                <RemoveCircleOutlineIcon
                  className="removeIcon"
                  onClick={(e) => album.remove(i)}
                />
                <TrackInput
                  type="text"
                  onChange={(e) => (song.title = e.target.value)}
                  value={song.title}
                />
                <CloudUploadIcon
                  className="uploadIcon"
                  onClick={(e) => triggerInput("audio", i)}
                />

                {song.src ? (
                  <AirplayIcon
                    className="playIcon"
                    onClick={(e) => handlePlay(song)}
                  />
                ) : (
                  <PlayDisabledIcon className="playIcon" />
                )}
              </TableContent>
            </div>
          )
        })}
        <div style={{ display: "none" }}>
          <input
            accept="audio/*"
            type="file"
            ref={audioRef}
            onChange={uploadTrack}
          />
          <input
            accept="image/*"
            type="file"
            ref={imgRef}
            onChange={uploadImg}
          />
        </div>
      </AlbumContent>
    </>
  )
})
