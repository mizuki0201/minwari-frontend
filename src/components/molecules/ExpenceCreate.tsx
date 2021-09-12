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
import axios from "axios";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { CreateButton } from "../atoms/CreateButton";
import { FormInput } from "../atoms/FormInput";
import { FormTextarea } from "../atoms/FormTextarea";

type Expence = {
  id: number;
  title: string;
  description: string;
  price: number;
  event_id: number;
  user_id: number;
};

type Members = {
  id: number;
  name: string;
};

type Props = {
  groupId: string;
  eventId: string;
  expences: Expence[];
  setExpences: React.Dispatch<React.SetStateAction<Expence[]>>;
  members: Members[];
};

export const ExpenceCreate = (props: Props) => {
  const { groupId, eventId, expences, setExpences, members } = props;
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const onCloseModal = () => {
    onClose();
    setTitle("");
    setDescription("");
    setPrice("");
  };

  const onClickCreateExpence = async () => {
    const result = await axios
      .post(
        `http://localhost:3001/api/v1/groups/${groupId}/events/${eventId}/expences`,
        {
          expence: {
            title: title,
            description: description,
            price: price,
            event_id: eventId,
            user_id: selectedUser,
          },
        },
        {
          headers: userCookies,
        }
      )
      .then((res) => {
        return res.data;
      });

    setExpences([...expences, result]);
    onCloseModal();
  };

  return (
    <>
      <CreateButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">新規支出記録</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <FormInput
              id="title"
              label="支出名"
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="支出名を入力してください"
            />
            <Box my={3}>
              <FormTextarea
                id="description"
                label="支出詳細"
                value={description}
                onChange={setDescription}
                placeholder="支出詳細を入力してください"
              />
            </Box>
            <FormInput
              id="price"
              label="支出額"
              type="text"
              value={price}
              onChange={setPrice}
              placeholder="支出額を入力してください"
            />
            <FormControl my={5} isRequired>
              <FormLabel>支出者を選択</FormLabel>
              <RadioGroup colorScheme="blue" onChange={setSelectedUser}>
                {members.map((member) => (
                  <Radio key={member.id} value={`${member.id}`} mx={2}>
                    {member.name}
                  </Radio>
                ))}
              </RadioGroup>
              <Button colorScheme="blue" mt={5} onClick={onClickCreateExpence}>
                支出記録
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
