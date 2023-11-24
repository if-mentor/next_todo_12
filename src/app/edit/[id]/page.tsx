"use client";
import { Box, Button, Flex, Spacer, Text, Textarea } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/libs/firebase';

type Task = {
  id: string;
  title:string;
  detail:string;
  created_at: string;
  updated_at: string;
};

const edit = () => {

  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params1 = searchParams.get("taskId")

   // Firestoreからタスクデータを取得
   const fetchTask = async (taskId: string) => {
    try {
      const docRef = doc(db, 'todo_bb', taskId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTask({ ...docSnap.data() as Task, id: docSnap.id });
      } else {
        console.log("エラー発生");
      }
    } catch (error) {
      console.error("タスクのフェッチ中にエラーが発生:", error);
    }
  };

  // ページ読み込み時にタスクデータを取得
  useEffect(() => {
    if (typeof params1 === 'string') {
      fetchTask(params1);
    }
  }, [params1]);

  // タスク更新処理
  const handleUpdate = async () => {
    if (!task) return;

    try {
      const docRef = doc(db, 'todo_bb', task.id);
      await updateDoc(docRef, {
        id:task.id,
        title:task.title,
        detail:task.detail,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      router.push('/top'); // Topページに戻る
    } catch (error) {
      console.error("タスクの更新中にエラーが発生:", error);
    }
  };

  // タスクデータの変更をハンドル
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof Task) => {
    if (task) {
      setTask({ ...task, [field]: e.target.value });
    }
  };

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
              Back
            </Button>
          </Box>
        </Flex>

          <Box as="section" mt={2} ml="100px">
            <Text fontSize="24px" fontWeight="bold">TITLE</Text>
            <Textarea
              value={task?.title}
              onChange={(e) => handleChange(e, 'title')}
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
              value={task?.detail}
              onChange={(e) => handleChange(e, 'detail')}
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
                <Text fontWeight="bold">Update</Text>
                <Text fontWeight="bold">2023-01-01 00:00</Text>
              </Box>
            </Flex>

            <Box ml="660px">
              <Button
                onClick={handleUpdate}
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

export default edit;
