import { Button } from "@chakra-ui/button";
import { SettingsIcon } from "@chakra-ui/icons";

type Props = {
  onClick: () => void;
};

export const EditButton = (props: Props) => {
  const { onClick } = props;

  return (
    <Button
      colorScheme="blue"
      p={2}
      fontSize="xl"
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <SettingsIcon />
    </Button>
  );
};
