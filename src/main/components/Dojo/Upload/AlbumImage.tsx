import styled from "@emotion/styled"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { observer } from "mobx-react-lite"
import { ChangeEvent, useRef } from "react"
import { useStores } from "../../../hooks/useStores"

const Container = styled.div`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 20px;
  :hover > #cover {
    scale: 1.05;
    opacity: 0.5;
    border: 15px solid ${({ theme }) => theme.secondaryTextColor};
  }
  :hover > #icon {
    opacity: 1;
  }
`
const Cover = styled.img`
  width: 200px;
  height: 200px;
  transition: 100ms ease;
`
const AlbumImage = observer(() => {
  const { album } = useStores()
  const imgRef = useRef<HTMLInputElement>(null)

  const triggerInput = () => {
    imgRef.current?.click()
  }

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.item(0)
    if (img) {
      album.cover = URL.createObjectURL(img)
      console.log("Album cover", album.cover)
    }
  }
  return (
    <Container onClick={triggerInput}>
      <Cover id="cover" src={album.cover} alt="albumCover" />
      <AddPhotoAlternateIcon id="icon" className="albumUploadIcon" />
      <input
        accept="image/*"
        type="file"
        ref={imgRef}
        onChange={uploadImg}
        style={{ display: "none" }}
      />
    </Container>
  )
})

export default AlbumImage
