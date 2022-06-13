import sanityClient from "../lib/sanity";

export default async (req, res) => {
  const { userAddress } = req.body;

  const userDoc = {
    _type: "user",
    _id: `${userAddress}-user`,
    name: "unnamed",
    email: "",
    walletAddress: userAddress,
    profileImage: null,
    albums: [],
  };

  try {
    await sanityClient.createIfNotExists();

    res.status(200).send("Successful");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
