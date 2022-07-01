import { computed, makeObservable, observable } from "mobx"
import { Track } from "../../main/components/Dojo/Album/Album"

export default class Playlist {
  private _queue: Track[]
  private _active: number | undefined
  private _unmount: null | SVGSVGElement

  constructor() {
    makeObservable<Playlist, "_unmount" | "_queue" | "_active">(this, {
      _queue: observable,
      _unmount: observable,
      _active: observable,
      next: observable,
      previous: observable,
      setActive: observable,
      inQueue: observable,
      addNext: observable,
      remove: observable,
      reset: observable,
      queue: computed,
      active: computed,
      unmount: computed,
    })

    this._queue = []
    this._unmount = null
  }

  get unmount() {
    return this._unmount
  }

  set unmount(_unmount: null | SVGSVGElement) {
    this._unmount = _unmount
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
      this._queue.unshift(item)
      this._active = 0
      console.log("starting queue with", item.title)
      return
    }

    const q = this.queue
    const active = { ...q[this.active] }

    if (active == { ...item }) {
      console.warn("track active already")
      return
    }
    console.log("active != {..item}")

    const inQueue = this.inQueue({ ...item })
    const idx = q.indexOf({ ...item })
    if (idx != -1) {
      console.debug(item.title, "is queued already ->", idx)
      q.splice(idx, 1)
    }

    console.log({ inQueue, idx })
    q.splice(this.active, 0, { ...item })
    this._queue = [...q]
  }

  inQueue = (item: Track) => {
    const q = this.queue

    return q.some((t) => {
      return t.title === item.title && t.album === item.album
    })
  }

  addNext = (item: Track) => {
    const queue = this.queue
    if (this.inQueue({ ...item })) {
      console.warn("Track already in queue")
      return
    }
    console.log("queue before", [...queue])
    queue.splice(1, 0, { ...item })

    this._queue = [...queue]
    console.log("after", [...queue])
  }

  addToQueue = (item: Track) => {
    console.log("adding track", item.title)
    this._queue = [...this.queue, item]
  }

  remove = (track: Track) => {
    const q = [...this.queue]
    const idx = q.findIndex(
      (x) => x.title === track.title && x.album === track.album
    )
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
}
