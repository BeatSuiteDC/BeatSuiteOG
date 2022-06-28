import { computed, makeObservable, observable } from "mobx"
import { ReactJkMusicPlayerAudioListProps } from "react-jinke-music-player"
import { Track } from "../../main/components/Dojo/Album/Album"

export default class Playlist {
  private _queue: Track[]
  private _active: Track | undefined

  constructor() {
    makeObservable<Playlist, "_queue" | "_active">(this, {
      _queue: observable,
      _active: observable,
      queue: computed,
      active: computed,
    })

    this._queue = []
  }

  get queue() {
    return [...this._queue]
  }

  get active() {
    return this._active || this._queue[0]
  }

  set active(item: Track) {
    if (this._active) {
      const index = this._queue.indexOf(this._active)
      this._queue.splice(index, 0, item)
    } else {
      this._queue.unshift(item)
    }
    this._active = item
  }

  inQueue(item: Track) {
    return this._queue.find((x) => x == item)
  }

  addNext(item: Track) {
    this._queue.splice(1, 0, item)
  }

  audioList(): Array<ReactJkMusicPlayerAudioListProps> {
    const queue = this.queue
    return queue.map((i) => {
      return {
        name: i.title,
        musicSrc: i.src,
        cover: i.cover,
      }
    })
  }
}
