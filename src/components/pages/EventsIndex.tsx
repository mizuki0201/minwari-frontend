import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { indexEvents } from "../../apis/events/indexEvents";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { Event, Group } from "../../types/types";
import { EventCreate } from "../molecules/events/EventCreate";
import { GroupUpdate } from "../molecules/groups/GroupUpdate";
import { EventBox } from "../organisms/EventBox";
import { Header } from "../organisms/Header";

type Params = {
  group_id: string;
};

export const EventsIndex = () => {
  const { group_id } = useParams<Params>();
  const { userCookies } = useContext(LoginUserContext);
  const [group, setGroup] = useState<Group>({} as Group);
  const [events, setEvents] = useState<Event[]>([]);

  const getGroupAndEvents = async () => {
    const result = await indexEvents({ groupId: group_id, userCookies });

    setGroup(result.group);
    setEvents(result.events);
  };

  useEffect(() => {
    getGroupAndEvents();
  }, []);

  return (
    <>
      <Header />
      <Flex w="100%" h="100vh" p={4} bg="blue.100">
        <Box w="25%" mr={5}>
          <Flex align="center" justify="space-between" py={4} pl={3}>
            <Text fontSize="xl" fontWeight="bold">
              {group.name}
            </Text>
            <GroupUpdate group={group} setGroup={setGroup} />
          </Flex>
          <Divider my={[1, 3, 3, 4]} />
          <Box py={3}>
            <Center fontSize="lg" fontWeight="bold">
              グループ合計の割り勘額
            </Center>
            <Box py={4} px={8}>
              {group.members?.map((member) => (
                <Flex
                  key={member.id}
                  my={2}
                  fontSize="lg"
                  justify="space-between"
                >
                  <Text>{member.name}</Text>
                  <Text>200円</Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Box>
        <Box w="75%" p={5}>
          <Center fontSize="xl" fontWeight="bold">
            イベント一覧
          </Center>
          {events.map((event) => (
            <EventBox key={event.id} event={event} groupId={group_id} />
          ))}
        </Box>
      </Flex>
      <EventCreate group={group} events={events} setEvents={setEvents} />
    </>
  );
};
