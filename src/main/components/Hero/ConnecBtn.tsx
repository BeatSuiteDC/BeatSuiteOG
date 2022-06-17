import { Box, Button, Text } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"

const ConnectWallet: FC = observer(() => {
  const { user } = useStores()

  const login = (event: any) => {
    if (user.isConnected) {
      return <Navigate to="/dojo" />
    }

    console.log("user connected", user.isConnected)
    user.connect()
  }

  return user.isConnected ? (
    <Box
      display="flex"
      alignItems="center"
      background="red.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          0.001 MOJO
        </Text>
      </Box>
      <Button
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {user.isConnected && user.address}
        </Text>
      </Button>
    </Box>
  ) : (
    <div className="wrap">
      <button className="button" onClick={login}>
        Connect Wallet
      </button>
    </div>
  )
})

export default ConnectWallet
