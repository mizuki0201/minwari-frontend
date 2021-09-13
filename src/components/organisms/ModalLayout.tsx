import { Divider } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  children: ReactNode;
};

export const ModalLayout = (props: Props) => {
  const { isOpen, onClose, header, children } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{header}</ModalHeader>
        <Divider my={[1, 3, 3, 4]} />
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
