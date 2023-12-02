"use client";
import { Box, Button, Flex, Spacer, Text, Textarea } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/libs/firebase';

type Task = {
  id: string;
  title:string;
  detail:string;
  created_at: string;
  updated_at: string;
};

const Edit = ({ params }: { params: { id: string } }) => {

  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  const paramId = params.id;

   // Firestoreからタスクデータを取得
   const fetchTask = async (taskId: string) => {
    try {
      const docRef = doc(db, 'todos', taskId);
      const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Task;
      setTask({
        ...data,
        id: docSnap.id,
        created_at: data.created_at, // 既に文字列として保存されている場合
        updated_at: data.updated_at  // 既に文字列として保存されている場合
      });
          } else {
            console.log("タスクが存在しません");
          }
        } catch (error) {
          console.error("タスクの取得中にエラーが発生しました:", error);
        }
      };

  // ページ読み込み時にタスクデータを取得
    useEffect(() => {
      if (typeof paramId === 'string') {
        fetchTask(paramId);
      }
    }, [paramId]);

  console.log(paramId)
  console.log(task);

  // タスク更新処理
  const handleUpdate = async () => {
    if (!task) return;

    try {
      const docRef = doc(db, 'todos', task.id);
      await updateDoc(docRef, {
        title: task.title,
        detail: task.detail,
        created_at: Timestamp.fromDate(new Date(task.created_at)),
        updated_at: Timestamp.fromDate(new Date())
      });

      router.push('/top'); // Topページに戻る
    } catch (error) {
      console.error("タスクの更新中にエラーが発生:", error);
      // ここでエラー通知を表示する
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
                {/* <Text fontWeight="bold">{task?.created_at}</Text> */}
              </Box>
              <Box>
                <Text fontWeight="bold">Update</Text>
                {/* <Text fontWeight="bold">{task?.updated_at}</Text> */}
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

export default Edit;
