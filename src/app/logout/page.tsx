"use client";

import { Button } from "@chakra-ui/react";
import { auth } from "@/libs/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function Logout() {
  const router = useRouter();

  const handleClickLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Button
        color="#black"
        fontWeight="bold"
        w="120px"
        h="56px"
        fontSize="24px"
        onClick={handleClickLogout}
      >
        LOGOUT
      </Button>
    </div>
  );
}
