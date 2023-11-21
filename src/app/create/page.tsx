"use client";
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { db } from "@/libs/firebase";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const create = () => {
  const router = useRouter();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [selectPriority, setSelectPriority] = useState("High");
  // createボタンが押されたら
  const handleClickCreate = () => {
    if (todoText === "" || todoText === "") return;
    // 新しいランダムなドキュメントを作る
    // 押すたびにidが発行される
    const docRef = doc(collection(db, "todoprops"));
    // Firebaseのデータベースにデータを追加する
    setDoc(doc(db, "todoposts", docRef.id), {
      id: docRef.id,
      title: todoTitle,
      text: todoText,
      priority: selectPriority,
      status: "NOT STARTED",
      create_at: Timestamp.now(),
      update_at: Timestamp.now(),
    });
    setTodoTitle("");
    setTodoText("");
    setSelectPriority("");
    router.push("/top");
  };

  return (
    <Box as="main" w="1280px" mx="auto">
      <Flex as="header" h="80px" bg="#68D391" alignItems="center" px={5}>
        <Box
          w="127px"
          h="56px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="48px" fontWeight="bold" marginLeft="150px">
            TODO
          </Text>
        </Box>
        <Spacer />
        <Box marginRight="50px">
          <Button
            w="120px"
            h="56px"
            bg="#D9D9D9"
            borderWidth="1px"
            borderRadius="10px"
            cursor="pointer"
            fontSize="24px"
            fontWeight="bold"
          >
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
            fontSize="18px"
          >
            BACK
          </Button>
        </Box>
      </Flex>

      <Box as="section" mt={2} ml="100px">
        <Text fontSize="24px" fontWeight="bold">
          TITLE
        </Text>
        <Textarea
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
          w="1080px"
          h="72px"
          size="lg"
          fontSize="24px"
          fontWeight="bold"
          lineHeight="1.25"
          padding="6px"
          resize="none"
          borderRadius="12px"
        />
      </Box>

      <Box as="section" mt={6} ml="100px">
        <Text fontSize="24px" fontWeight="bold">
          DETAIL
        </Text>
        <Textarea
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          w="1080px"
          h="204px"
          size="lg"
          fontSize="24px"
          fontWeight="bold"
          lineHeight="1.25"
          padding="6px"
          resize="none"
          borderRadius="12px"
        />
      </Box>

      <Box as="section" mt={6} ml="100px">
        <Text fontSize="24px" fontWeight="bold">
          PRIORITY
        </Text>
        <RadioGroup
          onChange={(e) => setSelectPriority(e)}
          value={selectPriority}
        >
          <Stack direction="row">
            <Radio value="High" fontWeight="bold" fontSize="24px" mr={4}>
              High
            </Radio>
            <Radio value="Middle" fontWeight="bold" fontSize="24px" mr={4}>
              Middle
            </Radio>
            <Radio value="Low" fontWeight="bold" fontSize="24px">
              Low
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Flex mt={4} ml="100px">
        <Box ml="968px">
          <Button
            onClick={() => handleClickCreate()}
            w="112px"
            h="40px"
            bg="#25855A"
            borderRadius="20px"
            cursor="pointer"
            fontWeight="bold"
            color="white"
            fontSize="18px"
          >
            CREATE
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default create;
