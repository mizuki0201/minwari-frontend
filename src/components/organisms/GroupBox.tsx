import { Box, Text } from "@chakra-ui/react";

type Props = {
  id: number;
  name: string;
  members: [
    {
      id: number;
      name: string;
    }
  ];
};

export const GroupBox = (props: Props) => {
  const { id, name, members } = props;
  const onClickGroup = () => {
    // グループ詳細取得 && 詳細ページへ遷移する
    console.log("はにゃ？");
  };

  return (
    <Box
      w={["90%", "40%", "40%", "30%"]}
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
      <Text>
        メンバー：
        {members?.map((member) => (
          <Text key={member.id} display="inline" mr={2}>
            {member.name}
          </Text>
        ))}
      </Text>
    </Box>
  );
};
