import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { Debt, Expence, Member } from "../../types/types";
import { ExpenceDelete } from "../molecules/expence/ExpenceDelete";
import { ExpenceUpdate } from "../molecules/expence/ExpenceUpdate";

type Props = {
  expence: Expence;
  groupId: string;
  expences: Expence[];
  setExpences: React.Dispatch<React.SetStateAction<Expence[]>>;
  debts: Debt[];
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
};

export const ExpenceBox = (props: Props) => {
  const { expence, groupId, expences, setExpences, debts, setDebts } = props;

  return (
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
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {expence.title}
          </Text>
          <Text fontSize="sm" mt={1}>
            {expence.description}
          </Text>
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          {expence.price}円（支払：{expence.user_name}）
        </Text>
      </Flex>
      <Divider my={3} />
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="md">内訳</Text>
          <Text fontSize="sm">人数で均等に割り勘を行う</Text>
          {/* 今後は入力式で割勘額を決めれるようにする */}
          {/* <Flex fontSize="sm">
            <Flex mx={1}>
              <Text mr={2}>user1</Text>
              <Text>100円</Text>
            </Flex>
            <Flex mx={1}>
              <Text mr={2}>user1</Text>
              <Text>100円</Text>
            </Flex>
          </Flex> */}
        </Box>
        <Flex>
          {/* 更新処理はロジックが一気に複雑になるため、今後実装する */}
          {/* <Box mr={2}>
            <ExpenceUpdate
              groupId={groupId}
              eventId={expence.event_id}
              expence={expence}
              expences={expences}
              setExpences={setExpences}
              members={members}
            />
          </Box> */}
          <ExpenceDelete
            groupId={groupId}
            eventId={expence.event_id}
            expenceId={expence.id}
            expences={expences}
            setExpences={setExpences}
            debts={debts}
            setDebts={setDebts}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
