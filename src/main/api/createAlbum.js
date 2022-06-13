import sanityClient from "../lib/sanity";

export default async (req, res) => {
  const { title, userAddress, cover } = req.body;

  const albumDoc = {
    _type: "album",
    _id: `${title.replace(/\s/g, "")}-${userAddress}`,
    cover: cover,
    title: title,
    artist: userAddress,
  };

  try {
    await sanityClient.createIfNotExists(albumDoc);

    res.status(200).send("Successful");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
