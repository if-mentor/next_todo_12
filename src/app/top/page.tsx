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
  Text,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { db } from "@/libs/firebase";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { type } from "os";

type TodoType = {
  id: string;
  title: string;
  text: string;
  status: string;
  priority: string;
  create: Timestamp;
  update: Timestamp;
};

export default function Top() {
  // データベースから取得したデータを入れる
  const [posts, setPosts] = useState<TodoType[]>([]);

  // ブラウザがリロードされた時に1回だけ実行される
  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "todoposts");
    getDocs(postData).then((querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data() as TodoType));
    });
  }, []);
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
            color="#black"
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
          <Box w="190px" h="71px" fontWeight="bold">
            <Text>SEARCH</Text>
            <InputGroup>
              <InputRightElement
                cursor="pointer"
                pointerEvents="auto"
                pt="15px"
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
          <Box w="192px" h="71px" fontWeight="bold" pl={5}>
            <Text>STATUS</Text>
            <Select
              placeholder="- - - - - - -"
              w="192px"
              my={2}
              fontWeight="bold"
              border="1px solid"
            >
              <option value="NOT STARTED">NOT STARTED</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </Select>
          </Box>
          <Box w="197px" h="71px" fontWeight="bold" pl={10}>
            <Text>PRIORITY</Text>
            <Select
              placeholder="- - - - - - -"
              w="192px"
              my={2}
              fontWeight="bold"
              border="1px solid"
            >
              <option value="High">High</option>
              <option value="Middle">Middle</option>
              <option value="LOW">LOW</option>
            </Select>
          </Box>
          <Box pl={20} pt="32px">
            <Button
              w="104px"
              fontWeight="bold"
              borderRadius="30px"
              bgColor="#A0AEC0"
              fontSize="18px"
              border="1px solid"
            >
              RESET
            </Button>
          </Box>
          <Box pt="32px">
            <IconButton
              aria-label="Search database"
              icon={<EditIcon />}
              borderRadius="30px"
              bgColor="#68D391"
              ml={400}
            />
          </Box>
        </Box>
      </nav>
      <main>
        <TableContainer display="flex" justifyContent="center">
          <Table variant="simple" w="1080px" h="392px">
            <Thead>
              <Tr bg="#68D391" h="56px">
                <Th
                  color="black"
                  textTransform="capitalize"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Task
                </Th>
                <Th
                  color="black"
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Status
                </Th>
                <Th
                  color="black"
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Priority
                </Th>
                <Th
                  color="black"
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Create
                </Th>
                <Th
                  color="black"
                  textTransform="capitalize"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Update
                </Th>
                <Th
                  color="black"
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
                <Td h="56px">
                  <Button
                    fontSize="12px"
                    w="104px"
                    h="40px"
                    border="1px solid"
                    borderRadius="30px"
                    bgColor="#C6F6D5"
                  >
                    NOT STARTED
                  </Button>
                </Td>
                <Td>
                  <Select border="1px solid" borderColor="tomato" w="112px">
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">ReactでTodoサイトを作成する</Td>
                <Td h="56px">
                  <Button
                    w="104px"
                    h="40px"
                    border="1px solid"
                    borderRadius="30px"
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
                    w="112px"
                  >
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">Low</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Firestore Hostingを学習する</Td>
                <Td h="56px">
                  <Button
                    w="104px"
                    h="40px"
                    border="1px solid"
                    borderRadius="30px"
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
                    w="112px"
                  >
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">感謝の正拳突き</Td>
                <Td h="56px">
                  <Button
                    w="104px"
                    h="40px"
                    border="1px solid"
                    borderRadius="30px"
                    bgColor="#2F855A"
                  >
                    DOING
                  </Button>
                </Td>
                <Td>
                  <Select border="1px solid" borderColor="tomato" w="112px">
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">二重の極み</Td>
                <Td h="56px">
                  <Button
                    w="104px"
                    h="40px"
                    border="1px solid"
                    borderRadius="30px"
                    bgColor="#68D391"
                  >
                    DONE
                  </Button>
                </Td>
                <Td>
                  <Select border="1px solid" borderColor="tomato" w="112px">
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td>
                  <EditIcon w="50px" />
                  <DeleteIcon />
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">魔封波</Td>
                <Td h="56px">
                  <Button
                    w="104px"
                    border="1px solid"
                    borderRadius="30px"
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
                    w="112px"
                  >
                    <option value="High">High</option>
                    <option value="Middle">Middle</option>
                    <option value="LOW">LOW</option>
                  </Select>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
                </Td>
                <Td fontWeight="bold">
                  <Text>2020-11-8 18:55</Text>
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
