import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FriendSearch } from "../molecules/friends/FriendSearch";
import { FriendsIndex } from "../molecules/friends/FriendsIndex";
import { Logout } from "../molecules/users/Logout";

export const Header = () => {
  return (
    <Flex
      position="fixed"
      w="100%"
      zIndex="100"
      justify="space-between"
      align="center"
      px={10}
      py={4}
      bg="blue.500"
    >
      <Link to="/">
        <Heading as="h1" color="white">
          みんわり
        </Heading>
      </Link>
      <Flex>
        {/* スマホ版はこのメニューをハンバーガーメニューにする */}
        <FriendSearch />
        <FriendsIndex />
        <Logout />
      </Flex>
    </Flex>
  );
};
