import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  name: string;
  checkedUser: string[];
  userCookies: UserCookie | undefined;
};

export const createGroup = async (props: Props) => {
  const { name, checkedUser, userCookies } = props;

  const result = await axios
    .post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/groups`,
      {
        group: {
          name: name,
          user_ids: checkedUser,
        },
      },
      {
        headers: userCookies,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));

  return result;
};
