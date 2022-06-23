import styled from "@emotion/styled"

export const Container = styled.div`
  overflow: hidden;
  backdrop-filter: blur(10px);
  width: 90%;
  height: 60%;
  box-shadow: 1px 0px 3px #99badd;
  text-align: center;
  display: flex;
  border-radius: 0% 10% 3% 15%;
  padding-left: 15px;
  z-index: 1;
`

export const List = styled.ul`
  min-width: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 3px;
  margin-left: 3px;
`

export const ElementDiv = styled.div`
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  color: #c0c0c0;
  text-transform: uppercase;
  margin-top: 20px;
  text-shadow: 1px 1px rgb(0 0 0 / 20%);
  cursor: pointer;
  align-text: center;
`
