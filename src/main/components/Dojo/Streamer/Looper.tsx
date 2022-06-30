import { computed, makeObservable } from "mobx"

export enum Loop {
  ALL,
  ONE,
  OFF,
  SAMPLE,
}

export interface Sample {
  begin: number
  end: number
  enabled: boolean
}

export interface SavedSample extends Sample {
  src: string
}

const DEFAULT_SAMPLE: Sample = {
  begin: 0,
  end: 1,
  enabled: true,
}

export default class Looper {
  _setting: Loop
  _sample: Sample

  _saved: Set<SavedSample> = new Set([])

  constructor() {
    makeObservable<Looper>(this, {
      sample: computed,
      setting: computed,
    })

    this._setting = Loop.ONE
    this._sample = DEFAULT_SAMPLE
  }

  set sample(s: Sample) {
    this._sample = s
  }

  get sample() {
    return this._sample
  }

  get setting() {
    return this._setting
  }

  set setting(_setting: Loop) {
    this._setting = _setting
  }

  save = (src: string, s: Sample | undefined) => {
    const sample = s === undefined ? this.sample : s
    const saved: SavedSample = {
      ...sample,
      src,
    }
    this._saved.add(saved)
    return
  }

  load = (src: string) => {
    return this._saved.size
  }

  clear = () => {
    this.sample = DEFAULT_SAMPLE
  }
}
