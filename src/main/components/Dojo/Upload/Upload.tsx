import { useStores } from "../../../hooks/useStores"
import CSS, {
  AddButton,
  AlbumContent,
  Artist,
  Cover,
  Details,
  NumberHeader,
  OpenButton,
  RemoveButton,
  TableContent,
  TableHeader,
  Title,
  TitleHeader,
  TopBan,
  TrackInput,
} from "./CSS"

import AddIcon from "@mui/icons-material/Add"
import UploadIcon from "@mui/icons-material/Upload"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Opensea from "../../../images/opensea.png"
import { demoAlbum, Track } from "../Album/Album"

const Upload = observer(() => {
  const {
    services: { streamer },
    user,
  } = useStores()

  const [album, setAlbum] = useState(demoAlbum)
  useEffect(() => {
    const info = user.info
    console.log({ info })
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const handleMint = (e: any) => {}
  const handleSave = (e: any) => {}
  const handleImg = (e: any) => {}

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <Cover src={album.cover} alt="albumCover"></Cover>
          <Details>
            <div>ALBUM</div>
            <Title
              type="text"
              onChange={(e) => {
                album.title = e.target.value
              }}
              value={album.title}
            />
            <Artist>{album.artist}</Artist>
            <div>
              {album.year} • {album.songs.length} Songs
            </div>
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
          <AddButton onClick={(e) => {}}>
            <AddIcon style={{ position: "absolute", top: "0" }} />
          </AddButton>
          <TitleHeader>TRACKS</TitleHeader>
        </TableHeader>
        {album.songs.map((song: Track, i) => {
          return (
            <div key={i}>
              <TableContent>
                <RemoveButton onClick={(e) => {}}>{"-"}</RemoveButton>
                <TrackInput
                  type="text"
                  onChange={(e) => {
                    song.title = e.target.value
                  }}
                  value={song.title}
                />
                <NumberHeader>{song.duration}</NumberHeader>
                <UploadIcon className="uploadIcon" />
              </TableContent>
            </div>
          )
        })}
      </AlbumContent>
    </>
  )
})

export default Upload
