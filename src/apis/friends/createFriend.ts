import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  to_id?: number;
  userCookies: UserCookie | undefined;
};

export const createFriend = async (props: Props) => {
  const { to_id, userCookies } = props;
  const result = await axios
    .post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/friends`,
      {
        friend: {
          to_id,
        },
      },
      { headers: userCookies }
    )
    .then((res) => {
      return res.data;
    });

  return result;
};
