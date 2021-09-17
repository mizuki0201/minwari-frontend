import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: string;
  eventId: number;
  expenceId: number;
  userCookies: UserCookie | undefined;
};

export const deleteExpence = (props: Props) => {
  const { groupId, eventId, expenceId, userCookies } = props;

  const result = axios
    .delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/groups/${groupId}/events/${eventId}/expences/${expenceId}`,
      {
        headers: userCookies,
      }
    )
    .then((res) => {
      return res.data;
    });

  return result;
};
