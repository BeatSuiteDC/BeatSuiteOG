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

import AddIcon from "@mui/icons-material/Add"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import RemoveIcon from "@mui/icons-material/Remove"

import { observer } from "mobx-react-lite"
import { ChangeEvent, useEffect, useRef } from "react"
import Opensea from "../../../images/opensea.png"
import { Track } from "../Album/Album"

export default observer(() => {
  const rootStore = useStores()
  const { user, album } = rootStore

  useEffect(() => {
    const info = user.info
    console.log("info", info)
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const audioRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)

  const triggerInput = (type: "image" | "audio") => {
    console.log(type)
    type === "audio" ? audioRef.current?.click() : imgRef.current?.click()
  }

  const uploadTrack = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log("files", files)
    // openAudio(rootStore)
  }
  const handleMint = (e: any) => {}
  const handleSave = (e: any) => {}
  const handleImg = (e: any) => {}

  const handleTitle = (e: any) => {
    album.title = e.target.value
  }

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <div className="albumContainer">
            <Cover id="cover" src={album.cover} alt="albumCover" />
            <AddPhotoAlternateIcon id="icon" className="albumUploadIcon" />
          </div>
          <Details>
            <div>ALBUM</div>
            <Title type="text" onChange={handleTitle} value={album.title} />
            <Artist value={album.artist} />
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
          <AddIcon className="addIcon" onClick={(e) => album.addTrack()} />
          <TitleHeader>BANGERS</TitleHeader>
        </TableHeader>

        {album.songs.map((song: Track, i) => {
          return (
            <div key={i}>
              <TableContent>
                <RemoveIcon
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
                  onClick={(e) => triggerInput("audio")}
                />
              </TableContent>
            </div>
          )
        })}
        <div style={{ display: "none" }}>
          <input
            accept="audio/mp3"
            type="file"
            ref={audioRef}
            onChange={uploadTrack}
          />
        </div>
      </AlbumContent>
    </>
  )
})
