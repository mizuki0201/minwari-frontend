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
  const [requested, setRequested] = useState(false);
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
    setSearchResult(result.data);
  };

  const friendRequest = async (to_id?: number) => {
    const result = await axios
      .post(
        "http://localhost:3001/api/v1/friend_requests",
        {
          friend_request: {
            to_id,
          },
        },
        { headers: userCookies }
      )
      .then((res) => {
        return res.data;
      });

    if (result.status === 200 || result.status === 302) {
      setRequested(true);
    }
  };

  const onCloseModal = () => {
    onClose();
    setKeyword("");
    setSearchResult({});
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
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">友達検索</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormControl id="first-name" mb={5}>
              <FormLabel>ユーザーIDで検索</FormLabel>
              <Flex>
                <Input
                  value={keyword}
                  onChange={(e) => onChangeSearchValue(e)}
                  placeholder="ユーザーIDを入力してください"
                />
                <Button
                  ml={3}
                  colorScheme="blue"
                  _focus={{ boxShadow: "none" }}
                >
                  <SearchIcon onClick={onClickSearch} />
                </Button>
              </Flex>
              <Box my={7}>
                {"name" in searchResult ? (
                  <Flex align="center" justify="space-between">
                    <Text fontSize="lg">{searchResult.name}</Text>
                    {requested ? (
                      <Box>申請済み</Box>
                    ) : (
                      <Button
                        colorScheme="blue"
                        onClick={() => friendRequest(searchResult.id)}
                      >
                        友達申請する
                      </Button>
                    )}
                  </Flex>
                ) : (
                  <Text>ユーザーが見つかりません</Text>
                )}
              </Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
