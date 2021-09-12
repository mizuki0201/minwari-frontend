import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Divider } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useContext, useState } from "react";
import { updateGroup } from "../../../apis/groups/updateGroup";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Group } from "../../../types/types";
import { EditButton } from "../../atoms/EditButton";
import { FormInput } from "../../atoms/FormInput";

type Props = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group>>;
};

export const GroupUpdate = (props: Props) => {
  const { group, setGroup } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateName, setUpdateName] = useState("");
  const { userCookies } = useContext(LoginUserContext);

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
  };

  const onOpenModal = () => {
    setUpdateName(group.name);
    onOpen();
  };

  return (
    <>
      <EditButton onClick={onOpenModal} />
      <Modal isOpen={isOpen} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">グループ更新</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormInput
              id="name"
              label="グループ名"
              type="text"
              value={updateName}
              onChange={setUpdateName}
              placeholder="グループ名を入力してください"
            />
            <Button colorScheme="blue" my={5} onClick={onClickUpdateGroup}>
              グループ更新
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
