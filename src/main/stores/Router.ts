import { makeObservable, observable } from "mobx"

export type RoutePath =
  | "albums"
  | "uploads"
  | "/track"
  | "/arrange"
  | "/tempo"
  | "home"
  | "feed"

export default class Router {
  path: RoutePath = "/track"

  constructor() {
    makeObservable(this, {
      path: observable,
    })
  }

  pushArrange() {
    this.path = "/arrange"
  }

  pushTrack() {
    this.path = "/track"
  }
}
