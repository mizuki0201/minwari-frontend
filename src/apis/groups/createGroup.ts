import axios from "axios";

type UserCookie = {
  "access-token"?: string;
  client?: string;
  uid?: string;
};

type Props = {
  name: string;
  checkedUser: string[];
  userCookies: UserCookie | undefined;
};

export const createGroup = async (props: Props) => {
  const { name, checkedUser, userCookies } = props;

  const result = await axios
    .post(
      "http://localhost:3001/api/v1/groups",
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
