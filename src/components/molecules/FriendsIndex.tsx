import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";

export const FriendsIndex = () => {
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friends, setFriends] = useState([]);

  const getFriendRequest = async () => {
    const result = await axios
      .get("http://localhost:3001/api/v1/friends", {
        headers: userCookies,
      })
      .then((res) => {
        return res.data;
      });
    console.log(result);
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
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
