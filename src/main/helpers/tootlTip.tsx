import { Tooltip } from "@mui/material"
import { FC, ReactElement } from "react"

const toolTip: FC<{ title: string; children: ReactElement<any, any> }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Tooltip
        title={title}
        placement="bottom"
        enterDelay={100}
        enterNextDelay={150}
      >
        {children}
      </Tooltip>
    </>
  )
}

export default toolTip
