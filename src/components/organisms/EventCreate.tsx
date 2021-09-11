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
import { CreateButton } from "../atoms/CreateButton";

export const EventCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpenModal = () => {
    onOpen();
  };

  const onCloseModal = () => {
    onClose();
  };

  const onClickCreateEvent = () => {
    //
  };

  return (
    <>
      <CreateButton onClick={onOpenModal} />
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">新規イベント作成</ModalHeader>
          <Divider my={[1, 3, 3, 4]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Button colorScheme="blue" mb={5} onClick={onClickCreateEvent}>
              イベント作成
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
