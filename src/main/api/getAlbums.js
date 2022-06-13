import sanityClient from "../lib/sanity";

const query = `*[_type == "album"] {
  title,
  cover,
  contract,
  artist,
  songs
}`;
