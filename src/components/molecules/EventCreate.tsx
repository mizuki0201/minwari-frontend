import { Button } from "@chakra-ui/button";
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
import axios from "axios";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { CreateButton } from "../atoms/CreateButton";
import { FormInput } from "../atoms/FormInput";
import { FormTextarea } from "../atoms/FormTextarea";

type Event = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  group: {
    id: number;
    name: string;
    members: [
      {
        id: number;
        name: string;
      }
    ];
  };
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

export const EventCreate = (props: Props) => {
  const { group, events, setEvents } = props;
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onCloseModal = () => {
    onClose();
    setTitle("");
    setDescription("");
  };

  const onClickCreateEvent = async () => {
    const result = await axios
      .post(
        `http://localhost:3001/api/v1/groups/${group.id}/events`,
        {
          event: {
            title: title,
            description: description,
          },
        },
        {
          headers: userCookies,
        }
      )
      .then((res) => {
        return res.data;
      });

    setEvents([...events, result]);
    onCloseModal();
  };

  return (
    <>
      <CreateButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">新規イベント作成</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
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
            <Button colorScheme="blue" mb={5} onClick={onClickCreateEvent}>
              イベント作成
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
