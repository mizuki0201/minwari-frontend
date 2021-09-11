import { Box, Flex, Text } from "@chakra-ui/layout";

type Props = {
  event: {
    id: number;
    title: string;
    description: string;
  };
};

export const EventBox = (props: Props) => {
  const { event } = props;
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
      <Flex justify="space-between" fontSize="lg" mb={2}>
        <Text fontWeight="bold">{event.title}</Text>
      </Flex>
      <Text fontSize="sm">{event.description}</Text>
    </Box>
  );
};
