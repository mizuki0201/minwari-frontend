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
import { useContext, useState } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";

type User = {
  id?: number;
  name?: string;
};

export const FriendSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<User>({});
  const { userCookies } = useContext(LoginUserContext);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onClickSearch = async () => {
    const result = await axios
      .get("http://localhost:3001/api/v1/users", {
        params: {
          keyword: keyword,
        },
        headers: userCookies,
      })
      .then((res) => {
        return res.data;
      });
    console.log(result.data);
    setSearchResult(result.data);
  };

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
                  value={keyword}
                  onChange={(e) => onChangeSearchValue(e)}
                  placeholder="ユーザーIDを入力してください"
                />
                <Button ml={3} colorScheme="blue">
                  <SearchIcon onClick={onClickSearch} />
                </Button>
              </Flex>
              <Box>
                {"name" in searchResult ? (
                  <p>{searchResult.name}</p>
                ) : (
                  <p>ユーザーが見つかりません</p>
                )}
              </Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
