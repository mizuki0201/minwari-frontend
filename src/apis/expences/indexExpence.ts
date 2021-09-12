import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: string;
  eventId: string;
  userCookies: UserCookie | undefined;
};

export const indexExpences = async (props: Props) => {
  const { groupId, eventId, userCookies } = props;

  const result = await axios
    .get(
      `http://localhost:3001/api/v1/groups/${groupId}/events/${eventId}/expences`,
      {
        headers: userCookies,
      }
    )
    .then((res) => {
      return res.data;
    });

  return result;
};
