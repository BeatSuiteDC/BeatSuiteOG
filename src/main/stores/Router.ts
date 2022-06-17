import { makeObservable, observable } from "mobx"

export type RoutePath =
  | "/albums"
  | "/uploads"
  | "/track"
  | "/arrange"
  | "/tempo"
  | "/home"

export default class Router {
  path: RoutePath = "/home"

  constructor() {
    makeObservable(this, {
      path: observable,
    })
  }

  pushArrange() {
    this.path = "/arrange"
  }

  pushTrack() {
    this.path = `/track`
  }
}
