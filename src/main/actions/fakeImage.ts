import yahndi from "../images/YAHNDI-modified.png"

export const YAHNDI_COVER = yahndi
export const DEFAULT_ALBUM_COVER = "https://thisartworkdoesnotexist.com/"

export const dne = () => {
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

export const tenor = async (lmt: number = 1) => {
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
  const clientKey = "beatsuite"
  const url = `https://tenor.googleapis.com/v2/featured?key=${apiKey}&client_key=${clientKey}&limit=${lmt}`

  const response = await fetch(url)
  const text = await response.text()
  const json = await JSON.parse(text)
  const results = await json.results
  const idx = Math.floor(Math.random() * lmt)
  const img = await results[idx].itemurl
  const resp = await fetch(img)

  const blob = await resp.blob()

  return await URL.createObjectURL(blob)
}
