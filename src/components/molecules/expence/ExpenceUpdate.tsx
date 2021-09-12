import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Divider } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useContext, useState } from "react";
import { updateExpence } from "../../../apis/expences/updateExpence";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Expence, Member } from "../../../types/types";
import { EditButton } from "../../atoms/EditButton";
import { FormInput } from "../../atoms/FormInput";
import { FormNumberInput } from "../../atoms/FormNumberInput";
import { FormTextarea } from "../../atoms/FormTextarea";

type Props = {
  groupId: string;
  eventId: number;
  expence: Expence;
  expences: Expence[];
  setExpences: React.Dispatch<React.SetStateAction<Expence[]>>;
  members: Member[];
};

export const ExpenceUpdate = (props: Props) => {
  const { groupId, eventId, expence, expences, setExpences, members } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState(0);
  const [updateSelectedUser, setUpdateSelectedUser] = useState("");
  const { userCookies } = useContext(LoginUserContext);

  const onCloseEdit = () => {
    setUpdateTitle("");
    setUpdateDescription("");
    setUpdatePrice(0);
    onClose();
  };

  const onClickUpdateExpence = async () => {
    const result = await updateExpence({
      groupId,
      eventId,
      expenceId: expence.id,
      updateTitle,
      updateDescription,
      updatePrice,
      updateSelectedUser,
      userCookies,
    });
    const newExpences = expences.map((expence) => {
      if (expence.id === result.id) {
        return result;
      } else {
        return expence;
      }
    });
    setExpences(newExpences);
    onClose();
  };

  const onOpenModal = () => {
    setUpdateTitle(expence.title);
    setUpdateDescription(expence.description);
    setUpdatePrice(expence.price);
    setUpdateSelectedUser(`${expence.user_id}`);
    onOpen();
  };

  return (
    <>
      <EditButton onClick={onOpenModal} />
      <Modal isOpen={isOpen} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">支出記録編集</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormInput
              id="title"
              label="支出名"
              type="text"
              value={updateTitle}
              onChange={setUpdateTitle}
              placeholder="支出名を入力してください"
            />
            <Box my={3}>
              <FormTextarea
                id="description"
                label="支出詳細"
                value={updateDescription}
                onChange={setUpdateDescription}
                placeholder="支出詳細を入力してください"
              />
            </Box>
            <FormNumberInput
              id="price"
              label="支出額"
              value={updatePrice}
              onChange={setUpdatePrice}
              placeholder="支出額を入力してください"
            />
            <FormControl my={5} isRequired>
              <FormLabel>支払者を選択</FormLabel>
              <RadioGroup
                colorScheme="blue"
                defaultValue={`${expence.user_id}`}
                onChange={setUpdateSelectedUser}
              >
                {members.map((member) => (
                  <Radio key={member.id} value={`${member.id}`} mx={2}>
                    {member.name}
                  </Radio>
                ))}
              </RadioGroup>
            </FormControl>
            <Button colorScheme="blue" my={5} onClick={onClickUpdateExpence}>
              支出記録
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
