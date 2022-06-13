export const userSchema = {
  name: "user",
  type: "document",
  title: "Users",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "walletAddress",
      type: "string",
      title: "Wallet Address",
    },
    {
      name: "profileImage",
      type: "image",
      title: "Profile Image",
    },
    {
      name: "albums",
      type: "array",
      of: [
        {
          type: "album",
        },
      ],
    },
  ],
};
