import { Heading, Flex, FormLabel, Input, Button, FormControl, Spacer } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <header>
        <Flex
          pl='10%'
          alignItems='center'
          justifyContent='space-between'
          bgColor='#68D391'
          style={{ boxShadow: '0 1px 2px 1px rgb(0 0 0 / 25%)' }}
        >
          <Flex w='127px' h='56px' alignItems='center' justifyContent='center'>
            <Heading as='h1'>TODO</Heading>
          </Flex>
        </Flex>
      </header>

      <main>
        <Flex justifyContent='center' mt='80px'>
          <Flex
            w='800px'
            h='500px'
            bgColor='#C6F6D5'
            rounded='20'
            alignItems='center'
            justifyContent='space-between'
            direction='column'
            p='60px'
          >
            <Flex
              w='500px'
              h='233px'
              alignItems='center'
              justifyContent='space-between'
              direction='column'
              mt='20px'
            >
              <FormControl w='100%'>
                <FormLabel
                  w='140px'
                  h='23px'
                  fontSize='20px'
                  fontWeight='bold'
                  fontFamily='Robot'>メールアドレス</FormLabel>
                <Spacer h='4' />
                <Input
                  w='100%'
                  h='60px'
                  rounded='10'
                  border='none'
                  bgColor='#F0FFF4'
                />
              </FormControl>
              <FormControl w='100%'>
                <FormLabel
                  w='140px'
                  h='23px'
                  fontSize='20px'
                  fontWeight='bold'
                  fontFamily='Robot'>パスワード</FormLabel>
                <Spacer h='4' />
                <Input
                  w='100%'
                  h='60px'
                  rounded='10'
                  border='none'
                  bgColor='#F0FFF4'
                />
              </FormControl>
            </Flex>

            <Flex alignItems='end' justifyContent='center' w='100%' h='54px'>
              <Button
                w='204px'
                h='54px'
                rounded='50'
                bgColor='#25855A'
                color='#F0FFF4'
                border='1px'
                borderColor='#000000'
                fontSize='24px'
                fontFamily='Gothic A1'
              >LOGIN</Button>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </>
  )
}