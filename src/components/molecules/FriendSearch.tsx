import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
import { useState } from "react";

export const FriendSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearcValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearcValue(e.target.value);
  };

  const onClickSearch = () => {};

  return (
    <>
      <Text
        fontSize="lg"
        color="white"
        mr={6}
        cursor="pointer"
        onClick={onOpen}
      >
        友達検索
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">友達検索</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="first-name" mb={5}>
              <FormLabel>ユーザーIDで検索</FormLabel>
              <Flex>
                <Input
                  value={searchValue}
                  onChange={(e) => onChangeSearchValue(e)}
                  placeholder="ユーザーIDを入力してください"
                />
                <Button ml={3} colorScheme="blue">
                  <SearchIcon onClick={onClickSearch} />
                </Button>
              </Flex>
              <Box></Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
