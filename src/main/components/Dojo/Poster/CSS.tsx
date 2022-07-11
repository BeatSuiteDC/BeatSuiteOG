import styled from "@emotion/styled"

export const Button = styled.button`
  border: none;
  color: white;
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 30%;
  transition: opacity 0.3s;
  opacity: 0.7;
  z-index: 5;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  &:first-child {
    left: -50%;
  }
  &:last-child {
    right: -50%;
  }
`

export const CardDiv = styled.div`
  width: 200px;
  height: 260px;
  border-radius: 50px;
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: ease-out 200ms;
  margin-left: auto;
  margin-right: auto;
  :hover {
    scale: 1.05;
    color: rgba(255, 255, 255, 1);
  }
`
export const AlbumImg = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  border-radius: 50px;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
`
export const IconDiv = styled.div`
  position: relative;
  top: 15px;

  display: flex;
  align-items: center;
`
export const BottomLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 10vh;
  bottom: 0px;
  border-radius: 0px 0px 50px 50px;
  background-image: linear-gradient(
    transparent,
    ${({ theme }) => theme.backgroundColor}
  );
`
export const PlayPauseIcon = styled.div`
  height: 2rem;
  width: 2rem;
  background: #99badd;
  margin: 4px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-shrink: 0;
  :hover {
    background: grey;
  }
`

export const Title = styled.h4`
  font-weight: bold;
  white-space: nowrap;
`

export const TitleContainer = styled.div`
  margin-left: 5px;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
`

export const Artist = styled.h6``

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: flex-start;
  position: relative;
  overflow-y: scroll;
  padding: 1rem;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`
