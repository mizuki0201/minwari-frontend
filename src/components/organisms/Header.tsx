import { Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { logout } from "../../apis/users/logout";
import { useContext } from "react";
import { FriendSearch } from "../molecules/FriendSearch";
import { FriendsIndex } from "../molecules/FriendsIndex";

export const Header = () => {
  const { userCookies, removeCookie } = useContext(LoginUserContext);
  const history = useHistory();

  const clickOnLoguot = () => {
    // logout();
    axios
      .delete("http://localhost:3001/api/v1/auth/sign_out", {
        headers: userCookies,
      })
      .then(() => {
        removeCookie("access-token");
        removeCookie("client");
        removeCookie("uid");
        history.push("/entrance");
      });
  };

  return (
    <Flex justify="space-between" align="center" px={10} py={4} bg="blue.500">
      <Link to="/groups">
        <Heading as="h1" color="white">
          みんわり
        </Heading>
      </Link>
      <Flex>
        {/* スマホ版はこのメニューをハンバーガーメニューにする */}
        <FriendSearch />
        <FriendsIndex />
        <Text
          fontSize="lg"
          color="white"
          cursor="pointer"
          onClick={clickOnLoguot}
        >
          ログアウト
        </Text>
      </Flex>
    </Flex>
  );
};
