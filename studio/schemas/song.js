export const songSchema = {
  name: "song",
  type: "document",
  title: "Songs",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      name: "type",
      type: "string",
      descrtiption: "audio file (eg: mp3, url/youtube)",
      title: "Audio type",
    },
    {
      name: "animation_url",
      type: "string",
      title: "Animation url",
    },
    {
      name: "artist",
      type: "string",
      title: "Artist",
    },
    {
      name: "duration",
      type: "string",
      title: "Duration",
    },
  ],
};
