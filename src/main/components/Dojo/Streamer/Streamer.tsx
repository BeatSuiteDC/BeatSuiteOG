import { action, computed, makeObservable, observable } from "mobx"
import ReactPlayer from "react-player"

import Playlist from "../../../../common/playlist/Playlist"
import { EmptyTrack, Track } from "../Album/Album"
import Looper, { Sample } from "./Looper"

export const DEFAULT_TEMPO = 120
export const DEFAULT_VOLUME = 0.35

export const LIVESTREAM_URL = "https://www.youtube.com/watch?v=_ITiwPMUzho"
export default class Streamer {
  private _currentTempo = DEFAULT_TEMPO
  private _currentTick = 0
  private _isPlaying = false
  private _volume: number = DEFAULT_VOLUME
  private _playlist: Playlist

  disableSeek: boolean = false
  livestreamUrl: string
  _audioRef: ReactPlayer | null = null
  _loop = new Looper()

  constructor(playlist: Playlist) {
    makeObservable<Streamer, "_currentTick" | "_isPlaying" | "_volume">(this, {
      livestreamUrl: observable,
      _currentTick: observable,
      _isPlaying: observable,
      _audioRef: observable,
      _volume: observable,
      currentTick: computed,
      isPlaying: computed,
      position: action,
      playlist: computed,
      isMuted: computed,
      volume: computed,
      active: computed,
      dial: observable,
      audio: computed,
      loop: computed,
    })

    this.livestreamUrl = LIVESTREAM_URL
    this._playlist = playlist
  }

  dial = (decimals: number = 2) => {
    if (this.active) {
      let { end, begin } = this.active.sample
      let duration = this.active.duration || 1

      const round = (v: number | 0) => {
        const d = 10 ** decimals
        return Math.floor(v * d) / d
      }

      duration = round(duration)
      begin = Math.max(0, round(begin)) + 0.000001
      end = Math.min(duration, round(end)) - 0.000001

      return {
        duration,
        begin,
        end,
      }
    }
    return {
      duration: 1,
      begin: 0.00001,
      end: 0.999999,
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
      return EmptyTrack
    }
    return this.playlist[idx]
  }

  set active(track: Track) {
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
      console.log("no active track")
      this._isPlaying = false
      return
    }
    if (this.audio === null) return

    this.audio.setState({ url: this.active.src, playing: true })
    this._isPlaying = true
  }

  pause() {
    this._isPlaying = false
  }

  skip() {
    const next = this._playlist.next()
    console.log("next", next?.title)
    if (next) {
      this.play()
    } else {
      console.warn("playlist is empty")
      this.stop()
    }
  }

  previous() {
    if (this.audio !== null) {
      const currentTime = this.audio.getCurrentTime()
      console.log("currentTime", currentTime)
      if (currentTime > 2.5) {
        this.currentTick = 0
        console.log("resetting track")
        return
      }
    }

    const prev = this._playlist.previous()
    console.log("previous", prev?.title)
    if (prev && this.active != undefined) {
    }
    this.audio?.setState({ url: this.active?.src })
  }

  stop() {
    this.currentTick = 0
    this._playlist.reset()
    this.pause()
  }

  reset() {
    this.stop()
  }

  mute(_mute: boolean) {
    if (_mute) {
      this._volume = 0
    } else if (this.volume === 0) {
      this.volume = 0.35
    }
  }

  set currentTick(tick: number) {
    if (this.disableSeek) {
      return
    }

    if (this.audio !== null) {
      const duration = this.audio.getDuration()
      const progress = Math.min(tick / duration, 1)

      console.log("set-progress", { progress, duration, tick })
      this.audio.setState({ played: progress, seeking: false })
      this.audio.seekTo(progress, "fraction")
    }
    this._currentTick = tick
  }

  get currentTick() {
    return this._currentTick
  }

  position = () => {
    if (this.audio !== null) {
      const current = this.audio.getCurrentTime()
      this._currentTick = current
    }

    return this._currentTick
  }

  get isPlaying() {
    if (this.active === undefined) {
      return false
    }
    return this._isPlaying
  }

  get isMuted() {
    return this.volume === 0
  }

  get volume() {
    return this._volume
  }

  set volume(level: number) {
    this._volume = level
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
}
