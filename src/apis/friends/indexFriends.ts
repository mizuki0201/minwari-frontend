import axios from "axios";
import { UserCookie } from "../../types/types";

export const indexFriends = async (userCookies: UserCookie | undefined) => {
  const result = await axios
    .get("http://localhost:3001/api/v1/friends", {
      headers: userCookies,
    })
    .then((res) => {
      return res.data;
    });

  return result;
};
