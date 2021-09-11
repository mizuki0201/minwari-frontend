import { Button } from "@chakra-ui/button";
import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { EventCreate } from "../organisms/EventCreate";
import { Header } from "../organisms/Header";

type Params = {
  group_id: string;
};

export const Group = () => {
  const { group_id } = useParams<Params>();
  const { userCookies } = useContext(LoginUserContext);

  useEffect(() => {
    const result = axios.get(
      `http://localhost:3001/api/v1/groups/${group_id}/events`,
      {
        headers: userCookies,
      }
    );
    console.log(result);
  }, []);

  return (
    <>
      <Header />
      <Flex w="100%" h="100vh" p={4} bg="blue.100">
        <Box w="25%" mr={5}>
          <Flex align="center" justify="space-between" py={4} pl={3}>
            <Text fontSize="xl" fontWeight="bold">
              グループ名
            </Text>
            <Button
              colorScheme="blue"
              p={2}
              fontSize="xl"
              _focus={{ boxShadow: "none" }}
            >
              <SettingsIcon />
            </Button>
          </Flex>
          <Divider my={[1, 3, 3, 4]} />
          <Box py={3}>
            <Center fontSize="lg" fontWeight="bold">
              合計割り勘額
            </Center>
            <Box py={4} px={8}>
              <Flex my={2} fontSize="lg" justify="space-between">
                <Text>user1</Text>
                <Text>200円</Text>
              </Flex>
              <Flex my={2} fontSize="lg" justify="space-between">
                <Text>user2</Text>
                <Text>-300円</Text>
              </Flex>
              <Flex my={2} fontSize="lg" justify="space-between">
                <Text>user3</Text>
                <Text>100円</Text>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box w="75%" p={5}>
          <Center fontSize="xl" fontWeight="bold">
            イベント一覧
          </Center>
          <Box
            bg="white"
            w="75%"
            ml="auto"
            mr="auto"
            mt={8}
            py={5}
            px={8}
            borderRadius="md"
            shadow="md"
            cursor="pointer"
          >
            <Flex justify="space-between" fontSize="lg" mb={2}>
              <Text fontWeight="bold">久しぶりの飲み会</Text>
              <Text>2021/09/04</Text>
            </Flex>
            <Text fontSize="sm">久しぶりの飲み会だよ〜</Text>
            <Text mt={4}>メンバー：user1 user2 user3</Text>
          </Box>
        </Box>
      </Flex>
      <EventCreate />
    </>
  );
};
