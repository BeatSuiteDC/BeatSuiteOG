const getBase64FromUrl = async (url: string | undefined) => {
  if (!url) {
    console.log("Provided undefined url")
    return
  }

  try {
    const data = await fetch(url)
    const blob = await data.blob()

    console.log("converting to base64")
    return new Promise<string | ArrayBuffer | null>((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        const base64data = reader.result
        resolve(base64data)
      }
    })
  } catch (e) {
    console.log(e)
  }
}
const getArrayBufferFromUrl = async (url: string | undefined) => {
  if (!url) {
    console.log("Provided undefined url")
    return
  }
  try {
    const data = await fetch(url)
    const buffer = await data.arrayBuffer()
    return await buffer
  } catch (e) {
    console.log(e)
  }
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  var binary = ""
  var bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach((b) => (binary += String.fromCharCode(b)))

  return window.btoa(binary)
}

const base64ToArrayBuffer = (base64: string) => {
  var binary_string = window.atob(base64)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

export { getBase64FromUrl }
