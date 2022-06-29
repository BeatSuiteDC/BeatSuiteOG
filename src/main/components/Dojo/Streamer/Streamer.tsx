import { computed, makeObservable, observable } from "mobx"

import {
  VolumeOffOutlined as volOff,
  VolumeUpOutlined as volUp,
} from "@mui/icons-material"
import Playlist from "../../../../common/playlist/Playlist"
import { Track } from "../Album/Album"
import { defaultOptions, Player } from "../Audio/JankePlayer"

export interface LoopSetting {
  begin: number
  end: number
  enabled: boolean
}

export const DEFAULT_TEMPO = 120

export type Volume = {
  level: number
  image: any
}

export default class Streamer {
  private _currentTempo = DEFAULT_TEMPO
  private _currentTick = 0
  private _isPlaying = false
  private _isMuted = false
  private _volume: Volume
  private _playlist: Playlist
  private _options: Player = defaultOptions

  disableSeek: boolean = false

  loop: LoopSetting | null = null

  constructor(playlist: Playlist) {
    makeObservable<
      Streamer,
      "_options" | "_currentTick" | "_isPlaying" | "_volume" | "_isMuted"
    >(this, {
      _options: observable,
      _currentTick: observable,
      _isPlaying: observable,
      _volume: observable,
      _isMuted: observable,
      loop: observable,
      position: computed,
      isPlaying: computed,
      isMuted: computed,
      volume: computed,
      options: computed,
      playlist: computed,
      active: computed,
    })

    this._playlist = playlist
    this._volume = {
      level: 0.35,
      image: volUp,
    }
  }

  get active() {
    return this._playlist.active
  }

  set active(track: Track) {
    this._playlist.setActive(track)
  }

  get playlist() {
    return [...this._playlist.queue]
  }

  get options() {
    return {
      ...this._options,
    }
  }

  set options(_options: object) {
    this.options = {
      ...this.options,
      ..._options,
    }
  }

  play() {
    if (!this.playlist) {
      console.warn("No tracks in queue.")
      this._isPlaying = false
      return
    }
    if (!this.active) {
      this.active = this.playlist[0]
    }
    this._isPlaying = true
  }

  pause() {
    if (!this.isPlaying) {
      console.warn("called pause() while paused. aborted.")
      return
    }

    this._isPlaying = false
  }

  stop() {
    this._currentTick = 0
    // this.allSoundsOff()
    this.pause()
  }

  reset() {
    // this.resetControllers()
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
    if (!Number.isInteger(tick)) {
      console.warn("Player.tick should be an integer", tick)
    }
    if (this.disableSeek) {
      return
    }
    tick = Math.min(Math.max(Math.floor(tick), 0))

    this._currentTick = tick

    if (this.isPlaying) {
      // this.allSoundsOff()
    }
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
  }

  get currentTempo() {
    return this._currentTempo
  }

  set currentTempo(value: number) {
    this._currentTempo = value
  }

  // tickToMillisec(tick: number) {
  //   return (tick / (this.timebase / 60) / this._currentTempo) * 1000
  // }
}
