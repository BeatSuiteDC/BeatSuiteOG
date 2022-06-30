import { computed, makeObservable, observable } from "mobx"

import {
  VolumeOffOutlined as volOff,
  VolumeUpOutlined as volUp,
} from "@mui/icons-material"
import ReactPlayer from "react-player"
import Playlist from "../../../../common/playlist/Playlist"
import { Track } from "../Album/Album"
import Looper, { Sample } from "./Looper"

export const DEFAULT_TEMPO = 120

export type Volume = {
  level: number
  image: any
}

export const LIVESTREAM_URL = "https://www.youtube.com/watch?v=_ITiwPMUzho"
export default class Streamer {
  private _currentTempo = DEFAULT_TEMPO
  private _currentTick = 0
  private _isPlaying = false
  private _isMuted = false
  private _volume: Volume
  private _playlist: Playlist

  disableSeek: boolean = false
  livestreamUrl: string
  _audioRef: ReactPlayer | null = null
  _loop: Looper

  constructor(playlist: Playlist) {
    makeObservable<
      Streamer,
      "_currentTick" | "_isPlaying" | "_volume" | "_isMuted"
    >(this, {
      _audioRef: observable,
      _currentTick: observable,
      _isPlaying: observable,
      _volume: observable,
      _isMuted: observable,
      position: computed,
      isPlaying: computed,
      isMuted: computed,
      volume: computed,
      playlist: computed,
      active: computed,
      audio: computed,
      livestreamUrl: observable,
      loop: computed,
      dial: observable,
    })

    this._playlist = playlist
    this._volume = {
      level: 0.35,
      image: volUp,
    }
    this.livestreamUrl = LIVESTREAM_URL
    this._loop = new Looper()
  }

  dial = (decimals: number = 2) => {
    let end = this.audio ? this.audio.getDuration() : 100
    let begin = this.loop.begin
    let current = this.audio ? this.audio.getCurrentTime() : this.position

    const round = (v: number) => {
      const d = 10 ** decimals
      return Math.floor(v * d) / d
    }

    end = round(end)
    begin = round(begin)
    current = round(current)
    return {
      end,
      begin,
      current,
    }
  }

  get audio() {
    return this._audioRef
  }

  set audio(ref: ReactPlayer | null) {
    this._audioRef = ref
  }

  get active() {
    const idx = this._playlist.active
    if (idx === undefined) {
      return undefined
    }
    return this.playlist[idx]
  }

  set active(track: Track | undefined) {
    if (track !== undefined) {
      this._playlist.setActive(track)
    }
  }

  get loop() {
    return this._loop.sample
  }

  set loop(s: Sample) {
    this._loop.sample = {
      ...s,
    }
  }

  get playlist() {
    return [...this._playlist?.queue]
  }

  play() {
    if (!this.canPlay()) {
      console.warn("No tracks in queue.")
      this._isPlaying = false
      return
    }
    if (!this.active) {
      this.active = this.playlist[0]
    }
    this.audio?.setState({ url: this.active.src })
    this._isPlaying = true
  }

  pause() {
    this._isPlaying = false
  }

  skip() {
    const next = this._playlist.next()
    console.log("next", { ...next })
    if (next) {
      this.play()
    } else {
      console.warn("playlist is empty")
    }
  }

  previous() {
    if (this.audio !== null) {
      const currentTime = this.audio.getCurrentTime()
      console.log("currentTime", currentTime)
      if (currentTime > 2.5) {
        this.audio.seekTo(0)
        console.log("resetting track")
        return
      }
    }

    const prev = this._playlist.previous()
    console.log("previous", { ...prev })
    if (prev && this.active != undefined) {
      this.audio?.setState({ url: this.active?.src })
    }
  }

  stop() {
    this.position = 0
    this._playlist.reset()
    this.pause()
  }

  reset() {
    this.stop()
  }

  mute(_mute: boolean) {
    this._isMuted = _mute
    if (_mute) {
      this._volume = {
        level: 0,
        image: volOff,
      }
    } else {
      this._volume.image = volUp
    }
  }

  set position(tick: number) {
    if (this.disableSeek) {
      return
    }

    this._currentTick = tick

    if (this.audio != null) {
      this.loop = {
        ...this.loop,
        current: tick,
      }
      // this.audio?.setState({ played: tick })
    }
  }

  get position() {
    if (this.audio && this.active !== undefined) {
      const current = this.audio.getCurrentTime()
      const duration = this.audio.getDuration()
      let tick = Math.max(current, 0) / duration
      tick = Math.min(tick, duration)
      this._currentTick = tick
      console.log("get tick", tick)
      return tick
    }
    return this._currentTick
  }

  get isPlaying() {
    return this._isPlaying
  }

  get isMuted() {
    return this._isMuted
  }

  get volume() {
    return this._volume
  }

  setVolume(level: number) {
    if (level === 0) {
      this._isMuted = true
      this._volume.image = volOff
    } else {
      this._isMuted = false
      this._volume.level = level
      this._volume.image = volUp
    }
    if (this.active?.data) {
      this.active.data.volume = level
    }
  }

  get currentTempo() {
    return this._currentTempo
  }

  set currentTempo(value: number) {
    this._currentTempo = value
  }

  canPlay() {
    return this.playlist.length > 0
  }

  // tickToMillisec(tick: number) {
  //   return (tick / (this.timebase / 60) / this._currentTempo) * 1000
  // }
}
