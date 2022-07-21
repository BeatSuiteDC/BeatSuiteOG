import { computed, makeObservable, observable } from "mobx"
import { v4 as uuid } from "uuid"
import { YAHNDI_COVER } from "../../../actions/fakeImage"
import { DEFAULT_SAMPLE, Sample } from "../Streamer/Looper"

const DEFAULT_ALBUM_VALUE = "0.05"
const DEFAULT_TRACK_VALUE = "0.005"
export interface Track {
  src?: string
  album: string
  title: string
  cover: string
  duration?: number
  id: number | string
  sample: Sample
  value: string
  type: string
  hash?: string
  contract?: string
  chainId?: string
}

export interface AlbumProps {
  cover: string
  title: string
  year: number
  artist: string
  songs: Track[]
  contract?: string
  value: string
  id?: number | string
}

export const EmptyTrack: Track = {
  album: "",
  title: "",
  cover: "",
  id: -1,
  sample: DEFAULT_SAMPLE,
  value: DEFAULT_TRACK_VALUE,
  type: "",
}

export class EmptyAlbum implements AlbumProps {
  _cover: string
  _title = "untitled"
  _year = new Date().getFullYear()
  _artist = "jose rando"
  _songs: Track[] = []
  _tracks = 0
  _editing: Track | undefined
  _id: any
  _value: string = DEFAULT_ALBUM_VALUE

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
      _value: observable,
      artist: computed,
      songs: computed,
      title: computed,
      cover: computed,
      ids: computed,
      resetImg: observable,
      id: computed,
      value: computed,
    })

    this._cover = YAHNDI_COVER
  }

  resetImg = async () => {}

  get value() {
    return this._value
  }
  set value(_value: string) {
    this._value = _value
  }

  get editing() {
    return this._editing
  }
  set editing(track: Track | undefined) {
    this._editing = track
  }

  get id() {
    return this._id
  }

  set id(i: number | string) {
    this._id = i
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
        id: uuid(`untitled-${this._tracks}`),
        sample: DEFAULT_SAMPLE,
        value: DEFAULT_TRACK_VALUE,
        type: "",
      },
    ]
  }

  addFromFile(file: File) {
    const src = URL.createObjectURL(file)
    const id = generateId(file.name)
    const track: Track = {
      album: this.title,
      cover: this.cover,
      title: file.name,
      sample: DEFAULT_SAMPLE,
      value: DEFAULT_TRACK_VALUE,
      type: file.type,
      src,
      id,
    }

    this._songs = [...this.songs, track]
    return track
  }

  addFromMidi(blob: Blob) {
    const src = URL.createObjectURL(blob)
    const name = this.editing
      ? this.editing.title
      : `midiBanger-${this._tracks}`
    const id = generateId(name)
    const track: Track = {
      album: this.title,
      cover: this.cover,
      title: name,
      sample: DEFAULT_SAMPLE,
      value: DEFAULT_TRACK_VALUE,
      type: blob.type,
      src,
      id,
    }
    this._tracks++
    this._songs = [...this.songs, track]
    this.editing = undefined
    return track
  }

  remove(track: Track) {
    const idx = this.songs.indexOf(track)
    this._songs.splice(idx, 1)
  }

  updateTrack(idx: number, item: Track) {
    const songs = this.songs
    const song = songs[idx]

    songs.splice(idx, 1, {
      ...song,
      ...item,
    })
    this.songs = songs
  }
}

const generateId = (source: string) => {
  const name = source.trim().replace(/\s/g, "")
  return Buffer.from(uuid(name)).toString()
}
