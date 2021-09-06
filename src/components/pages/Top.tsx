import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Header } from "../organisms/Header";

type Group = {
  id: number;
  name: string;
};

export const Top = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const history = useHistory();
  const [userCookies, setCookie, removeCookie] = useCookies(["access-token"]);
  // useContext

  useEffect(() => {
    console.log(userCookies);
    axios
      .get("http://localhost:3001/api/v1/groups", {
        // access_token: userCookies,
        headers: {
          "access-token": "aCyKCRe5ekJLlrPC7wRwzg",
          client: "xOwRaQeY9ApD-sNKF6Y1oQ",
          uid: "mail3@gmail.com",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setGroups(res.data);
        // console.log(userCookies);
      });
  }, []);

  const createGroup = () => {
    const responce = axios
      .post("http://localhost:3001/api/v1/groups", {
        group: {
          name: "hoge",
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          history.push("/");
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
    axios.delete(`http://localhost:3001/api/v1/groups/${id}`).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Header />
      <p>Topページ</p>
      <button onClick={createGroup}>グループ新規作成</button>
      <button onClick={updateGroup}>グループ更新</button>
      {groups.map((group) => (
        <div>
          <p key={group.id}>{group.name}</p>
          <button onClick={() => deleteGroup(group.id)}>削除</button>
        </div>
      ))}
    </div>
  );
};
