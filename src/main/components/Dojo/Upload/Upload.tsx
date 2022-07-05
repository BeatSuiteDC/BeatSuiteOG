import { useStores } from "../../../hooks/useStores"
import CSS, {
  AlbumContent,
  OpenButton,
  TableHeader,
  TitleHeader,
  TopBan,
} from "./CSS"

import BulkImport from "./Bulk"

import AddCircleIcon from "@mui/icons-material/AddCircle"

import { Modal } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { getBase64FromUrl } from "../../../../common/file"
import { sanityUser } from "../../../../common/sanity/Sanity"
import Opensea from "../../../images/opensea.png"
import ipfs from "../../../IPFS"
import { AlbumProps, Track } from "../Album/Album"
import Loading from "../Loading"
import { SearchBar } from "../SearchBar"
import AlbumDetails from "./AlbumDetails"
import AlbumImage from "./AlbumImage"
import DropImport from "./DropImport"
import TrackItem from "./TrackItem"
import UploadAll from "./UploadAll"

export default observer(() => {
  const rootStore = useStores()
  const { user, album, playlist } = rootStore
  const [loading, setLoading] = useState<string | undefined>()
  const web3 = useWeb3React()

  useEffect(() => {
    if (web3.account && !user.info) {
      sanityUser(web3.account).then((res) => (user.info = res))
    }

    const info = user.info
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const handleMint = (e: any) => {
    console.log("active", user.web3)
  }
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading("Uploading...")
    const ipfsUrl = "https://beatsuite.infura-ipfs.io/ipfs/"

    if (web3.account) {
      let details: AlbumProps = {
        artist: album.artist,
        title: album.title,
        year: Number(album.year),
        cover: "",
        songs: [],
      }
      if (!user.info) {
        user.info = await sanityUser(web3.account, album.artist)
      }

      const coverBase64 = await getBase64FromUrl(album.cover)
      const coverHash = await ipfs(coverBase64)

      if (!coverHash) {
        alert("Invalid cover image")
        return
      }
      details.cover = ipfsUrl + coverHash
      console.log({ coverHash }, details.cover)

      album.songs.forEach(async (song) => {
        if (song.src) {
          setLoading("Generating hashes...")

          console.log("Adding songs...", song.title)
          const songBase64 = await getBase64FromUrl(song.src)
          const songHash = await ipfs(songBase64)
          const url = ipfsUrl + songHash

          console.log({ url })
          const track: Track = {
            src: ipfsUrl + songHash,
            title: song.title,
            album: album.title,
            cover: details.cover,
            duration: song.duration,
          }
          details.songs.push(track)
        }
      })

      console.log({ details })
    } else {
      alert("connect wallet first")
    }
    setLoading(undefined)
  }

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <AlbumImage album={album} />
          <AlbumDetails album={album} />
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
            onClick={(e) => album.createTrack()}
          />
          <TitleHeader>BANGERS</TitleHeader>
          <BulkImport album={album} />
          <UploadAll album={album} playlist={playlist} />

          <SearchBar />
        </TableHeader>

        {loading && (
          <Modal open={loading ? true : false}>
            <Loading title={loading} />
          </Modal>
        )}

        <DropImport album={album}>
          {album.songs.map((song: Track, i) => {
            return (
              <TrackItem
                song={song}
                key={i}
                playlist={playlist}
                album={album}
              />
            )
          })}
        </DropImport>
      </AlbumContent>
    </>
  )
})
