import { Box, Button, Flex, Radio, RadioGroup, Spacer, Stack, Text, Textarea } from '@chakra-ui/react';

const create = () =>{
  return (
      <Box as="main" w="1280px" mx="auto">
        <Flex
          as="header"
          h='80px'
          bg="#68D391"
          alignItems="center"
          px={5}>
          <Box
            w="127px"
            h="56px"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Text fontSize="48px" fontWeight="bold" marginLeft="150px">TODO</Text>
          </Box>
          <Spacer/>
          <Box marginRight="50px">
            <Button
              w="120px"
              h="56px"
              bg="#D9D9D9"
              borderWidth="1px"
              borderRadius="10px"
              cursor="pointer"
              fontSize="24px"
              fontWeight="bold">
              LOGOUT
            </Button>
          </Box>
        </Flex>

        <Flex mt={4} ml="100px">
          <Box ml="968px">
            <Button
              w="112px"
              h="40px"
              bg="#68D391"
              borderRadius="20px"
              cursor="pointer"
              fontWeight="bold"
              fontSize="18px">
              BACK
            </Button>
          </Box>
        </Flex>

        <Box as="section" mt={2} ml="100px">
          <Text fontSize="24px" fontWeight="bold">TITLE</Text>
          <Textarea
            w="1080px"
            h="72px"
            size="lg"
            fontSize="24px"
            fontWeight="bold"
            lineHeight="1.25"
            padding="6px"
            resize="none"
            borderRadius="12px"/>
        </Box>

        <Box as="section" mt={6} ml="100px">
          <Text fontSize="24px" fontWeight="bold">DETAIL</Text>
          <Textarea
            w="1080px"
            h="204px"
            size="lg"
            fontSize="24px"
            fontWeight="bold"
            lineHeight="1.25"
            padding="6px"
            resize="none"
            borderRadius="12px"/>
        </Box>

        <Flex mt={4} ml="100px">
          <Flex>
            <Box mr={5}>
              <Text fontWeight="bold">Create</Text>
              <Text fontWeight="bold">2023-01-01 00:00</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Create</Text>
              <Text fontWeight="bold">2023-01-01 00:00</Text>
            </Box>
          </Flex>

          <Box ml="660px">
            <Button
              w="112px"
              h="40px"
              bg="#25855A"
              borderRadius="20px"
              cursor="pointer"
              fontWeight="bold"
              color="white"
              fontSize="18px">
              UPDATE
            </Button>
          </Box>
        </Flex>
      </Box>
  );
};

export default create;
