import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

export const FormInput = (props: Props) => {
  const { id, label, type, value, onChange, placeholder } = props;

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: Dispatch<SetStateAction<string>>
  ) => {
    fn(e.target.value);
  };

  return (
    <>
      <FormControl id={id}>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          value={value}
          onChange={(e) => onChangeValue(e, onChange)}
          placeholder={placeholder}
        />
      </FormControl>
    </>
  );
};
