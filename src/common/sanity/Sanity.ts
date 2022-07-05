import client from "../../main/lib/sanity"

export type User = {
  address?: string | undefined
  name?: string | undefined
  id?: string | undefined
}

export const sanityUser = async (address: string, name = "Lejihn Daire") => {
  try {
    console.log("Loading sanity user")
    const userDoc = {
      _id: address,
      _type: "user",
      address: address,
      name,
    }
    const result = await client.createIfNotExists(userDoc)
    return <User>{
      address: result.address,
      name: result.name,
      id: result._id,
    }
  } catch (e) {
    console.error(e)
    return undefined
  }
}
