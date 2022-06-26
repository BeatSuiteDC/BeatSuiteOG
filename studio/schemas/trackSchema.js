export default {
  name: "track",
  title: "Tracks",
  type: "document",
  fields: [
    {
      name: "src",
      title: "Source",
      type: "string",
    },
    {
      name: "album",
      title: "Album",
      type: "album",
    },
    {
      name: "artist",
      title: "Artist",
      type: "string",
    },
    {
      name: "cover",
      title: "Cover",
      description: "ipfs url hash",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
    },
    {
      name: "contract",
      title: "Contract",
      description: "Contract address",
      type: "string",
    },
    {
      name: "chainId",
      title: "Chain ID",
      description: "Chain ID used if minted",
      type: "string",
    },
  ],
}
