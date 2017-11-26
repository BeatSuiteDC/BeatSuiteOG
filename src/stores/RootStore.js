import { json } from "json-mobx"

import Song from "./Song"
import TrackMute from "./TrackMute"
import PlayerStore from "./PlayerStore"
import HistoryStore from "./HistoryStore"
import RootViewStore from "./RootViewStore"
import PianoRollStore from "./PianoRollStore"
import ArrangeViewStore from "./ArrangeViewStore"
import TempoEditorStore from "./TempoEditorStore"

import Player from "../services/Player"
import Quantizer from "../services/Quantizer"
import SynthOutput from "../services/SynthOutput"
import { TIME_BASE } from "../Constants"

import createDispatcher from "../createDispatcher"

export default class RootStore {
  song = Song.emptySong()
  trackMute = new TrackMute()
  playerStore = new PlayerStore()
  historyStore = new HistoryStore()
  rootViewStore = new RootViewStore()
  pianoRollStore = new PianoRollStore()
  arrangeViewStore = new ArrangeViewStore()
  tempoEditorStore = new TempoEditorStore()

  services = {}

  constructor() {
    const player = new Player(TIME_BASE, new SynthOutput(), this.trackMute)
    const quantizer = new Quantizer(TIME_BASE)
    this.services = { player, quantizer }
  }

  get dispatch() {
    return createDispatcher(this)
  }

  serializeUndoableState() {
    return json.save(this.song)
  }

  restoreState(serializedState) {
    json.load(this.song, serializedState)
  }

  pushHistory() {
    this.historyStore.push(this.serializeUndoableState())
  }

  undo() {
    const currentState = json.save(this.serializeUndoableState())
    const nextState = this.historyStore.undo(currentState)
    this.restoreState(nextState)
  }

  redo() {
    const currentState = json.save(this.serializeUndoableState())
    const nextState = this.historyStore.redo(currentState)
    this.restoreState(nextState)
  }
}