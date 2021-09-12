import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: number;
  title: string;
  description: string;
  userCookies: UserCookie | undefined;
};

export const createEvent = async (props: Props) => {
  const { groupId, title, description, userCookies } = props;

  const result = await axios
    .post(
      `http://localhost:3001/api/v1/groups/${groupId}/events`,
      {
        event: {
          title: title,
          description: description,
        },
      },
      {
        headers: userCookies,
      }
    )
    .then((res) => {
      return res.data;
    });

  return result;
};
