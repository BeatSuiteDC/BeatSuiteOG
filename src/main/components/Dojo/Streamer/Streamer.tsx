import { computed, makeObservable, observable } from "mobx"
import EventScheduler from "../../../../common/player/EventScheduler"
import TrackMute from "../../../../common/trackMute"
import { SongStore } from "../../../stores/SongStore"

import { PlayerEvent } from "../../../../common/player/PlayerEvent"

import muteBtn from "../../../images/mute.png"
import volumeOnBtn from "../../../images/volumeOn.png"

export interface LoopSetting {
  begin: number
  end: number
  enabled: boolean
}

export const DEFAULT_TEMPO = 120
export const DEFAULT_LIVESTREAM =
  "https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl"

export type ButtonClass = {
  class1: "PlayPause" | "PlayPause2"
  class2: "playBtn" | "playBtn2"
}

export type PauseScreen = "pauseScreen" | "unpauseScreen"

export type Volume = {
  level: number
  mute: "volumeOn" | "volumeOff"
  image?: any
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

  disableSeek: boolean = false
  isMetronomeEnabled: boolean = false

  loop: LoopSetting | null = null

  constructor(songStore: SongStore, trackMute: TrackMute) {
    makeObservable<
      Streamer,
      "_currentTick" | "_isPlaying" | "_volume" | "_isMuted"
    >(this, {
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
      image: volumeOnBtn,
    }
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
        image: muteBtn,
      }
    } else {
      // will set level higher up where this was called
      this._volume.image = volumeOnBtn
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
      this._volume.image = muteBtn
    } else {
      this._volume.level = level
      this._volume.image = volumeOnBtn
      this._volume.mute = "volumeOn"
    }
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
