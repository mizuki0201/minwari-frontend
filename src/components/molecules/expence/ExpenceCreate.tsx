import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useContext, useState } from "react";
import { createExpence } from "../../../apis/expences/createExpence";
import { useMessage } from "../../../hooks/useMessage";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Debt, Expence, Member } from "../../../types/types";
import { CreateButton } from "../../atoms/CreateButton";
import { FormInput } from "../../atoms/FormInput";
import { FormNumberInput } from "../../atoms/FormNumberInput";
import { FormTextarea } from "../../atoms/FormTextarea";
import { ModalLayout } from "../../organisms/ModalLayout";

type Props = {
  groupId: string;
  eventId: string;
  expences: Expence[];
  setExpences: React.Dispatch<React.SetStateAction<Expence[]>>;
  debts: Debt[];
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
  members: Member[];
};

export const ExpenceCreate = (props: Props) => {
  const { groupId, eventId, expences, setExpences, debts, setDebts, members } =
    props;
  const { userCookies } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedUser, setSelectedUser] = useState("");
  const { showMessage } = useMessage();

  const onCloseModal = () => {
    onClose();
    setTitle("");
    setDescription("");
    setPrice(0);
  };

  const onClickCreateExpence = async () => {
    const result = await createExpence({
      title,
      description,
      price,
      eventId,
      selectedUser,
      groupId,
      userCookies,
    });

    setExpences([...expences, result.expence]);
    setDebts([...debts, result.debts]);
    onCloseModal();
    showMessage({ title: "支出情報を記録しました", status: "success" });
  };

  return (
    <>
      <CreateButton onClick={onOpen} />
      <ModalLayout isOpen={isOpen} onClose={onCloseModal} header="新規支出記録">
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
        <FormNumberInput
          id="price"
          label="支出額"
          value={price}
          onChange={setPrice}
          placeholder="支出額を入力してください"
        />
        <FormControl my={5}>
          <FormLabel>支払者を選択</FormLabel>
          <RadioGroup colorScheme="blue" onChange={setSelectedUser}>
            {members.map((member) => (
              <Radio key={member.id} value={`${member.id}`} mx={2}>
                {member.name}
              </Radio>
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          my={5}
          disabled={!(title !== "" && price !== 0 && selectedUser !== "")}
          onClick={onClickCreateExpence}
        >
          支出記録
        </Button>
      </ModalLayout>
    </>
  );
};
