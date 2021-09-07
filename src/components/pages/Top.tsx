import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { Header } from "../organisms/Header";

type Group = {
  id: number;
  name: string;
};

export const Top = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const history = useHistory();
  const { userCookies } = useContext(LoginUserContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/groups", {
        headers: userCookies,
      })
      .then((res) => {
        if (res.status === 200) {
          setGroups(res.data);
        }
      })
      .catch(() => {
        history.push("/entrance");
      });
  }, []);

  const createGroup = () => {
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

  const updateGroup = () => {
    const responce = axios
      .put("http://localhost:3001/api/v1/groups/1", {
        group: {
          id: 1,
          name: "updated",
          // name: "hoge"
        },
      })
      .then((res) => {
        console.log(res);
        const updatedData = res.data;
        const newGroups = groups.map((group) => {
          if (group.id === updatedData.id) {
            group.name = updatedData.name;
          }
          return group;
        });
        setGroups(newGroups);
      })
      .catch((e) => console.error(e));

    return responce;
  };

  const deleteGroup = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/v1/groups/${id}`, {
        headers: userCookies,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Header />
      <p>Topページ</p>
      <button onClick={createGroup}>グループ新規作成</button>
      <button onClick={updateGroup}>グループ更新</button>
      {groups.map((group) => (
        <div key={group.id}>
          <p>{group.name}</p>
          <button onClick={() => deleteGroup(group.id)}>削除</button>
        </div>
      ))}
    </>
  );
};
