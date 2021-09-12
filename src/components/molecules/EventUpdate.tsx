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
import { updateEvent } from "../../apis/events/updateEvent";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { Event } from "../../types/types";
import { EditButton } from "../atoms/EditButton";
import { FormInput } from "../atoms/FormInput";

type Props = {
  groupId: string;
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event>>;
};

export const EventUpdate = (props: Props) => {
  const { groupId, event, setEvent } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const { userCookies } = useContext(LoginUserContext);

  const onCloseEdit = () => {
    setUpdateTitle("");
    setUpdateDescription("");
    onClose();
  };

  const onClickUpdateGroup = async () => {
    const result = await updateEvent({
      groupId: groupId,
      eventId: event.id,
      updateTitle: updateTitle,
      updateDescription: updateDescription,
      userCookies: userCookies,
    });

    setEvent({
      ...event,
      title: result.title,
      description: result.description,
    });
    setUpdateTitle(event.title);
    setUpdateDescription(event.description);
    onClose();
  };

  const onOpenModal = () => {
    setUpdateTitle(event.title);
    setUpdateDescription(event.description);
    onOpen();
  };

  return (
    <>
      <EditButton onClick={onOpenModal} />
      <Modal isOpen={isOpen} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">イベント更新</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormInput
              id="title"
              label="イベント名"
              type="text"
              value={updateTitle}
              onChange={setUpdateTitle}
              placeholder="イベント名を入力してください"
            />
            <FormInput
              id="description"
              label="イベント詳細"
              type="text"
              value={updateDescription}
              onChange={setUpdateDescription}
              placeholder="イベント詳細を入力してください"
            />
            <Button colorScheme="blue" my={5} onClick={onClickUpdateGroup}>
              イベント更新
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
