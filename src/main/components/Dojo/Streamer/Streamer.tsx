import { computed, makeObservable, observable } from "mobx"

import {
  VolumeOffOutlined as volOff,
  VolumeUpOutlined as volUp,
} from "@mui/icons-material"
import {
  ReactJkMusicPlayerAudioListProps,
  ReactJkMusicPlayerInstance,
} from "react-jinke-music-player"
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

export const LIVESTREAM_URL = "https://www.youtube.com/watch?v=_ITiwPMUzho"
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

  audio: ReactJkMusicPlayerInstance | undefined

  livestreamUrl: string

  constructor(playlist: Playlist) {
    makeObservable<
      Streamer,
      "_options" | "_currentTick" | "_isPlaying" | "_volume" | "_isMuted"
    >(this, {
      audio: observable,
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
      livestreamUrl: observable,
    })

    this._playlist = playlist
    this._volume = {
      level: 0.35,
      image: volUp,
    }
    this.livestreamUrl = LIVESTREAM_URL
  }

  get active() {
    return this._playlist.active
  }

  set active(track: Track) {
    this._playlist.setActive(track)
  }

  get playlist() {
    return [...this._playlist?.queue]
  }

  get options() {
    const onAudioEnded = (
      currentPlayId: any,
      audioLists: ReactJkMusicPlayerAudioListProps[],
      audioInfo: any
    ) => {
      console.log("Audio ended", { currentPlayId, audioInfo })
      if (audioLists.length == 0) {
        console.log("Playlist empty, stopping")
        this.stop()
      }
    }

    return {
      ...this._options,
      onAudioEnded,
    }
  }

  set options(_options: object) {
    this.options = {
      ...this.options,
      ..._options,
    }
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
    this.audio?.play()
    this._isPlaying = true
  }

  pause() {
    this.audio?.pause()
    this._isPlaying = false
  }

  stop() {
    this.position = 0
    this._playlist.reset()
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
    this.audio ? (this.audio.volume = level) : null
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
