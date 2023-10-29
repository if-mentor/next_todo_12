import { Heading, Flex } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <header>
        <Flex pl='10%' alignItems='center' justifyContent='space-between' backgroundColor='#68D391'>
          <Flex w='127px' h='56px' alignItems='center' justifyContent='center'>
            <Heading as='h1'>TODO</Heading>
          </Flex>
        </Flex>
      </header>
    </>
  )
}
