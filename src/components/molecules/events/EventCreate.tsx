import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { createEvent } from "../../../apis/events/createEvent";
import { useMessage } from "../../../hooks/useMessage";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Event, Group } from "../../../types/types";
import { CreateButton } from "../../atoms/CreateButton";
import { FormInput } from "../../atoms/FormInput";
import { FormTextarea } from "../../atoms/FormTextarea";
import { ModalLayout } from "../../organisms/ModalLayout";

type Props = {
  group: Group;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

export const EventCreate = (props: Props) => {
  const { group, events, setEvents } = props;
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { showMessage } = useMessage();

  const onCloseModal = () => {
    onClose();
    setTitle("");
    setDescription("");
  };

  const onClickCreateEvent = async () => {
    const result = await createEvent({
      groupId: group.id,
      title: title,
      description: description,
      userCookies: userCookies,
    });

    setEvents([...events, result]);
    onCloseModal();
    showMessage({ title: "イベントを作成しました", status: "success" });
  };

  return (
    <>
      <CreateButton onClick={onOpen} />
      <ModalLayout
        isOpen={isOpen}
        onClose={onCloseModal}
        header="新規イベント作成"
      >
        <FormInput
          id="title"
          label="イベント名"
          type="text"
          value={title}
          onChange={setTitle}
          placeholder="イベント名を入力してください"
        />
        <Box mt={3} mb={5}>
          <FormTextarea
            id="description"
            label="イベント詳細"
            value={description}
            onChange={setDescription}
            placeholder="イベント詳細を入力してください"
          />
        </Box>
        <Button
          colorScheme="blue"
          mb={5}
          disabled={!title}
          onClick={onClickCreateEvent}
        >
          イベント作成
        </Button>
      </ModalLayout>
    </>
  );
};
