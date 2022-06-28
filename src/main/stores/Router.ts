import { makeObservable, observable } from "mobx"

export type RoutePath =
  | "albums"
  | "upload"
  | "/track"
  | "/arrange"
  | "/tempo"
  | "home"
  | "feed"
  | "sampler"
  | "dojo"
  | "bangers"
export default class Router {
  path: RoutePath = "upload"

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
