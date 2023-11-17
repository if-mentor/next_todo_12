import {Button, Box, Flex, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';

export default function Home() {
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
                    color="#fff"
                    bg="#25855A"
                    border="1px solid #333"
                    rounded="full"
                    fontSize="18px">
                        Comment
                    </Button>
                    <Button
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
                alignItems="end">
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
                            <li style={{marginBottom: "3%"}}>
                                <Box border="1px solid #333" rounded="10">
                                    <Box fontWeight="bold">
                                        <Box bg="#25855A" borderRadius="8px 8px 0 0" borderBottom="1px solid #333">
                                            <Flex width="90%" m="0 auto" justifyContent="space-between" color="#fff">
                                                <p>ジョン</p>
                                                <p>2022/01/01</p>
                                            </Flex>
                                        </Box>
                                        <Box p="2%">
                                            <p>2日後までに完了お願い致します。</p>
                                        </Box>
                                    </Box>
                                </Box>
                            </li>
                            <li style={{marginBottom: "3%"}}>
                                <Box border="1px solid #333" rounded="10">
                                    <Box fontWeight="bold">
                                        <Box bg="#25855A" borderRadius="8px 8px 0 0" borderBottom="1px solid #333">
                                            <Flex width="90%" m="0 auto" justifyContent="space-between" color="#fff">
                                                <p>リンゴ</p>
                                                <p>2022/01/01</p>
                                            </Flex>
                                        </Box>
                                        <Box p="2%">
                                            <p>内容確認致しました。修正点メールしましたのでご確認ください。</p>
                                        </Box>
                                    </Box>
                                </Box>
                            </li>
                            <li style={{marginBottom: "3%"}}>
                                <Box border="1px solid #333" rounded="10">
                                    <Box fontWeight="bold">
                                        <Box bg="#25855A" borderRadius="8px 8px 0 0" borderBottom="1px solid #333">
                                            <Flex width="90%" m="0 auto" justifyContent="space-between" color="#fff">
                                                <p>ポール</p>
                                                <p>2022/01/01</p>
                                            </Flex>
                                        </Box>
                                        <Box p="2%">
                                            <p>2日後までに完了お願い致します。</p>
                                        </Box>
                                    </Box>
                                </Box>
                            </li>
                            <li>
                                <Box border="1px solid #333" rounded="10">
                                    <Box fontWeight="bold">
                                        <Box bg="#25855A" borderRadius="8px 8px 0 0" borderBottom="1px solid #333">
                                            <Flex width="90%" m="0 auto" justifyContent="space-between" color="#fff">
                                                <p>ジョージ</p>
                                                <p>2022/01/01</p>
                                            </Flex>
                                        </Box>
                                        <Box p="2%">
                                            <p>2日後までに完了お願い致します。</p>
                                        </Box>
                                    </Box>
                                </Box>
                            </li>
                        </ul>
                    </Box>
                </Flex>
            </main>

            {/* モーダルについて */}
            <Box
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
                    <Input />
                </FormLabel>
                <FormLabel w="100%">
                    Your Comment
                    <Textarea />
                </FormLabel>
                <Button
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
    )
}