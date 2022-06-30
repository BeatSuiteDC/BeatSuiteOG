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

  setActive(item: Track) {
    const active = this._active

    if (active === item) {
      console.warn("track active already")
      return
    }

    const q = this.queue
    const idx = q.indexOf(item)
    const nextIdx = active ? q.indexOf(active) : 0
    if (idx != -1) {
      q.splice(idx, 1)
    }

    q.splice(nextIdx, 0, item)

    const tracks = this.queue.length
    console.log({ active, tracks })

    this._queue = [...q]
    this._active = item
    console.log("match now", item === this._active)
  }

  inQueue(item: Track) {
    const q = this.queue
    return q.includes(item)
  }

  addNext(item: Track) {
    const queue = this.queue
    console.log("state", this.queue.length)
    if (this.inQueue(item)) {
      console.warn("Track already in queue")
      return
    }
    queue.splice(1, 0, item)

    this._queue = [...queue]
    console.log("queue", queue.length)
    console.log("state", this.queue.length)
  }

  remove(item: Track) {
    const q = this.queue
    const idx = q.indexOf(item)
    if (!this.inQueue(item) || idx === -1) {
      console.warn("track not in queue")
      return
    }
    if (this.active === item) {
      console.log("skipping to next track")
      this.setActive(q[idx + 1])
    }
    q.splice(idx, 1)
    this._queue = q
  }

  reset() {
    this._active = undefined
    this._queue = []
  }

  toAudioList(): Array<ReactJkMusicPlayerAudioListProps> {
    const queue = this.queue

    return queue.map((i) => {
      return {
        name: i.title,
        musicSrc: i.src ? i.src : "",
        cover: i.cover,
      }
    })
  }
}
