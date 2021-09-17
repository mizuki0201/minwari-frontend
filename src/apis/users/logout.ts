import axios from "axios";
import { UserCookie } from "../../types/types";

export const logout = async (userCookies: UserCookie | undefined) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/auth/sign_out`, {
      headers: userCookies,
    })
    .then(() => {
      return { status: 200 };
    })
    .catch(() => {
      return { status: 301 };
    });
};
