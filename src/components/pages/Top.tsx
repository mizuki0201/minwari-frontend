import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { indexGroups } from "../../apis/groups/indexGroups";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { GroupBox } from "../organisms/GroupBox";
import { Header } from "../organisms/Header";

type Group = {
  id: number;
  name: string;
  members: [
    {
      id: number;
      name: string;
    }
  ];
};

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

  const onClickCreateGroup = () => {
    const responce = axios
      .post(
        "http://localhost:3001/api/v1/groups",
        {
          group: {
            name: "hoge",
          },
        },
        {
          headers: userCookies,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setGroups([...groups, res.data]);
        }
      })
      .catch((e) => console.error(e));

    return responce;
  };

  // const updateGroup = () => {
  //   const responce = axios
  //     .put("http://localhost:3001/api/v1/groups/1", {
  //       group: {
  //         id: 1,
  //         name: "updated",
  //         // name: "hoge"
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       const updatedData = res.data;
  //       const newGroups = groups.map((group) => {
  //         if (group.id === updatedData.id) {
  //           group.name = updatedData.name;
  //         }
  //         return group;
  //       });
  //       setGroups(newGroups);
  //     })
  //     .catch((e) => console.error(e));

  //   return responce;
  // };

  // const deleteGroup = (id: number) => {
  //   axios
  //     .delete(`http://localhost:3001/api/v1/groups/${id}`, {
  //       headers: userCookies,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

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
        onClick={onClickCreateGroup}
      >
        <AddIcon />
      </Button>
    </>
  );
};
