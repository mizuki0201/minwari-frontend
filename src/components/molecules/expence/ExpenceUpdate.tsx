import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useContext, useState } from "react";
import { updateExpence } from "../../../apis/expences/updateExpence";
import { useMessage } from "../../../hooks/useMessage";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { Expence, Member } from "../../../types/types";
import { EditButton } from "../../atoms/EditButton";
import { FormInput } from "../../atoms/FormInput";
import { FormNumberInput } from "../../atoms/FormNumberInput";
import { FormTextarea } from "../../atoms/FormTextarea";
import { ModalLayout } from "../../organisms/ModalLayout";

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
  const { showMessage } = useMessage();

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
    showMessage({ title: "?????????????????????????????????", status: "success" });
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
      <ModalLayout isOpen={isOpen} onClose={onCloseEdit} header="??????????????????">
        <FormInput
          id="title"
          label="?????????"
          type="text"
          value={updateTitle}
          onChange={setUpdateTitle}
          placeholder="????????????????????????????????????"
        />
        <Box my={3}>
          <FormTextarea
            id="description"
            label="????????????"
            value={updateDescription}
            onChange={setUpdateDescription}
            placeholder="???????????????????????????????????????"
          />
        </Box>
        <FormNumberInput
          id="price"
          label="?????????"
          value={updatePrice}
          onChange={setUpdatePrice}
          placeholder="????????????????????????????????????"
        />
        <FormControl my={5}>
          <FormLabel>??????????????????</FormLabel>
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
        <Button
          colorScheme="blue"
          my={5}
          disabled={
            !(
              updateTitle !== "" &&
              updatePrice !== 0 &&
              updateSelectedUser !== ""
            )
          }
          onClick={onClickUpdateExpence}
        >
          ??????
        </Button>
      </ModalLayout>
    </>
  );
};
