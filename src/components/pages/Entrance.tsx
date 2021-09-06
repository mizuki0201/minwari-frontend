import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack
} from "@chakra-ui/react"
import { EntranceForm } from "../organisms/EntranceForm";

export const Entrance = () => {
  return (
    <Flex align='center' justify='center' height='100vh' bg="blue.100" >
      <Box w="50%" bg="white" p={8} borderRadius='md' shadow='md'>
        <Heading as='h1' size='lg' textAlign='center'>みんわり</Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10} >
          <EntranceForm />
        </Stack>
      </Box>
    </Flex>
  );
}