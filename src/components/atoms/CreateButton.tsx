import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";

type Props = {
  onClick: () => void;
};

export const CreateButton = (props: Props) => {
  const { onClick } = props;

  return (
    <Button
      w="90px"
      h="90px"
      colorScheme="blue"
      color="white"
      fontSize="4xl"
      borderRadius="full"
      position="fixed"
      bottom="70px"
      right="70px"
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  );
};
