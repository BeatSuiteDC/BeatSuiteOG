import * as fs from "fs"
import * as path from "path"
import { serialize, deserialize } from "serializr"

import Song from "./Song"
import { emptySong, songFromMidi } from "./SongFactory"

describe("Song", () => {
  const song = songFromMidi(
    fs.readFileSync(path.join(__dirname, "../../../testdata/tracks.mid"))
  )

  it("fromMidi", () => {
    expect(song).not.toBeNull()
    const { tracks } = song
    expect(tracks.length).toBe(18)

    expect(tracks[0].isConductorTrack).toBeTruthy()
    expect(!tracks[1].isConductorTrack).toBeTruthy()
    expect(tracks[1].channel).toBe(0)
    expect(tracks[2].channel).toBe(0)
    expect(tracks[3].channel).toBe(1)
    expect(tracks[17].channel).toBe(15)

    expect(tracks[0].tempo).toBe(128)
    expect(tracks[2].volume).toBe(100)
    expect(tracks[2].pan).toBe(1)
    expect(tracks[2].programNumber).toBe(29)
  })

  it("should be serializable", () => {
    const song = emptySong()
    song.filepath = "abc"
    const x = serialize(song)
    const s = deserialize(Song, x)
    expect(s.filepath).toBe("abc")
    expect(s.tracks.length).toBe(song.tracks.length)
  })
})