import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { deleteDebts } from "../../apis/debts/deleteDebts";
import { indexExpences } from "../../apis/expences/indexExpences";
import { useCalc } from "../../hooks/useCalc";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { CalcArray, Debt, Event, Expence, Member } from "../../types/types";
import { EventUpdate } from "../molecules/events/EventUpdate";
import { ExpenceCreate } from "../molecules/expence/ExpenceCreate";
import { DebtsForUsers } from "../organisms/DebtsForUsers";
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
    const debtsWithUser = calc({ debts, members });
    setDebtsUsers(debtsWithUser);
  }, [debts]);

  useEffect(() => {
    getEventAndExpence();
  }, []);

  const onClickRepayment = async () => {
    const result = await deleteDebts({
      event_id: event.id,
      user_id: userCookies?.currentUserId,
      userCookies,
    });

    if (result.status === 200) {
      const newDebts = debts.filter((debt) => {
        if (
          !(
            debt.event_id === event.id &&
            debt.to_id == userCookies?.currentUserId
          )
        ) {
          return debt;
        }
      });
      setDebts(newDebts);
    }
  };

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
              <DebtsForUsers
                debtsUsers={debtsUsers}
                onClick={onClickRepayment}
              />
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
                debts={debts}
                setDebts={setDebts}
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
