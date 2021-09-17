import axios from "axios";
import { UserCookie } from "../../types/types";

export const indexFriends = async (userCookies: UserCookie | undefined) => {
  const result = await axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/friends`, {
      headers: userCookies,
    })
    .then((res) => {
      return res.data;
    });

  return result;
};
