import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { createFriend } from "../../../apis/friends/createFriend";
import { searchFriend } from "../../../apis/friends/searchFriend";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { ModalLayout } from "../../organisms/ModalLayout";

type User = {
  id?: number;
  name?: string;
};

export const FriendSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const [added, setAdded] = useState(false);
  const [friendStatus, setFriendStatus] = useState("");
  const [searchResult, setSearchResult] = useState<User>({});
  const { userCookies } = useContext(LoginUserContext);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onClickSearch = async () => {
    const result = await searchFriend({
      keyword,
      userCookies,
    });

    if (result.status === 200) {
      setSearchResult(result.data);
      setAdded(false);
    } else if (result.status === 301) {
      setSearchResult(result.data);
      setFriendStatus("すでに友達です");
      setAdded(true);
    } else {
      setSearchResult({});
      setFriendStatus("");
      setAdded(false);
    }
  };

  const addFriend = async (to_id?: number) => {
    const result = await createFriend({ to_id, userCookies });

    if (result.status === 200) {
      setFriendStatus("追加済み");
      setAdded(true);
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
      <ModalLayout isOpen={isOpen} onClose={onCloseModal} header="友達検索">
        <FormControl id="first-name" mb={5}>
          <FormLabel>ユーザーIDで検索</FormLabel>
          <Flex>
            <Input
              value={keyword}
              onChange={(e) => onChangeSearchValue(e)}
              placeholder="ユーザーIDを入力してください"
            />
            <Button ml={3} colorScheme="blue" _focus={{ boxShadow: "none" }}>
              <SearchIcon onClick={onClickSearch} />
            </Button>
          </Flex>
          <Box my={7}>
            {"name" in searchResult ? (
              <Flex align="center" justify="space-between">
                <Text fontSize="lg">{searchResult.name}</Text>
                {added ? (
                  <Box>{friendStatus}</Box>
                ) : (
                  <Button
                    colorScheme="blue"
                    _focus={{ boxShadow: "none" }}
                    onClick={() => addFriend(searchResult.id)}
                  >
                    友達追加
                  </Button>
                )}
              </Flex>
            ) : (
              <></>
            )}
          </Box>
        </FormControl>
      </ModalLayout>
    </>
  );
};
