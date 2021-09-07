import { Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex justify="space-between" align="center" px={10} py={4} bg="blue.500">
      <Link to="/groups">
        <Heading as="h1" color="white">
          みんわり
        </Heading>
      </Link>
      <Link to="/mypage">
        <Text fontSize="lg" color="white">
          マイページ
        </Text>
      </Link>
    </Flex>
  );
};
