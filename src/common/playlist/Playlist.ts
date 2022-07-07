import { computed, makeObservable, observable } from "mobx"
import { Track } from "../../main/components/Dojo/Album/Album"

export default class Playlist {
  private _queue: Track[] = []
  private _active: number | undefined

  constructor() {
    makeObservable<Playlist, "_queue" | "_active">(this, {
      _queue: observable,
      _active: observable,
      next: observable,
      previous: observable,
      setActive: observable,
      inQueue: observable,
      addNext: observable,
      remove: observable,
      reset: observable,
      skipTo: observable,
      shift: observable,
      queue: computed,
      active: computed,
    })
  }

  get queue() {
    return [...this._queue]
  }

  get active() {
    if (this.queue.length === 0) {
      this._active = undefined
    } else if (this._active === undefined) {
      this._active = 0
    }
    return this._active
  }

  setActive = (item: Track) => {
    if (this.active === undefined) {
      this.shift(item, 0)
      this._active = 0
      console.log("starting queue with", item.title)
      return
    }

    const q = this.queue
    const current = { ...q[this.active] }

    if (current.id === item.id) {
      console.warn("track active already")
      return
    }

    const idx = this.index(item)
    if (idx != -1 && idx >= this.active) {
      console.debug(item.title, "is queued already ->", idx)
      this.shift(item, this.active)
      return
    }

    console.log({ idx })
    q.splice(this.active, 0, item)
    this._queue = [...q]
  }

  inQueue = (item: Track) => {
    const q = this.queue
    console.log("inqueue - id", item.id)
    return q.some((t) => {
      return t.id === item.id
    })
  }

  addNext = (item: Track) => {
    const queue = this.queue
    if (this.inQueue(item)) {
      console.warn("Track already in queue")
      return
    }
    console.log("queue before", [...queue])
    queue.splice(1, 0, { ...item })

    this._queue = [...queue]
    console.log("after", [...queue])
  }

  addToQueue = (item: Track) => {
    console.log("adding track", item.title, item.id)
    this._queue = [...this.queue, item]
  }

  index(item: Track) {
    return this.queue.findIndex((t) => t.id === item.id)
  }

  remove = (track: Track) => {
    const q = [...this.queue]
    const idx = this.index(track)
    if (this.active === idx) {
      this._active = idx - 1 >= 0 ? idx - 1 : idx
    } else if (this.active && idx < this.active) {
      this._active = this.active - 1
    }
    this._queue.splice(idx, 1)
  }

  reset() {
    this._active = undefined
    this._queue = []
  }

  next = () => {
    const q = this.queue
    const idx = this.active
    if (idx !== undefined && idx + 1 < q.length) {
      this._active = idx + 1
      const n = q[this._active]
      console.log("skipping to", n.title)
      return { ...n }
    }
  }

  previous = () => {
    const idx = this.active
    if (idx && idx - 1 >= 0) {
      this._active = idx - 1
      const p = this.queue[this._active]
      return { ...p }
    }
  }

  shift = (item: Track, idx?: number) => {
    if (!idx) {
      idx = this.queue.length - 1
    }

    const q = this.queue

    if (this.inQueue(item)) {
      const oldIdx = this.index(item)
      if (oldIdx < (this.active || 0)) q.splice(oldIdx, 1)
    }

    q.splice(idx, 0, item)
    this._queue = [...q]
  }

  skipTo = (desired: number) => {
    if (desired === -1) {
      console.warn("Track not in queue?")
      return
    }
    const track = this.queue[desired]
    const idx = this.index(track)
    console.log("skippping to", idx, "old active", this._active)
    this._active = idx !== undefined ? idx : this.active
  }
}
