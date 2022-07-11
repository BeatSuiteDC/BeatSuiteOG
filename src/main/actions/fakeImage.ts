export const DEFAULT_ALBUM_COVER = "https://thisartworkdoesnotexist.com/"

export default () => {
  const img = new Image()
  img.src = DEFAULT_ALBUM_COVER

  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")

  canvas.height = img.naturalHeight
  canvas.width = img.naturalWidth

  ctx?.drawImage(img, 0, 0)
  const uri = canvas.toDataURL("image/png")
  const b64 = uri.replace(/^data:image.+;base64,/, "")

  console.log({ uri, b64 })

  return b64
}
