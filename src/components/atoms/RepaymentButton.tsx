import { Button } from "@chakra-ui/button";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const RepaymentButton = (props: Props) => {
  const { disabled, onClick } = props;

  return (
    <Button
      w="60px"
      h="40px"
      _focus={{ boxShadow: "none" }}
      colorScheme="teal"
      disabled={disabled}
      onClick={onClick}
    >
      返済
    </Button>
  );
};
