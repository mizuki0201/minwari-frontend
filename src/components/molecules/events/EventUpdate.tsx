import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { updateEvent } from "../../../apis/events/updateEvent";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Event } from "../../../types/types";
import { EditButton } from "../../atoms/EditButton";
import { FormInput } from "../../atoms/FormInput";
import { FormTextarea } from "../../atoms/FormTextarea";
import { ModalLayout } from "../../organisms/ModalLayout";

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
      <ModalLayout isOpen={isOpen} onClose={onCloseEdit} header="イベント更新">
        <FormInput
          id="title"
          label="イベント名"
          type="text"
          value={updateTitle}
          onChange={setUpdateTitle}
          placeholder="イベント名を入力してください"
        />
        <Box mt={3} mb={5}>
          <FormTextarea
            id="description"
            label="イベント詳細"
            value={updateDescription}
            onChange={setUpdateDescription}
            placeholder="イベント詳細を入力してください"
          />
        </Box>
        <Button
          colorScheme="blue"
          my={5}
          disabled={!updateTitle}
          onClick={onClickUpdateGroup}
        >
          イベント更新
        </Button>
      </ModalLayout>
    </>
  );
};
