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
  created_at: Timestamp | string | Date;
  updated_at: Timestamp | string | Date;
};

const Edit = ({ params }: { params: { id: string } }) => {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  const paramId = params.id;

  const formatDate = (date: Date): string => {
    return date.getFullYear() + '-' + (1 + date.getMonth()).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
  }

   // Firestoreからタスクデータを取得
   const fetchTask = async (taskId: string) => {
    try {
      const docRef = doc(db, 'todos', taskId);
      const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const createdAt = new Date(data.created_at.seconds * 1000)
      const updatedAt = new Date(data.updated_at.seconds * 1000)
      setTask({
        ...data,
        title:data.title,
        detail:data.detail,
        id: docSnap.id,
        created_at: formatDate(createdAt),
        updated_at: formatDate(updatedAt)
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

        // 日付フィールドの処理
        let created_at = task.created_at;
        let updated_at = new Date(); // 現在の日時

        // created_atがTimestamp型の場合、Dateに変換
        if (created_at instanceof Timestamp) {
          created_at = created_at.toDate();
        }

        await updateDoc(docRef, {
          title: task.title,
          detail: task.detail,
          created_at: Timestamp.fromDate(new Date(created_at)),
          updated_at: Timestamp.fromDate(updated_at)
        });

        router.push('/top'); // Topページに戻る
        console.log("topページへ遷移")
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
                <Text fontWeight="bold">{task?.created_at as string}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Update</Text>
                <Text fontWeight="bold">{task?.updated_at as string}</Text>
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
