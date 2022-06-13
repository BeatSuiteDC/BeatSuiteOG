export const albumQuery = `*[_type == "album"] {
  title,
  cover,
  contract,
  artist,
  songs
}`;

export const usersQuery = `*[_type == "user"] {
  name,
  email,
  walletAddress,
  "image": profileImage.asset->url,
  albums
}`;
