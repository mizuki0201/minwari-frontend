import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: string;
  userCookies: UserCookie | undefined;
};

export const indexEvents = async (props: Props) => {
  const { groupId, userCookies } = props;

  const result = await axios
    .get(`http://localhost:3001/api/v1/groups/${groupId}/events`, {
      headers: userCookies,
    })
    .then((res) => {
      return res.data;
    });

  return result;
};
