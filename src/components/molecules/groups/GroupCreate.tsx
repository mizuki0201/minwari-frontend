import { Button } from "@chakra-ui/button";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { indexFriends } from "../../../apis/friends/indexFriends";
import { createGroup } from "../../../apis/groups/createGroup";
import { useMessage } from "../../../hooks/useMessage";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Friend, Group } from "../../../types/types";
import { CreateButton } from "../../atoms/CreateButton";
import { FormInput } from "../../atoms/FormInput";
import { ModalLayout } from "../../organisms/ModalLayout";

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
  const { showMessage } = useMessage();

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
    showMessage({ title: "グループを作成しました", status: "success" });
  };

  return (
    <>
      <CreateButton onClick={onOpenModal} />
      <ModalLayout
        isOpen={isOpen}
        onClose={onCloseModal}
        header="新規グループ作成"
      >
        <FormInput
          id="name"
          label="グループ名"
          type="text"
          value={name}
          onChange={setName}
          placeholder="グループ名を入力してください（50文字以内）"
        />
        <FormControl my={5}>
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
        <Button
          colorScheme="blue"
          mb={5}
          disabled={!(name !== "" && checkedUser.length !== 0)}
          onClick={onClickCreateGroup}
        >
          グループ作成
        </Button>
      </ModalLayout>
    </>
  );
};
