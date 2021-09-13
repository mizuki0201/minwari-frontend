import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { indexFriends } from "../../../apis/friends/indexFriends";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Friend } from "../../../types/types";
import { ModalLayout } from "../../organisms/ModalLayout";

export const FriendsIndex = () => {
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friends, setFriends] = useState<Friend[]>([]);

  const getFriends = async () => {
    const result = await indexFriends(userCookies);
    setFriends(result);
  };

  const onOpenModal = () => {
    getFriends();
    onOpen();
  };

  return (
    <>
      <Text
        fontSize="lg"
        color="white"
        mr={6}
        cursor="pointer"
        onClick={onOpenModal}
      >
        友達一覧
      </Text>
      <ModalLayout isOpen={isOpen} onClose={onClose} header="友達一覧">
        {friends.map((friend, i) => (
          <Flex key={i} align="center" mb={3}>
            <Text fontSize="lg" mr={3}>
              {friend.name}
            </Text>
            <Text fontSize="sm">@{friend.user_id}</Text>
          </Flex>
        ))}
      </ModalLayout>
    </>
  );
};
