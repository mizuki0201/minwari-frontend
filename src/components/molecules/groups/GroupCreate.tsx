import { Button } from "@chakra-ui/button";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Divider, Flex } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useContext, useState } from "react";
import { indexFriends } from "../../../apis/friends/indexFriends";
import { createGroup } from "../../../apis/groups/createGroup";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Friend, Group } from "../../../types/types";
import { CreateButton } from "../../atoms/CreateButton";
import { FormInput } from "../../atoms/FormInput";

type Props = {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
};

export const GroupCreate = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userCookies } = useContext(LoginUserContext);
  const [name, setName] = useState("");
  const [checkedUser, setCheckedUser] = useState<string[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const { groups, setGroups } = props;

  const onOpenModal = async () => {
    onOpen();
    const result = await indexFriends(userCookies);
    setFriends(result);
  };

  const onCloseModal = () => {
    onClose();
    setName("");
    setCheckedUser([]);
  };

  const selectUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedUserId = e.target.value;
    if (e.target.checked) {
      setCheckedUser([...checkedUser, checkedUserId]);
    } else {
      const newCheckedUser = checkedUser.filter(
        (user) => user !== checkedUserId
      );
      setCheckedUser(newCheckedUser);
    }
  };

  const onClickCreateGroup = async () => {
    const result = await createGroup({ name, checkedUser, userCookies });
    setGroups([...groups, result]);

    onCloseModal();
  };

  return (
    <>
      <CreateButton onClick={onOpenModal} />
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">新規グループ作成</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormInput
              id="name"
              label="グループ名"
              type="text"
              value={name}
              onChange={setName}
              placeholder="グループ名を入力してください"
            />
            <FormControl my={5} isRequired>
              <FormLabel>追加する友達を選択</FormLabel>
              <CheckboxGroup colorScheme="blue">
                <Flex wrap="wrap">
                  {friends.map((friend, i) => (
                    <Checkbox
                      key={i}
                      value={`${friend.id}`}
                      mx={2}
                      onChange={(e) => selectUser(e)}
                    >
                      {friend.name}
                    </Checkbox>
                  ))}
                </Flex>
              </CheckboxGroup>
            </FormControl>
            <Button colorScheme="blue" mb={5} onClick={onClickCreateGroup}>
              グループ作成
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
