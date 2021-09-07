import { Box, Text } from "@chakra-ui/react";
import { group } from "console";

type Props = {
  id: number;
  name: string;
};

export const GroupBox = (props: Props) => {
  const { id, name } = props;
  const onClickGroup = () => {
    // グループ詳細取得 && 詳細ページへ遷移する
    console.log("はにゃ？");
  };

  return (
    <Box
      w="30%"
      mx={5}
      mb={8}
      bg="white"
      px={8}
      py={5}
      borderRadius="md"
      shadow="md"
      onClick={onClickGroup}
    >
      <Text mb={2} fontSize="lg" fontWeight="bold">
        {name}
      </Text>
      <Text>メンバー：山田、佐藤、田中</Text>
    </Box>
  );
};
