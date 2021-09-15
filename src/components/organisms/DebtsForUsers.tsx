import { Box, Flex, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { CalcArray } from "../../types/types";
import { RepaymentButton } from "../atoms/RepaymentButton";

type Props = {
  debtsUsers: CalcArray[];
  onClick: () => void;
};

export const DebtsForUsers = (props: Props) => {
  const { debtsUsers, onClick } = props;
  const { userCookies } = useContext(LoginUserContext);

  return (
    <Box p={4}>
      {debtsUsers.map((debtsUser) => (
        <Flex
          key={debtsUser.userId}
          my={2}
          fontSize="lg"
          justify="space-between"
          align="center"
        >
          <Text>{debtsUser.userName}</Text>
          <Text>{debtsUser.debtPrice}円</Text>
          {debtsUser.userId == userCookies?.currentUserId ? (
            <RepaymentButton
              disabled={debtsUser.debtPrice >= 0}
              onClick={onClick}
            />
          ) : (
            <Box w="60px" h="40px"></Box>
          )}
        </Flex>
      ))}
    </Box>
  );
};
