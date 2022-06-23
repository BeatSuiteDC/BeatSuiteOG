import { computed, makeObservable, observable } from "mobx"
import EventScheduler from "../../../../common/player/EventScheduler"
import TrackMute from "../../../../common/trackMute"
import { SongStore } from "../../../stores/SongStore"

import { PlayerEvent } from "../../../../common/player/PlayerEvent"

import {
  VolumeOffOutlined as volOff,
  VolumeUpOutlined as volUp,
} from "@mui/icons-material"
import { AlbumProps } from "../Album/Album"

export interface LoopSetting {
  begin: number
  end: number
  enabled: boolean
}

export const DEFAULT_ALBUM: AlbumProps = {
  songs: [],
  cover:
    "https://upload.wikimedia.org/wikipedia/en/6/69/B.o.B_-_Strange_Clouds_-_LP_Cover.jpg",
  title: "Strange Clouds",
  year: 2022,
  artist: "B.O.B",
}
export const DEFAULT_TEMPO = 120
export const DEFAULT_LIVESTREAM =
  "https://www.youtube.com/embed/MlnNZV7Jujs?autoplay=1&mute=1&start=1"

export type ButtonClass = {
  class1: "PlayPause" | "PlayPause2"
  class2: "playBtn" | "playBtn2"
}

export type PauseScreen = "pauseScreen" | "unpauseScreen"

export type Volume = {
  level: number
  mute: "volumeOn" | "volumeOff"
  image: any
}

export default class Streamer {
  private _currentTempo = DEFAULT_TEMPO
  private _scheduler: EventScheduler<PlayerEvent> | null = null
  private _songStore: SongStore
  private _trackMute: TrackMute
  private _interval: number | null = null
  private _currentTick = 0
  private _isPlaying = false
  private _isMuted = false

  private _btnClass: ButtonClass
  private _pauseScreen: PauseScreen

  private _liveStream = true
  private _liveStreamUrl = ""
  private _youtubeChannel = ""
  private _playPauseImg: any
  private _volume: Volume

  private _album: AlbumProps

  disableSeek: boolean = false
  isMetronomeEnabled: boolean = false

  loop: LoopSetting | null = null

  constructor(songStore: SongStore, trackMute: TrackMute) {
    makeObservable<
      Streamer,
      "_currentTick" | "_isPlaying" | "_volume" | "_isMuted" | "_album"
    >(this, {
      _album: observable,
      _currentTick: observable,
      _isPlaying: observable,
      _volume: observable,
      _isMuted: observable,
      loop: observable,
      position: computed,
      isPlaying: computed,
      isMuted: computed,
      volume: computed,
      buttonClass: computed,
      liveStreamUrl: computed,
      isLiveStreaming: computed,
      currentAlbum: computed,
    })

    this._trackMute = trackMute
    this._songStore = songStore
    this._liveStreamUrl = DEFAULT_LIVESTREAM
    this._btnClass = {
      class1: "PlayPause",
      class2: "playBtn",
    }
    this._pauseScreen = "pauseScreen"
    this._volume = {
      level: 0.35,
      mute: "volumeOn",
      image: volUp,
    }

    this._album = DEFAULT_ALBUM
  }

  private get song() {
    return this._songStore.song
  }

  private get timebase() {
    return this.song.timebase
  }

  play() {
    if (this.isPlaying) {
      console.warn("called play() while playing. aborted.")
      return
    }

    this._isPlaying = true
    this._liveStream = true
    this._pauseScreen = "unpauseScreen"
    this._btnClass = {
      class1: "PlayPause",
      class2: "playBtn",
    }
  }

  pause() {
    if (!this.isPlaying) {
      console.warn("called pause() while paused. aborted.")
      return
    }

    this._isPlaying = false
    this._pauseScreen = "pauseScreen"
    this._btnClass = {
      class1: "PlayPause2",
      class2: "playBtn2",
    }
  }

  stop() {
    this._scheduler = null
    // this.allSoundsOff()
    this.pause()
    this._isPlaying = false

    if (this._interval !== null) {
      clearInterval(this._interval)
      this._interval = null
    }
  }

  reset() {
    // this.resetControllers()
    this.stop()
    this._currentTick = 0
  }

  mute(_mute: boolean) {
    this._isMuted = _mute
    if (_mute) {
      this._volume = {
        level: 0,
        mute: "volumeOff",
        image: volOff,
      }
    } else {
      // will set level higher up where this was called
      this._volume.image = volUp
      this._volume.mute = "volumeOn"
    }
  }

  set position(tick: number) {
    if (!Number.isInteger(tick)) {
      console.warn("Player.tick should be an integer", tick)
    }
    if (this.disableSeek) {
      return
    }
    tick = Math.min(Math.max(Math.floor(tick), 0), this.song.endOfSong)
    if (this._scheduler) {
      this._scheduler.seek(tick)
    }
    this._currentTick = tick

    if (this.isPlaying) {
      // this.allSoundsOff()
    }

    // this.sendCurrentStateEvents()
  }

  get position() {
    return this._currentTick
  }

  get isPlaying() {
    return this._isPlaying
  }

  get isMuted() {
    return this._isMuted
  }

  get buttonClass() {
    return this._btnClass
  }

  get liveStreamUrl() {
    return this._liveStreamUrl
  }

  get volume() {
    return this._volume
  }

  setVolume(level: number) {
    if (level === 0) {
      this._isMuted = true
      this._volume.mute = "volumeOff"
      this._volume.image = volOff
    } else {
      this._isMuted = false
      this._volume.level = level
      this._volume.mute = "volumeOn"
      this._volume.image = volUp
    }
  }

  get currentAlbum() {
    return this._album
  }

  setAlbum(album: AlbumProps) {
    this._album = album
  }

  get isLiveStreaming() {
    return this._liveStream
  }

  get currentTempo() {
    return this._currentTempo
  }

  set currentTempo(value: number) {
    this._currentTempo = value
  }

  tickToMillisec(tick: number) {
    return (tick / (this.timebase / 60) / this._currentTempo) * 1000
  }
}
