import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { EventUpdate } from "../molecules/EventUpdate";
import { Header } from "../organisms/Header";

type Params = {
  group_id: string;
  event_id: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
};

type Expence = {
  id: number;
  title: string;
  description: string;
  price: number;
  event_id: number;
  user_id: number;
};

export const ExpenceIndex = () => {
  const { group_id, event_id } = useParams<Params>();
  const { userCookies } = useContext(LoginUserContext);
  const [event, setEvent] = useState<Event>({} as Event);
  const [expences, setExpences] = useState<Expence[]>([]);

  const getEventAndExpence = async () => {
    const result = await axios
      .get(
        `http://localhost:3001/api/v1/groups/${group_id}/events/${event_id}/expences`,
        {
          headers: userCookies,
        }
      )
      .then((res) => {
        return res.data;
      });
    console.log(result);
    setEvent(result.event);
    setExpences(result.expences);
  };

  useEffect(() => {
    getEventAndExpence();
  }, []);

  return (
    <>
      <Header />
      <Box w="100%" h="100vh" p={4} bg="blue.100">
        <Flex
          align="center"
          justifyContent="space-between"
          w="100%"
          py={3}
          px={8}
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {event.title}
            </Text>
            <Text fontSize="md" mt={3}>
              {event.description}
            </Text>
          </Box>
          <EventUpdate groupId={group_id} event={event} setEvent={setEvent} />
        </Flex>
        <Divider my={[1, 3, 3, 4]} />
        <Flex>
          <Box w="25%" mr={5}>
            <Box py={5}>
              <Center fontSize="lg" fontWeight="bold">
                イベント合計の割り勘額
              </Center>
              <Box py={4} px={8}>
                {/* {group.members?.map((member) => (
                <Flex
                  key={member.id}
                  my={2}
                  fontSize="lg"
                  justify="space-between"
                >
                  <Text>{member.name}</Text>
                  <Text>200円</Text>
                </Flex>
              ))} */}
              </Box>
            </Box>
          </Box>
          <Box w="75%" p={5}>
            <Center fontSize="xl" fontWeight="bold">
              支出一覧
            </Center>
            {/* {events.map((event) => (
            <EventBox key={event.id} event={event} groupId={group_id} />
          ))} */}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
