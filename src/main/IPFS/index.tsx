import { create, IPFSHTTPClient } from "ipfs-http-client"

const projectId = process.env.REACT_APP_IPFS_ID
const projectSecret = process.env.REACT_APP_IPFS_SECRET
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

const ipfs = async (file: any) => {
  console.log("uploading to IPFS")
  let client: IPFSHTTPClient | undefined

  try {
    client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    })

    const { path } = await client.add(file)

    return path
  } catch (error) {
    console.error("IPFS error", error)
    client = undefined
  }
}

export default ipfs
