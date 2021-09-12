import { Box, Center, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { indexGroups } from "../../apis/groups/indexGroups";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { GroupBox } from "../organisms/GroupBox";
import { Header } from "../organisms/Header";
import { GroupCreate } from "../molecules/groups/GroupCreate";
import { Group } from "../../types/types";

export const Top = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const history = useHistory();
  const { userCookies } = useContext(LoginUserContext);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const result = await indexGroups(userCookies);
    if (result.status === 200) {
      setGroups(result.data);
    } else if (result.status === 302) {
      history.push("/entrance");
    }
  };

  return (
    <>
      <Header />
      <Box h="100vh" w="100vw" bg="blue.100" px={10}>
        <Center py={8} fontSize="2xl" fontWeight="bold">
          グループ一覧
        </Center>
        <Flex mx={[2, 4, 6, 10]} py={5} wrap="wrap" justify="space-between">
          {groups.map((group) => (
            <GroupBox
              key={group.id}
              id={group.id}
              name={group.name}
              members={group.members}
            />
          ))}
          {/* PC版で1列に2つのカードときに、space-betweenでもきれいに見せるためのダミー */}
          <Box w={["90%", "40%", "40%", "30%"]} />
        </Flex>
      </Box>
      <GroupCreate groups={groups} setGroups={setGroups} />
    </>
  );
};
