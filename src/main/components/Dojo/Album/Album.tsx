import { useStores } from "../../../hooks/useStores"
import Opensea from "../../../images/opensea.png"
import {
  AlbumContent,
  Artist,
  Cover,
  Details,
  NumberHeader,
  OpenButton,
  PlayButton,
  TableContent,
  TableHeader,
  Title,
  TitleHeader,
  TopBan,
} from "./CSS"

export type Track = {
  src: string
  album: string
  title: string
  duration: string
  cover: string
}
export type AlbumProps = {
  cover: string
  title: string
  year: number
  artist: string
  songs: Array<Track>
  contract?: string
}

export const demoAlbum: AlbumProps = {
  cover:
    "https://upload.wikimedia.org/wikipedia/en/6/69/B.o.B_-_Strange_Clouds_-_LP_Cover.jpg",
  title: "Strange Clouds",
  year: 2022,
  artist: "B.O.B",
  songs: [
    {
      src: "https://ipfs.moralis.io:2053/ipfs/Qmf8xEYZdMtQXYv56VxxmzbtUtEVjmaFaXGCgcBqGXDAA6/music/JTwinkle.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/6/69/B.o.B_-_Strange_Clouds_-_LP_Cover.jpg",
      album: "Strange Clouds",
      title: "Airplanes",
      duration: "0:05",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      title: "Side To Side",
      duration: "0:16",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      title: "Pizza and A Coke",
      duration: "5:01",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      title: "Iceberg Lettuce",
      duration: "0:24",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      title: "Spitting Chicklets",
      duration: "1:03",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      title: "Boomerang",
      duration: "2:16",
    },
  ],
}

const Album = () => {
  const {
    services: { streamer },
  } = useStores()

  const { currentAlbum: album } = streamer

  const loadOpenSea = (e: any) => {
    const url = `https://testnets.opensea.io/assets/mumbai/${album.contract}/1`
    album.contract ? window.open(url) : alert("Album hasn't been minted yet")
  }

  return (
    <>
      <AlbumContent>
        <TopBan>
          <Cover src={album.cover} alt="albumcover" />
          <Details>
            <div>ALBUM</div>
            <Title>{album.title}</Title>
            <Artist>{album.artist}</Artist>
            <div>
              {album.year} • {album.songs.length} Songs
            </div>
          </Details>
        </TopBan>
        <TopBan>
          <PlayButton onClick={() => streamer.setAlbum(album)}>PLAY</PlayButton>
          <OpenButton onClick={loadOpenSea}>
            OpenSea
            <img src={Opensea} style={{ height: "20px" }} />
          </OpenButton>
        </TopBan>
        <TableHeader>
          <NumberHeader>#</NumberHeader>
          <TitleHeader>TITLE</TitleHeader>
          <div className="numberHeader"></div>
        </TableHeader>
        {album.songs &&
          album.songs.map((song, i) => {
            return (
              <>
                <TableContent>
                  <NumberHeader>{i + 1}</NumberHeader>
                  <TitleHeader>{song.title}</TitleHeader>
                  <NumberHeader>{song.duration}</NumberHeader>
                </TableContent>
              </>
            )
          })}
      </AlbumContent>
    </>
  )
}

export default Album
