import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { EntranceForm } from "../organisms/EntranceForm";

export const Entrance = () => {
  return (
    <Flex align="center" justify="center" height="100vh" bg="blue.100">
      <Box
        w={["90%", "70%", "50%"]}
        bg="white"
        p={[2, 6, 6, 8]}
        borderRadius="md"
        shadow="md"
      >
        <Heading as="h1" size="lg" textAlign="center">
          みんわり
        </Heading>
        <Divider my={[1, 3, 3, 4]} />
        <Stack spacing={[3, 6, 6, 6]} py={4} px={[1, 4, 4, 10]}>
          <EntranceForm />
        </Stack>
      </Box>
    </Flex>
  );
};
