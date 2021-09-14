import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { useContext } from "react";
import { deleteExpence } from "../../../apis/expences/deleteExpence";
import { Debt, Expence } from "../../../types/types";
import { DeleteButton } from "../../atoms/DeleteButton";
import { useMessage } from "../../../hooks/useMessage";

type Props = {
  groupId: string;
  eventId: number;
  expenceId: number;
  expences: Expence[];
  setExpences: React.Dispatch<React.SetStateAction<Expence[]>>;
  debts: Debt[];
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
};

export const ExpenceDelete = (props: Props) => {
  const {
    groupId,
    eventId,
    expenceId,
    expences,
    setExpences,
    debts,
    setDebts,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userCookies } = useContext(LoginUserContext);
  const { showMessage } = useMessage();

  const onClickDelete = async () => {
    const result = await deleteExpence({
      groupId,
      eventId,
      expenceId,
      userCookies,
    });

    if (result.status === 200) {
      const newExpences = expences.filter(
        (expence) => expence.id !== expenceId
      );
      setExpences(newExpences);

      const newDebts = debts.filter((debt) => debt.expence_id !== expenceId);
      setDebts(newDebts);
    }
    onClose();
    showMessage({ title: "支出情報を削除しました", status: "success" });
  };

  return (
    <>
      <DeleteButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>削除確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>付随する割り勘の情報も削除されます。</Text>
            <Text>本当に削除しますか？</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button colorScheme="red" onClick={onClickDelete}>
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
