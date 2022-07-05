export default {
  name: "album",
  title: "Albums",
  type: "document",
  fields: [
    {
      name: "creator",
      title: "Creator",
      description: "user Wallet address",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
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
    {
      name: "year",
      title: "Year",
      description: "Year descriptor",
      type: "number",
    },
    {
      name: "songs",
      title: "Songs",
      type: "array",
      of: [{ type: "track" }],
    },
  ],
}
