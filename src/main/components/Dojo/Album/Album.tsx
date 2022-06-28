import { computed, makeObservable, observable } from "mobx"

export type Track = {
  src: string
  album: string
  title: string
  duration: string
  cover: string
  data?: File
}
export type AlbumProps = {
  cover: string
  title: string
  year: number
  artist: string
  songs: Track[]
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

// export default () => {
//   const {
//     services: { streamer },
//   } = useStores()

//   // const { currentAlbum: album } = streamer

//   const loadOpenSea = (e: any) => {
//     const url = `https://testnets.opensea.io/assets/mumbai/${album.contract}/1`
//     album.contract ? window.open(url) : alert("Album hasn't been minted yet")
//   }

//   return (
//     <>
//       <AlbumContent>
//         <TopBan>
//           <Cover src={album.cover} alt="albumcover" />
//           <Details>
//             <div>ALBUM</div>
//             <Title>{album.title}</Title>
//             <Artist>{album.artist}</Artist>
//             <div>
//               {album.year} • {album.songs.length} Songs
//             </div>
//           </Details>
//         </TopBan>
//         <TopBan>
//           <PlayButton onClick={() => streamer.setAlbum(album)}>PLAY</PlayButton>
//           <OpenButton onClick={loadOpenSea}>
//             OpenSea
//             <img src={Opensea} style={{ height: "20px" }} />
//           </OpenButton>
//         </TopBan>
//         <TableHeader>
//           <NumberHeader>#</NumberHeader>
//           <TitleHeader>TITLE</TitleHeader>
//           <div className="numberHeader"></div>
//         </TableHeader>
//         {album.songs &&
//           album.songs.map((song, i) => {
//             return (
//               <>
//                 <TableContent>
//                   <NumberHeader>{i + 1}</NumberHeader>
//                   <TitleHeader>{song.title}</TitleHeader>
//                   <NumberHeader>{song.duration}</NumberHeader>
//                 </TableContent>
//               </>
//             )
//           })}
//       </AlbumContent>
//     </>
//   )
// }
const DEFAULT_ALBUM_COVER = "https://thisartworkdoesnotexist.com/"
// "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.youredm.com%2Fwp-content%2Fuploads%2F2018%2F09%2FYANDHI.jpg&f=1&nofb=1"
export class EmptyAlbum {
  _cover = DEFAULT_ALBUM_COVER
  _title = "untitled"
  _year = new Date().getFullYear().toString()
  _artist = "jose rando"
  _songs: Track[] = []
  _tracks = 0

  constructor() {
    makeObservable<
      EmptyAlbum,
      "_cover" | "_title" | "_year" | "_artist" | "_songs" | "_tracks"
    >(this, {
      _cover: observable,
      _title: observable,
      _year: observable,
      _artist: observable,
      _songs: observable,
      _tracks: observable,
      artist: computed,
      songs: computed,
      title: computed,
      cover: computed,
    })
  }

  get artist() {
    return this._artist
  }
  set artist(_artist: string) {
    this._artist = _artist
  }

  get cover() {
    return this._cover
  }

  set cover(url: string) {
    this._cover = url
  }

  get year() {
    return this._year
  }

  get title() {
    return this._title
  }

  set title(_title: string) {
    this._title = _title
  }

  get songs() {
    return [...this._songs]
  }

  set songs(_songs: Track[]) {
    this._songs = _songs
  }

  addTrack() {
    this._tracks++
    this._songs = [
      ...this._songs,
      {
        src: "",
        album: this._title,
        cover: this._cover,
        title: `untitled banger ${this._tracks}`,
        duration: "",
      },
    ]
  }

  remove(index: number) {
    if (confirm("Are you sure?")) {
      this._songs.splice(index, 1)
    }
  }

  updateTrack(idx: number, file: File) {
    const song = this._songs[idx]
    const songs = this.songs
    songs.splice(idx, 1, {
      ...song,
      album: this.title,
      title: file.name,
      src: URL.createObjectURL(file),
      data: file,
    })
    this.songs = songs
  }
}
