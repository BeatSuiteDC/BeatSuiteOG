import { css, Global } from "@emotion/react"
import { useTheme } from "../../hooks/useTheme"

export const DojoCSS = () => {
  const theme = useTheme()
  return <Global styles={css``} />
}
