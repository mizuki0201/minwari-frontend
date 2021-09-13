import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  onClick: () => void;
};

export const DeleteButton = (props: Props) => {
  const { onClick } = props;

  return (
    <Button
      colorScheme="red"
      p={2}
      fontSize="xl"
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <DeleteIcon />
    </Button>
  );
};
