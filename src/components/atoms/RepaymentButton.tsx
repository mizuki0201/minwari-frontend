import { Button } from "@chakra-ui/button";

type Props = {
  onClick: () => void;
};

export const RepaymentButton = (props: Props) => {
  const { onClick } = props;

  return (
    <Button
      w="60px"
      h="40px"
      _focus={{ boxShadow: "none" }}
      colorScheme="teal"
      onClick={onClick}
    >
      返済
    </Button>
  );
};
