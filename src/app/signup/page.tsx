"use client";
import {
  Heading,
  Flex,
  FormLabel,
  Input,
  Button,
  FormControl,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect, MouseEvent } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/navigation";

type RegisterEmail = string;

type RegisterPassword = string;

export default function Home() {
  // useRouter:ユーザー登録（SignUP)が完了してログイン後、画面を遷移させるために使う
  const router = useRouter();
  // useState:ローカルステート（ローカルの状態）に入力を保存
  const [registerEmail, setRegisterEmail] = useState<RegisterEmail>("");
  const [registerPassword, setRegisterPassword] =
    useState<RegisterPassword>("");

  // SIGNUPボタンを押下後、Firebaseに登録する処理
  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert("登録できません");
    }
  };

  const [user, setUser] = useState<User>();

  // ログインしているかどうかを判定する処理
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        router.push("/top")
      ) : (
        <>
          <header>
            <Flex
              pl="10%"
              alignItems="center"
              justifyContent="space-between"
              bgColor="#68D391"
              style={{ boxShadow: "0 1px 2px 1px rgb(0 0 0 / 25%)" }}
            >
              <Flex
                w="127px"
                h="56px"
                alignItems="center"
                justifyContent="center"
              >
                <Heading as="h1">TODO</Heading>
              </Flex>
            </Flex>
          </header>

          <main>
            <Flex justifyContent="center" mt="80px">
              <Flex
                w="800px"
                h="500px"
                bgColor="#C6F6D5"
                rounded="20"
                alignItems="center"
                justifyContent="space-between"
                direction="column"
                p="60px"
              >
                <Flex
                  w="500px"
                  h="233px"
                  alignItems="center"
                  justifyContent="space-between"
                  direction="column"
                  mt="20px"
                >
                  <FormControl w="100%">
                    <FormLabel
                      w="140px"
                      h="23px"
                      fontSize="20px"
                      fontWeight="bold"
                      fontFamily="Robot"
                    >
                      メールアドレス
                    </FormLabel>
                    <Spacer h="4" />
                    <Input
                      w="100%"
                      h="60px"
                      rounded="10"
                      border="none"
                      bgColor="#F0FFF4"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel
                      w="140px"
                      h="23px"
                      fontSize="20px"
                      fontWeight="bold"
                      fontFamily="Robot"
                    >
                      パスワード
                    </FormLabel>
                    <Spacer h="4" />
                    <Input
                      w="100%"
                      h="60px"
                      rounded="10"
                      border="none"
                      bgColor="#F0FFF4"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </FormControl>
                </Flex>

                <Flex
                  alignItems="end"
                  justifyContent="center"
                  w="100%"
                  h="54px"
                >
                  <Button
                    onClick={handleSignUp}
                    w="204px"
                    h="54px"
                    rounded="50"
                    bgColor="#25855A"
                    color="#F0FFF4"
                    border="1px"
                    borderColor="#000000"
                    fontSize="24px"
                    fontFamily="Gothic A1"
                  >
                    SIGNUP
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </main>
        </>
      )}
    </>
  );
}
