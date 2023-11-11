import { Box, Button, Flex, Radio, RadioGroup, Spacer, Stack, Text, Textarea } from '@chakra-ui/react';
import Link from 'next/link';

const NotFound = () =>{
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
    </Flex>
    <Flex
        direction="column"
        height="calc(100vh - 200px)"
        alignItems="center"
        justifyContent="center"
        textAlign="center">
        <Text fontSize="5xl" fontWeight="bold" mb={20}>404</Text>
        <Text fontSize="xl" fontWeight="bold" mb={20}>This is not the web page you are looking for.</Text>
        <Link href="/">
          <Button
            w="113px"
            h="50px"
            borderRadius="25px"
            bg="#68D391">
              Top
          </Button>
        </Link>
      </Flex>
  </Box>
  );
};

export default NotFound;
