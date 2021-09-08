import axios from "axios";

type Props = {
  "access-token"?: string;
  client?: string;
  uid?: string;
};

export const logout = async (userCookies: Props | undefined) => {
  return await axios
    .delete("http://localhost:3001/api/v1/auth/sign_out", {
      headers: userCookies,
    })
    .then(() => {
      return { status: 200 };
    })
    .catch(() => {
      return { status: 301 };
    });
};
