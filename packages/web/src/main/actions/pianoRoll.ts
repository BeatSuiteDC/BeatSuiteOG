import {
  open as openContextMenu,
  PianoContextMenuParams
} from "containers/PianoRollEditor/PianoRoll/PianoContextMenu"
import { IPoint } from "common/geometry"
import RootStore from "../stores/RootStore"

export const CHANGE_CURSOR = Symbol()
export const SCROLL_BY = Symbol()
export const OPEN_CONTEXT_MENU = Symbol()
export const SET_CONTROL_MODE = Symbol()
export const TOGGLE_TOOL = Symbol()

export default ({ dispatch, pianoRollStore: s }: RootStore) => {
  return {
    [CHANGE_CURSOR]: (cursor: string) => {
      s.notesCursor = cursor
    },

    [SCROLL_BY]: ({ x, y }: IPoint) => {
      s.scrollLeft = s.scrollLeft - x
      s.scrollTop = s.scrollTop - y
    },

    [OPEN_CONTEXT_MENU]: (params: PianoContextMenuParams) => {
      openContextMenu(dispatch, params)
    },

    [SET_CONTROL_MODE]: (name: string) => {
      s.controlMode = name
    },

    [TOGGLE_TOOL]: () => {
      s.mouseMode = s.mouseMode === 0 ? 1 : 0
    }
  }
}