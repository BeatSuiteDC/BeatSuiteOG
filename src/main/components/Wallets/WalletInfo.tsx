import { Box, Button, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useWeb3React } from "@web3-react/core"
import { utils } from "ethers"
import { observer } from "mobx-react-lite"
import { useBalances } from "../../Web3/Accounts"
import Layout from "./Layout"

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
  const { hooks, account, accounts, connector } = useWeb3React()
  const provider = hooks.useSelectedProvider(connector)
  const balance = useBalances(provider, accounts)

  function handleConnectWallet() {
    connector.activate()
  }

  return (
    <Layout>
      {account ? (
        <Box
          display="flex"
          position="absolute"
          top="5%"
          right="3rem"
          width="11rem"
          marginRight="4rem"
          alignItems="center"
          background="#1b1b1b"
          borderRadius="xl"
          boxShadow="lg"
          py="0"
        >
          <Box px="3">
            <Text color="white" fontSize="md">
              {balance && parseFloat(utils.formatEther(balance[0])).toFixed(3)}{" "}
              ETH
            </Text>
          </Box>
          <Button
            bg="black"
            border="1px solid transparent"
            _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "cyan",
              backgroundColor: "#1b1b1b",
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            height="38px"
          >
            <Text color="white" fontSize="md" fontWeight="medium" mr="2">
              {account &&
                `${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
                )}`}
            </Text>
          </Button>
        </Box>
      ) : (
        <Button
          position="absolute"
          top="5%"
          marginRight="4rem"
          onClick={handleConnectWallet}
        >
          Connect to a wallet
        </Button>
      )}
    </Layout>
  )
})

export default WalletInfo
