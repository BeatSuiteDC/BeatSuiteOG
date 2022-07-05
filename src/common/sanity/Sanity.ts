import { AlbumProps, Track } from "../../main/components/Dojo/Album/Album"
import client from "../../main/lib/sanity"

export type User = {
  address?: string | undefined
  name?: string | undefined
  id?: string | undefined
}

export const loadAlbums = async (address: string) => {
  try {
    console.log("Loading albums")

    const result = await client.fetch(
      `*[_type == "album" && creator == ${address}]`
    )
    return result
  } catch (e) {
    console.error(e)
    return undefined
  }
}
export const sanityUser = async (address: string, name = "Lejihn Daire") => {
  try {
    console.log("Loading sanity user")
    const userDoc = {
      _id: address,
      _type: "user",
      address: address,
    }
    const result = await client.createIfNotExists(userDoc)
    return <User>{
      address: result.address,
      id: result._id,
      name,
    }
  } catch (e) {
    console.error(e)
    return undefined
  }
}
export const uploadAlbum = async (
  address: string,
  album: AlbumProps,
  _songs: Promise<(Track | undefined)[]>
) => {
  let songs = await _songs
  try {
    console.log("Uploading Album")
    const albumDoc = {
      _type: "album",
      creator: address,
      ...album,
      songs,
    }
    const uploadedAlbum = await client.create(albumDoc)
    // const result = await client.patch({id: address,
    // set: {}})
    return uploadedAlbum
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const updateUser = async () => {}
