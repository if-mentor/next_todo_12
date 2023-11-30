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
  Link,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import ReactPaginate from "react-paginate";
import styles from "../../styles/top.module.css";

type Task = {
  id: string;
  title: string;
  priority: number;
  status: number;
  created_at: string;
  updated_at: string;
};

const formatDate = (date: Date): string => {
  return (
    date.getFullYear() +
    "-" +
    (1 + date.getMonth()).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0") +
    " " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
};

export default function Top() {
  // 入力したTodoの配列
  const [taskList, setTaskList] = useState<Task[]>([]);
  // 1ページに表示するTodoの数
  const itemsPerPage = 6;
  // そのページの最初のTodo（配列）の番号を格納
  const [itemOffset, setItemOffset] = useState(0);
  // 今のページ数
  const [pageCount, setPageCount] = useState(0);
  //  1ページごとのTodoの配列
  const [currentItems, setCurrentItems] = useState<Task[]>([]);

  //e: { selected: number }はページ数-1 (例：2ページ目を押すと1)
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % taskList.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    // 次のページの最初のTodo（配列）の番号を取得（例：2ページ目なら6番目）
    // 理由：slice関数で区切る時に区切りたい配列番号の次の配列番号の取得が必要になる為
    const endOffset = itemOffset + itemsPerPage;
    // Todoの配列を6個ずつ切り取る
    setCurrentItems(taskList.slice(itemOffset, endOffset));
    //全体のページ数を出す計算式（todoの数÷1ページに表示するtodoの数）小数点以下繰り上げ
    setPageCount(Math.ceil(taskList.length / itemsPerPage));
  }, [taskList, itemOffset]);

  useEffect(() => {
    const q = collection(db, "todos");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result: Task[] = [];
      querySnapshot.docs.forEach((doc) => {
        const task = doc.data();
        const createdAt = new Date(task.created_at.seconds * 1000);
        const updatedAt = new Date(task.updated_at.seconds * 1000);
        result.push({
          id: doc.id,
          title: task.title,
          priority: task.priority,
          status: task.status,
          created_at: formatDate(createdAt),
          updated_at: formatDate(updatedAt),
        });
      });

      setTaskList(result);
    });
    return () => unsubscribe();
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
            <Link href="/create">
              <IconButton
                aria-label="Search database"
                icon={<EditIcon />}
                borderRadius="30"
                bgColor="#68D391"
                ml={400}
              />
            </Link>
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
              {currentItems.map((task) => (
                <Tr key={task.id}>
                  <Td fontWeight="bold">{task.title}</Td>
                  <Td h="56px">
                    <Button
                      fontSize="12px"
                      w="104px"
                      h="40px"
                      border="1px solid"
                      borderRadius="30"
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
                  <Td fontWeight="bold">{task.created_at}</Td>
                  <Td fontWeight="bold">{task.updated_at}</Td>
                  <Td>
                    <Link as={NextLink} href={"/edit/" + task.id}>
                      <EditIcon w="50px" />
                    </Link>
                    <DeleteIcon />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </main>
      <footer></footer>
      <ReactPaginate
        pageCount={pageCount} // 必須：総ページ数
        onPageChange={handlePageClick}
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        className={styles.pagination}
        pageLinkClassName={styles.page} //paginationのリンクのクラス名
        nextLinkClassName={styles.next} //'>'のリンクのクラス名
        previousLinkClassName={styles.previous} //'<'のリンクのクラス名
        marginPagesDisplayed={2} //一番最初と最後を基準にして、そこからいくつページ数を表示するか
        breakClassName={styles.break} //「…」のクラス名
      />
    </>
  );
}
