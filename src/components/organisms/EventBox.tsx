import { Box, Flex, Text } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import { Event } from "../../types/types";

type Props = {
  event: Event;
  groupId: string;
};

export const EventBox = (props: Props) => {
  const { event, groupId } = props;
  const history = useHistory();

  const onClickToExpenceIndex = () => {
    history.push(`/groups/${groupId}/events/${event.id}`);
  };

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
      onClick={onClickToExpenceIndex}
    >
      <Flex justify="space-between" fontSize="lg" mb={2}>
        <Text fontWeight="bold">{event.title}</Text>
      </Flex>
      <Text fontSize="sm">{event.description}</Text>
    </Box>
  );
};
