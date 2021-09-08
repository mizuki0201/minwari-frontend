import axios from "axios";

type Props = {
  "access-token"?: string;
  client?: string;
  uid?: string;
};

export const indexGroups = async (userCookies: Props | undefined) => {
  return await axios
    .get("http://localhost:3001/api/v1/groups", {
      headers: userCookies,
    })
    .then((res) => {
      if (res.status === 200) {
        return { status: 200, data: res.data };
      } else {
        return { status: 301, data: [] };
      }
    })
    .catch(() => {
      return { status: 302, data: [] };
    });
};
