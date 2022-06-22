import styled from "@emotion/styled"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  padding: 2px 4px 2px 4px;
  border-radius: 8px;
  transition: ease-out;

  :hover {
    background: grey;
    opacity: 0.1;
  }
`

export const Image = styled.img`
  border-radius: 8px;
  height: 3rem;
  width: 3rem;
  background-size: cover;
  background-position: center center;
  margin-right: 1rem;
`

export const H4 = styled.h4`
  color: white;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const slideContentInner = styled.div``
