import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";

type Friend = {
  id: number;
  user_id: string;
  name: string;
};
export const FriendsIndex = () => {
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friends, setFriends] = useState<Friend[]>([]);

  const getFriendRequest = async () => {
    const result = await axios
      .get("http://localhost:3001/api/v1/friends", {
        headers: userCookies,
      })
      .then((res) => {
        return res.data;
      });
    setFriends(result);
  };

  const onOpenModal = () => {
    getFriendRequest();
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">友達一覧</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            {friends.map((friend, i) => (
              <Flex key={i} align="center" mb={3}>
                <Text fontSize="lg" mr={3}>
                  {friend.name}
                </Text>
                <Text fontSize="sm">@{friend.user_id}</Text>
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
