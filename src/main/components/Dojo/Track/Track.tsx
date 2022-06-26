import { FC } from "react"
import { Track } from "../Album/Album"
import { Container, Image } from "./CSS"

type TrackProps = {
  track: Track
  key: number
}
const TrackComponent: FC<TrackProps> = ({ track, key }) => {
  return (
    <Container>
      <div
        className="flex items-center"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image src={track.cover} />
        <div>
          <h4
            style={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {track.title}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">
            {track.album}
          </p>
        </div>
      </div>
    </Container>
  )
}

export default TrackComponent
