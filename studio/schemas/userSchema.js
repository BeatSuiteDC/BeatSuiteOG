export default {
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Addresses",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "bangers",
      title: "Bangers",
      type: "array",
      of: [{ type: "album" }, { type: "track" }],
    },
  ],
}
