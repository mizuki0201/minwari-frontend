import React, { Dispatch, SetStateAction } from "react";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

type Props = {
  id: string;
  label: string;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
  placeholder: string;
};

export const FormNumberInput = (props: Props) => {
  const { id, label, value, onChange, placeholder } = props;

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: Dispatch<SetStateAction<number>>
  ) => {
    const numValue = Number(e.target.value);
    fn(numValue);
  };

  return (
    <FormControl id={id}>
      <FormLabel>{label}</FormLabel>
      <NumberInput value={value}>
        <NumberInputField
          onChange={(e) => onChangeValue(e, onChange)}
          placeholder={placeholder}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
