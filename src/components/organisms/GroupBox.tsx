import { Box, Text } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { Group } from "../../types/types";

export const GroupBox = (props: Group) => {
  const { id, name, members } = props;
  const history = useHistory();

  const onClickToEventIndex = () => {
    history.push(`/groups/${id}/events`);
  };

  return (
    <Box
      w={["90%", "40%", "40%", "30%"]}
      mb={8}
      bg="white"
      px={8}
      py={5}
      borderRadius="md"
      shadow="md"
      cursor="pointer"
      onClick={onClickToEventIndex}
    >
      <Text mb={2} fontSize="lg" fontWeight="bold">
        {name}
      </Text>
      <Box>
        メンバー：
        {members?.map((member) => (
          <Text key={member.id} display="inline" mr={2}>
            {member.name}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
