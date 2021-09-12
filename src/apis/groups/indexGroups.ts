import axios from "axios";
import { UserCookie } from "../../types/types";

export const indexGroups = async (userCookies: UserCookie | undefined) => {
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
