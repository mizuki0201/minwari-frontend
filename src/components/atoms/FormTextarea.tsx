import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/textarea";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

export const FormTextarea = (props: Props) => {
  const { id, label, value, onChange, placeholder } = props;

  const onChangeValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    fn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    fn(e.target.value);
  };

  return (
    <FormControl id={id}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        value={value}
        onChange={(e) => onChangeValue(e, onChange)}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
