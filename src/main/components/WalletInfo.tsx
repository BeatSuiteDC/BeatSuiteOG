import { Box, Button, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { useStores } from "../hooks/useStores"

const Container = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  background: ${({ theme }) => theme.backgroundColor};
  padding: 2px;
  border: 1px solid cyan;
  border-radius: 10px;
  width: 12rem;
  height: 2.5rem;
  top: 5%;
  right: 15%;
`

const WalletInfo = observer(() => {
  const { user } = useStores()

  function handleConnectWallet() {
    user.connect()
  }

  return user.isConnected ? (
    <Container>
      <Box px="3">
        <Text color="white" fontSize="md">
          0.001 MOJO
        </Text>
      </Box>
      <Button
        bg="black"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "black.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {user.address}
        </Text>
      </Button>
    </Container>
  ) : (
    <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
  )
})

export default WalletInfo
