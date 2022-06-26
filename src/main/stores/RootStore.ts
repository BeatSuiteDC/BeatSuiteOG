import { makeObservable, observable } from "mobx"
import Player from "../../common/player"
import Playlist from "../../common/playlist/Playlist"
import Song, { emptySong } from "../../common/song"
import TrackMute from "../../common/trackMute"
import { SerializedState } from "../actions/history"
import Streamer from "../components/Dojo/Streamer/Streamer"
import { GroupOutput } from "../services/GroupOutput"
import { MIDIInput, previewMidiInput } from "../services/MIDIInput"
import { MIDIRecorder } from "../services/MIDIRecorder"
import { SoundFontSynth } from "../services/SoundFontSynth"
import ArrangeViewStore from "./ArrangeViewStore"
import Authentication from "./Authentication"
import { ExportStore } from "./ExportStore"
import HistoryStore from "./HistoryStore"
import { MIDIDeviceStore } from "./MIDIDeviceStore"
import PianoRollStore from "./PianoRollStore"
import { registerReactions } from "./reactions"
import RootViewStore from "./RootViewStore"
import Router from "./Router"
import TempoEditorStore from "./TempoEditorStore"

export interface Services {
  player: Player
  synth: SoundFontSynth
  synthGroup: GroupOutput
  midiInput: MIDIInput
  midiRecorder: MIDIRecorder
  streamer: Streamer
}

export default class RootStore {
  song: Song = emptySong()
  readonly user: Authentication
  readonly router = new Router()
  readonly trackMute = new TrackMute()
  readonly historyStore = new HistoryStore<SerializedState>()
  readonly rootViewStore = new RootViewStore()
  readonly pianoRollStore: PianoRollStore
  readonly arrangeViewStore = new ArrangeViewStore(this)
  readonly tempoEditorStore = new TempoEditorStore(this)
  readonly midiDeviceStore = new MIDIDeviceStore()
  readonly exportStore = new ExportStore(this)
  readonly playlist = new Playlist()

  // readonly auth = new Authentication()

  readonly services: Services

  constructor() {
    makeObservable(this, {
      song: observable.ref,
    })

    const context = new (window.AudioContext || window.webkitAudioContext)()
    const synth = new SoundFontSynth(
      context,
      "https://cdn.jsdelivr.net/gh/ryohey/signal@4569a31/public/A320U.sf2"
    )
    const metronomeSynth = new SoundFontSynth(
      context,
      "https://cdn.jsdelivr.net/gh/ryohey/signal@6959f35/public/A320U_drums.sf2"
    )
    const synthGroup = new GroupOutput()
    synthGroup.outputs.push({ synth, isEnabled: true })

    const player = new Player(synthGroup, metronomeSynth, this.trackMute, this)
    const midiInput = new MIDIInput()
    const midiRecorder = new MIDIRecorder(player, this)
    const streamer = new Streamer(this, this.playlist, this.trackMute)
    this.services = {
      player,
      synth,
      synthGroup,
      midiInput,
      midiRecorder,
      streamer,
    }
    this.pianoRollStore = new PianoRollStore(this)

    const preview = previewMidiInput(this)

    midiInput.onMidiMessage = (e) => {
      preview(e)
      midiRecorder.onMessage(e)
    }

    this.pianoRollStore.setUpAutorun()
    this.arrangeViewStore.setUpAutorun()
    this.tempoEditorStore.setUpAutorun()

    this.user = new Authentication()

    registerReactions(this)
  }
}
