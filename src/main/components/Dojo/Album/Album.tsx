import { uniqueId } from "lodash"
import { computed, makeObservable, observable } from "mobx"
import { DEFAULT_SAMPLE, Sample } from "../Streamer/Looper"

export type Track = {
  src?: string
  album: string
  title: string
  cover: string
  duration: number | undefined
  data?: HTMLMediaElement
  file?: File
  id: number | string
  sample: Sample
}
export type AlbumProps = {
  cover: string
  title: string
  year: number
  artist: string
  songs: Track[]
  contract?: string
  id?: number | string
}

export const EmptyTrack: Track = {
  album: "",
  title: "",
  cover: "",
  duration: -1,
  sample: DEFAULT_SAMPLE,
  id: -1,
}

export const DEFAULT_ALBUM_COVER = "https://thisartworkdoesnotexist.com/"
// "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.youredm.com%2Fwp-content%2Fuploads%2F2018%2F09%2FYANDHI.jpg&f=1&nofb=1"
export class EmptyAlbum {
  _cover: string
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
      ids: computed,
    })

    this._cover = DEFAULT_ALBUM_COVER
  }

  get ids() {
    return this._songs.map((song) => song.id)
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

  createTrack() {
    this._tracks++
    this._songs = [
      ...this._songs,
      {
        album: this.title,
        cover: this.cover as string,
        title: `untitled banger ${this._tracks}`,
        id: uniqueId(`untitled-${this._tracks}`),
        sample: DEFAULT_SAMPLE,
        duration: undefined,
      },
    ]
  }

  addFromFile(file: File) {
    const src = URL.createObjectURL(file)
    const data = new Audio(src)
    const id = uniqueId(file.name.trim().replace(/\s/, "-"))
    const track: Track = {
      album: this.title,
      cover: this.cover,
      title: file.name,
      duration: data.duration,
      sample: DEFAULT_SAMPLE,
      src,
      data,
      file,
      id,
    }

    this._songs = [...this.songs, track]
    return track
  }

  remove(track: Track) {
    const idx = this.songs.indexOf(track)
    this._songs.splice(idx, 1)
  }

  updateTrack(idx: number, file: File) {
    const songs = this.songs
    const song = songs[idx]

    const src = URL.createObjectURL(file)
    const data = new Audio(src)

    songs.splice(idx, 1, {
      ...song,
      album: this.title,
      title: file.name,
      src,
      data,
    })
    this.songs = songs
  }
}
