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
    return this.queue.includes(item)
  }

  addNext(item: Track) {
    const queue = this.queue

    if (this.inQueue(item)) {
      console.warn("Track already in queue")
      return
    }
    queue.splice(1, 0, item)
    this._queue = [...queue]
  }

  remove(item: Track) {
    const q = this.queue
    console.log("length", this._queue.length)
    const idx = q.indexOf(item)
    if (!this.inQueue(item) || idx === -1) {
      console.warn("track not in queue")
      return
    }
    if (this.active === item) {
      console.log("skipping to next track")
      this.active = q[idx + 1]
    }
    q.splice(idx, 1)
    this._queue = q
    console.log("length", this._queue.length)
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
