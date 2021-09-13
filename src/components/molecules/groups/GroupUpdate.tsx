import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { useContext, useState } from "react";
import { updateGroup } from "../../../apis/groups/updateGroup";
import { useMessage } from "../../../hooks/useMessage";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Group } from "../../../types/types";
import { EditButton } from "../../atoms/EditButton";
import { FormInput } from "../../atoms/FormInput";
import { ModalLayout } from "../../organisms/ModalLayout";

type Props = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group>>;
};

export const GroupUpdate = (props: Props) => {
  const { group, setGroup } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateName, setUpdateName] = useState("");
  const { userCookies } = useContext(LoginUserContext);
  const { showMessage } = useMessage();

  const onCloseEdit = () => {
    setUpdateName("");
    onClose();
  };

  const onClickUpdateGroup = async () => {
    const result = await updateGroup({
      groupId: group.id,
      updateName: updateName,
      userCookies: userCookies,
    });

    setGroup({ ...group, name: result.name });
    setUpdateName(result.name);
    onClose();
    showMessage({ title: "グループを更新しました", status: "success" });
  };

  const onOpenModal = () => {
    setUpdateName(group.name);
    onOpen();
  };

  return (
    <>
      <EditButton onClick={onOpenModal} />
      <ModalLayout isOpen={isOpen} onClose={onCloseEdit} header="グループ更新">
        <FormInput
          id="name"
          label="グループ名"
          type="text"
          value={updateName}
          onChange={setUpdateName}
          placeholder="グループ名を入力してください"
        />
        <Button
          colorScheme="blue"
          my={5}
          disabled={!updateName}
          onClick={onClickUpdateGroup}
        >
          グループ更新
        </Button>
      </ModalLayout>
    </>
  );
};
