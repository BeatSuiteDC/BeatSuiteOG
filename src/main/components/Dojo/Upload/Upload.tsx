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

import { Tooltip } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import Opensea from "../../../images/opensea.png"
import { Track } from "../Album/Album"

export default observer(() => {
  const {
    services: { streamer },
    user,
    album,
  } = useStores()

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
          <AddButton
            onClick={(e) => {
              album.addTrack()
            }}
          >
            <AddIcon style={{ position: "absolute", top: "0" }} />
          </AddButton>
          <TitleHeader>TRACKS</TitleHeader>
        </TableHeader>
        {album.songs.map((song: Track, i) => {
          return (
            <div key={i}>
              <TableContent>
                <Tooltip
                  title={"Delete track?"}
                  placement="bottom"
                  enterDelay={100}
                  enterNextDelay={400}
                >
                  <RemoveButton
                    onClick={(e) => {
                      album.remove(i)
                    }}
                  >
                    {"-"}
                  </RemoveButton>
                </Tooltip>
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
