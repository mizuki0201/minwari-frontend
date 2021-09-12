import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { Expence } from "../../types/types";

type Props = {
  expence: Expence;
};

export const ExpenceBox = (props: Props) => {
  const { expence } = props;

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
          {expence.price}円（支払：{expence.user_id}）
        </Text>
      </Flex>
      <Divider my={3} />
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="md">内訳</Text>
          <Flex fontSize="sm">
            <Flex mx={1}>
              <Text mr={2}>user1</Text>
              <Text>100円</Text>
            </Flex>
            <Flex mx={1}>
              <Text mr={2}>user1</Text>
              <Text>100円</Text>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Button mr={2} />
          <Button />
        </Box>
      </Flex>
    </Box>
  );
};
