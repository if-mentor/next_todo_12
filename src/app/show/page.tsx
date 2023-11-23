"use client";
import {
    Button,
    Box,
    Flex,
    FormLabel,
    Input,
    Textarea
    } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
// firebaseとの連携の際に、db変数を取り込むため
import { db } from "@/libs/firebase";
// firebaseのcloud firestoreを使用し、データベースにアクセスするためのモジュールや関数をインポート
import { Timestamp, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CommentType = {
    id: number;
    name: string;
    comment: string;
    date: string;
}

export default function Show() {
    // ルーター設定
    const router = useRouter();

    // デフォルトではモーダルを閉じておく
    // モーダルの状態管理
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    // TOPページに戻るBackボタンの処理
    const handleTransitionTop = () => {
        router.push("/top");
    }

    // Editページへ飛ぶEditボタンの処理
    const handleTransitionEdit = () => {
        router.push("/edit");
    }

    // モーダルにおけるNameとYour Commentの状態管理
    const [commentName, setCommentName] = useState("");
    const [commentComment, setCommentComment] = useState("");

    // モーダルにおけるCreateボタン押下処理
    const handleClickComment = () => {
        // コメントに入力されていなければ、この時点で返す
        if(commentName === "" || commentComment === "") return;

        // 投稿日
        const currentDate = new Date();
        // 年、月、日の取得
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const commentDate = `${year}/${month}/${day}`;

        // Firebaseコレクションとドキュメントの作成
        const docRef = doc(collection(db, "comment_props"));
        setDoc(doc(db, "todo_show_comment", docRef.id), {
            id: docRef.id,
            name: commentName,
            comment: commentComment,
            date: commentDate,
        });
        setCommentName("");
        setCommentComment("");

        // モーダルの非表示化
        toggleModal();
    }

    // firebaseに保存したデータを取得する
    // 取得データ格納用
    const [data, setData] = useState<CommentType[]>([]);

    // コレクションの参照を取得する
    useEffect(() => {
        // 取得に時間がかかるため、非同期を使用
        const fetchData = async () => {
            const postData = collection(db, 'todo_show_comment');
            const querySnapshot = await getDocs(postData);
            const postsData = querySnapshot.docs.map((doc) => doc.data() as CommentType);
            setData(postsData);
        };

        fetchData();
    }, [handleClickComment]);

    return (
        <Box position="relative">
            <header>
                <Box bg="#68D391">
                    <Flex
                    w="80%"
                    p="1% 0"
                    m="0 auto"
                    justifyContent="space-between"
                    alignItems="center"
                    fontWeight="bold">
                        <Box fontSize="2.5rem">TODO</Box>
                        <Box>
                            <Button bg="#D9D9D9" fontSize="1.3rem">LOGOUT</Button>
                        </Box>
                    </Flex>
                </Box>
            </header>

            <main>
                <Flex
                className="button-flex"
                w="80%"
                m="1% auto"
                justifyContent="flex-end"
                gap="1%">
                    <Button
                    onClick={() => toggleModal()}
                    color="#fff"
                    bg="#25855A"
                    border="1px solid #333"
                    rounded="full"
                    fontSize="18px">
                        Comment
                    </Button>
                    <Button
                    onClick={() => handleTransitionTop()}
                    color="#333"
                    bg="#68D391"
                    border="1px solid #333"
                    rounded="full"
                    fontSize="18px">
                        Back
                    </Button>
                </Flex>
                <Flex className="show-wrapper"
                w="80%"
                m="1% auto"
                gap="2%"
                alignItems="start">
                    <Box className="todo-wrapper"
                    p="1%"
                    w="49%"
                    border="1px solid #333"
                    rounded="10">
                        <Box color="#333" fontWeight="bold" mb="2%">
                            <p style={{backgroundColor:"#68D391"}}>TITLE</p>
                            <p>Github上に静的サイトをホスティングする</p>
                        </Box>
                        <Box color="#333" fontWeight="bold" mb="2%">
                            <Box style={{backgroundColor:"#68D391"}}>DETAIL</Box>
                            <p>AWS コンソールで AWS Amplify を使って静的ウェブサイトをホスティングします。AWS Amplify は、静的ウェブサイトおよびウェブアプリにフルマネージドのホスティングを提供します。Amplify のホスティングソリューションは、Amazon CloudFront と Amazon S3 を使って、AWS コンテンツ配信ネットワーク (CDN) を介してサイトアセットを提供します。<br />継続的デプロイをセットアップします。Amplify は、継続的デプロイで Git ベースのワークフローを提供します。それにより、コードコミットごとに、サイトに自動的に更新をデプロイすることができます。</p>
                        </Box>
                        <Flex justifyContent="space-between" fontWeight="bold">
                            <Button
                            onClick={() => handleTransitionEdit()}
                            color="#333"
                            bg="#68D391"
                            border="1px solid #333"
                            rounded="full"
                            fontSize="18px">
                                <Flex gap="3%"><EditIcon /><p>Edit</p></Flex>
                            </Button>
                            <p>Create<br />2023-01-01 00:00</p>
                            <p>Update<br />2023-01-01 00:00</p>
                        </Flex>
                    </Box>
                    <Box className="comment-wrapper" w="49%">
                        <ul style={{listStyle:"none"}}>
                            {data.map((item, index) => (
                                <li key={index} style={{marginBottom: "3%"}}>
                                    <Box border="1px solid #333" rounded="10">
                                        <Box fontWeight="bold">
                                            <Box bg="#25855A" borderRadius="8px 8px 0 0" borderBottom="1px solid #333">
                                                <Flex width="90%" m="0 auto" justifyContent="space-between" color="#fff">
                                                    <p>{item.name}</p>
                                                    <p>{item.date}</p>
                                                </Flex>
                                            </Box>
                                            <Box p="2%">
                                                <p>{item.comment}</p>
                                            </Box>
                                        </Box>
                                    </Box>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Flex>
            </main>

            {/* モーダルについて */}
            <Box className="modalWrapper" style={{display: isModalVisible ? 'block' : 'none'}}>
                <Box
                onClick={() => toggleModal()}
                w="100vw"
                h="100vh"
                bg="#000"
                opacity=".3"
                position="absolute"
                top="0"
                left="0">
                </Box>
                <Box
                zIndex="100"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="#fff"
                p="1%"
                border="1px solid #333"
                rounded="10px">
                    <Box fontSize="2rem" fontWeight="bold">Comment</Box>
                    <FormLabel w="100%">
                        Name
                        <Input value={commentName} onChange={(e) => setCommentName(e.target.value)}/>
                    </FormLabel>
                    <FormLabel w="100%">
                        Your Comment
                        <Textarea value={commentComment} onChange={(e) => setCommentComment(e.target.value)} />
                    </FormLabel>
                    <Button
                    onClick={() => handleClickComment()}
                    color="#fff"
                    bg="#25855A"
                    border="1px solid #333"
                    rounded="10px"
                    fontSize="18px"
                    w="100%">
                        CREATE
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
