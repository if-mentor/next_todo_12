"use client";
import {
  Button,
  Box,
  Input,
  Select,
  InputRightElement,
  InputGroup,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Top() {
  return (
    <>
      <header>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="#68D391"
          w="100%"
          h="80px"
          p={4}
          color="black"
          fontSize="36px"
          sx={{ fontWeight: "bold", px: "375" }}
        >
          TODO
          <Button
            color="D9D9D9"
            fontWeight="bold"
            w="120px"
            h="56px"
            fontSize="24px"
          >
            LOGOUT
          </Button>
        </Box>
      </header>
      <nav>
        <Box display="flex" justifyContent="center" my={50}>
          <Box w="191" h="71" fontWeight="bold">
            <p>SEARCH</p>
            <InputGroup>
              <InputRightElement
                cursor="pointer"
                pointerEvents="auto"
                pt={"15px"}
              >
                <SearchIcon w="20px" h="20px" color="gray.400" />
              </InputRightElement>
              <Input
                type="text"
                fontWeight="bold"
                size="md"
                w="190px"
                h="40px"
                border="1px solid"
                my={2}
                placeholder="Text"
              />
            </InputGroup>
          </Box>
          <Box w="191" h="71" pl={5} fontWeight="bold">
            <p>STATUS</p>
            <Select
              placeholder="- - - - - - -"
              w={192}
              my={2}
              fontWeight="bold"
              border="1px solid"
            >
              <option value="NOT STARTED">NOT STARTED</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </Select>
          </Box>
          <Box w="191" h="71" pl={5} fontWeight="bold">
            <p>PRIORITY</p>
            <Select
              placeholder="- - - - - - -"
              w={192}
              my={2}
              fontWeight="bold"
              border="1px solid"
            >
              <option value="High">High</option>
              <option value="Middle">Middle</option>
              <option value="LOW">LOW</option>
            </Select>
          </Box>
          <Box pl={5} pt="32px">
            <Button
              w={104}
              fontWeight="bold"
              borderRadius="30"
              bgColor="#A0AEC0"
              fontSize={18}
              border="1px solid"
            >
              RESET
            </Button>
          </Box>
          <Box pt="32px">
            <IconButton
              aria-label="Search database"
              icon={<EditIcon />}
              borderRadius="30"
              bgColor="#68D391"
              ml={400}
            />
          </Box>
        </Box>
      </nav>
      <main>
        <TableContainer display="flex" justifyContent="center">
          <Table variant="simple" w={"1080px"} h={"392px"}>
            <Thead>
              <Tr bg="#68D391" h={"56px"}>
                <Th
                  color={"black"}
                  textTransform="capitalize"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Task
                </Th>
                <Th
                  color={"black"}
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Status
                </Th>
                <Th
                  color={"black"}
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Priority
                </Th>
                <Th
                  color={"black"}
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Create
                </Th>
                <Th
                  color={"black"}
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Update
                </Th>
                <Th
                  color={"black"}
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">
                  Github上に静的サイトをホスティングする
                </Td>
                <Td h={"56px"}>
                  <Button
                    fontSize={"12px"}
                    width={"104px"}
                    height={"40px"}
                    border="1px solid"
                    borderRadius="30"
                    bgColor="#C6F6D5"
                  >
                    NOT STARTED
                  </Button>
                </Td>
                <Td>
                  <Select border="1px solid" borderColor="tomato" w={"112px"}>
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">ReactでTodoサイトを作成する</Td>
                <Td h={"56px"}>
                  <Button
                    width={"104px"}
                    height={"40px"}
                    border="1px solid"
                    borderRadius="30"
                    bgColor="#2F855A"
                  >
                    DOING
                  </Button>
                </Td>
                <Td>
                  <Select
                    placeholder="Low"
                    border="1px solid"
                    borderColor="tomato"
                    w={"112px"}
                  >
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">Low</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Firestore Hostingを学習する</Td>
                <Td h={"56px"}>
                  <Button
                    width={"104px"}
                    height={"40px"}
                    border="1px solid"
                    borderRadius="30"
                    bgColor="#68D391"
                  >
                    DONE
                  </Button>
                </Td>
                <Td>
                  <Select
                    placeholder="Middle"
                    border="1px solid"
                    borderColor="tomato"
                    w={"112px"}
                  >
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">感謝の正拳突き</Td>
                <Td h={"56px"}>
                  <Button
                    width={"104px"}
                    height={"40px"}
                    border="1px solid"
                    borderRadius="30"
                    bgColor="#2F855A"
                  >
                    DOING
                  </Button>
                </Td>
                <Td>
                  <Select border="1px solid" borderColor="tomato" w={"112px"}>
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">二重の極み</Td>
                <Td h={"56px"}>
                  <Button
                    width={"104px"}
                    height={"40px"}
                    border="1px solid"
                    borderRadius="30"
                    bgColor="#68D391"
                  >
                    DONE
                  </Button>
                </Td>
                <Td>
                  <Select border="1px solid" borderColor="tomato" w={"112px"}>
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">魔封波</Td>
                <Td h={"56px"}>
                  <Button
                    width={"104px"}
                    border="1px solid"
                    borderRadius="30"
                    bgColor="#2F855A"
                  >
                    DOING
                  </Button>
                </Td>
                <Td>
                  <Select
                    placeholder="Low"
                    border="1px solid"
                    borderColor="tomato"
                    w={"112px"}
                  >
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td fontWeight="bold">
                  <p>2020-11-8 18:55</p>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </main>
      <footer></footer>
    </>
  );
}
