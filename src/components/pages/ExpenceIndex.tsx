import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { indexExpences } from "../../apis/expences/indexExpences";
import { useCalc } from "../../hooks/useCalc";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { CalcArray, Debt, Event, Expence, Member } from "../../types/types";
import { EventUpdate } from "../molecules/events/EventUpdate";
import { ExpenceCreate } from "../molecules/expence/ExpenceCreate";
import { ExpenceBox } from "../organisms/ExpenceBox";
import { Header } from "../organisms/Header";

type Params = {
  group_id: string;
  event_id: string;
};

export const ExpenceIndex = () => {
  const { group_id, event_id } = useParams<Params>();
  const { userCookies } = useContext(LoginUserContext);
  const [event, setEvent] = useState<Event>({} as Event);
  const [expences, setExpences] = useState<Expence[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [debtsUsers, setDebtsUsers] = useState<CalcArray[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const { calc } = useCalc();

  const getEventAndExpence = async () => {
    const result = await indexExpences({
      groupId: group_id,
      eventId: event_id,
      userCookies,
    });

    setEvent(result.event);
    setExpences(result.expences);
    setMembers(result.members);
    setDebts(result.debts);
  };

  useEffect(() => {
    const debtsWithUser = calc({ debts, members, expences });
    setDebtsUsers(debtsWithUser);
    console.log(debtsWithUser);
  }, [debts]);

  useEffect(() => {
    getEventAndExpence();
  }, []);

  return (
    <>
      <Header />
      <Box w="100%" minH="100vh" p={4} bg="blue.100" pt="85px">
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
                {debtsUsers.map((debtsUser) => (
                  <Flex
                    key={debtsUser.userId}
                    my={2}
                    fontSize="lg"
                    justify="space-between"
                  >
                    <Text>{debtsUser.userName}</Text>
                    <Text>{debtsUser.debtPrice}円</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Box>
          <Box w="75%" p={5}>
            <Center fontSize="xl" fontWeight="bold">
              支出一覧
            </Center>
            {expences.map((expence) => (
              <ExpenceBox
                key={expence.id}
                expence={expence}
                groupId={group_id}
                expences={expences}
                setExpences={setExpences}
                members={members}
              />
            ))}
          </Box>
        </Flex>
      </Box>
      <ExpenceCreate
        groupId={group_id}
        eventId={event_id}
        expences={expences}
        setExpences={setExpences}
        debts={debts}
        setDebts={setDebts}
        members={members}
      />
    </>
  );
};
