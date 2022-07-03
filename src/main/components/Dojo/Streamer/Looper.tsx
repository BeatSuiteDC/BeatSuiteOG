import { computed, makeObservable, observable } from "mobx"

export enum Loop {
  SAMPLE,
  ALL,
  ONE,
  OFF,
}

export interface Sample {
  begin: number
  end: number
  enabled: boolean
  current: number
}

export interface SavedSample extends Sample {
  name: string
}

const DEFAULT_SAMPLE: Sample = {
  begin: 0,
  end: 100,
  enabled: true,
  current: 0,
}

export default class Looper {
  _setting: Loop
  _sample: Sample
  _saved: Set<SavedSample> = new Set([])

  constructor() {
    makeObservable<Looper>(this, {
      _setting: observable,
      _sample: observable,
      sample: computed,
      setting: computed,
    })

    this._setting = Loop.SAMPLE
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

  save = (name: string, s: Sample | undefined) => {
    const sample = s === undefined ? this.sample : s
    const saved: SavedSample = {
      ...sample,
      name,
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
