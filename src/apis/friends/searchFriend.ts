import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  keyword: string;
  userCookies: UserCookie | undefined;
};

export const searchFriend = async (props: Props) => {
  const { keyword, userCookies } = props;
  const result = await axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
      params: {
        keyword: keyword,
      },
      headers: userCookies,
    })
    .then((res) => {
      return res.data;
    });

  return result;
};
