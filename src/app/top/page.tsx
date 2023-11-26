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
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/libs/firebase'
import { useEffect, useState } from "react"
import NextLink from 'next/link'

type Todo = {
  id: string,
  title: string,
  priority: string,
  status: string,
  created_at: string,
  updated_at: string,
}

const formatDate = (date: Date): string => {
  return date.getFullYear() + '-' + (1 + date.getMonth()).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
}

export default function Top() {
  const [taskList, setTaskList] = useState<Todo[]>([])
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [priority, setPriority] = useState<string>('')

  const changeSearch = (e: Event) => {
    setSearch(e.target.value)
  }

  const changeStatus = (e: Event) => {
    setStatus(e.target.value)
    document.querySelector('[name="priority"]').disabled = e.target.value ? true : false
  }

  const changePriority = (e: Event) => {
    setPriority(e.target.value)
    document.querySelector('[name="status"]').disabled = e.target.value ? true : false
  }

  const clickReset = () => {
    const priority = document.querySelector('[name="priority"]')
    priority.disabled = false
    priority.selectedIndex = 0
    setPriority('')

    const status = document.querySelector('[name="status"]')
    status.disabled = false
    status.selectedIndex = 0
    status.value = ''
    setStatus('')

    document.querySelector('[name="search"]').value = ''
  }

  useEffect(() => {
    let q;
    if (search && status) {
      const todosRef = collection(db, 'todos')
      q = query(todosRef, where('title', '==', search), where('status', '==', status))
    } else if (search && priority) {
      const todosRef = collection(db, 'todos')
      q = query(todosRef, where('title', '==', search), where('priority', '==', priority))
    } else {
      q = collection(db, 'todos')
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result: Todo[] = []
      querySnapshot.docs.forEach((doc) => {
        const task = doc.data()
        const createdAt = new Date(task.created_at.seconds * 1000)
        const updatedAt = new Date(task.updated_at.seconds * 1000)
        result.push({
          id: doc.id,
          title: task.title,
          priority: task.priority,
          status: task.status,
          created_at: formatDate(createdAt),
          updated_at: formatDate(updatedAt),
        })
      })

      setTaskList(result)
    })
  }, [search, status, priority])

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
                name="search"
                onChange={(e: Event) => changeSearch(e)}
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
              name="status"
              onChange={(e: Event) => changeStatus(e)}
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
              name="priority"
              onChange={(e: Event) => changePriority(e)}
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
              onClick={() => clickReset()}
            >
              RESET
            </Button>
          </Box>
          <Box pt="32px">
            <Link href='/create'>
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
              {taskList.map((task) => (
                <Tr key={task.id}>
                  <Td fontWeight="bold">
                    <Link as={NextLink} href={'/show/' + task.id}>
                      {task.title}
                    </Link>
                  </Td>
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
                  <Td fontWeight="bold">
                    {task.created_at}
                  </Td>
                  <Td fontWeight="bold">
                    {task.updated_at}
                  </Td>
                  <Td>
                    <Link as={NextLink} href={'/edit/' + task.id}>
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
    </>
  );
}
