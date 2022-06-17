// import { Carousel } from "@sefailyasoz/react-carousel"
import styled from "@emotion/styled"
import { Tabs } from "antd"
import AntdCSS from "./AntdCSS"
const { TabPane } = Tabs

type Album = {
  src: string
  cover: string
  album: string
  song: string
  duration: string
}
const bears = [
  {
    src: "https://ipfs.moralis.io:2053/ipfs/Qmf8xEYZdMtQXYv56VxxmzbtUtEVjmaFaXGCgcBqGXDAA6/music/JTwinkle.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/69/B.o.B_-_Strange_Clouds_-_LP_Cover.jpg",
    album: "Strange Clouds",
    song: "Airplanes",
    duration: "0:05",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Side To Side",
    duration: "0:16",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Pizza and A Coke",
    duration: "5:01",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Iceberg Lettuce",
    duration: "0:24",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Spitting Chicklets",
    duration: "1:03",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Boomerang",
    duration: "2:16",
  },
]
const Container = styled.div`
  background: red;
  width: 100%;
  height: 100%;
`
const Title = styled.h1`
  color: white;
  font-size: 35px;
  font-weight: 600;
  justify-content: center;
  display: flex;
  letter-spacing: 2px;
  margin-top: 20px;
  margin-bottom: 30px;
`
const AlbumsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  gap: 20px;
  row-gap: 50px;
  -webkit-box-pack: start;
`
const Img = styled.img``
const AlbumSelection = styled.div`
  color: rgb(205, 203, 203);
  text-align: center;
  transition: transform 0.4s;
  :hover {
    color: white;
    transform: scale(1.05);
  }
`

const Featured = () => {
  return (
    <>
      <AntdCSS />

      <AlbumsDiv>
        {bears.map((e: Album) => (
          <AlbumSelection>
            <Img
              src={e.cover}
              style={{ width: "150px", marginBottom: "10px" }}
            ></Img>
            <p>{e.album}</p>
          </AlbumSelection>
        ))}
      </AlbumsDiv>
      {/* <Tabs defaultActiveKey="1">
        <TabPane tab="FEATURED" key="1">
          
        </TabPane>
      </Tabs> */}
    </>
  )
}

export default Featured
