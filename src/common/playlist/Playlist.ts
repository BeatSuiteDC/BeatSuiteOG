import { computed, makeObservable, observable } from "mobx"
import { AlbumProps, Track } from "../../main/components/Dojo/Album/Album"

type PlaylistItem = AlbumProps | Track
export default class Playlist {
  private _queue: PlaylistItem[]
  private _active: PlaylistItem | undefined

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

  set active(item: PlaylistItem) {
    if (this._active) {
      const index = this._queue.indexOf(this._active)
      this._queue.splice(index, 0, item)
    } else {
      this._queue.unshift(item)
    }
    this._active = item
  }

  inQueue(item: PlaylistItem) {
    return this._queue.find((x) => x == item)
  }

  addNext(item: PlaylistItem) {
    this._queue.splice(1, 0, item)
  }
}
