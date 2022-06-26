import { computed, makeObservable, observable } from "mobx"
import { AlbumProps, Track } from "../../main/components/Dojo/Album/Album"

export default class Playlist {
  private _queue: Array<AlbumProps | Track>

  constructor() {
    makeObservable<Playlist, "_queue">(this, {
      _queue: observable,
      queue: computed,
    })

    this._queue = []
  }

  get queue() {
    return this._queue
  }

  addNext(item: AlbumProps | Track) {
    this._queue.splice(1, 0, item)
  }
}
