import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  expence_id?: number;
  event_id?: number;
  group_id?: number;
  user_id: number | undefined;
  userCookies: UserCookie | undefined;
};

export const deleteDebts = async (props: Props) => {
  const { expence_id, event_id, group_id, userCookies } = props;

  const result = axios
    .delete("http://localhost:3001/api/v1/debts", {
      params: {
        expence_id: expence_id,
        event_id: event_id,
        group_id: group_id,
        user_id: userCookies?.currentUserId,
      },
      headers: userCookies,
    })
    .then((res) => {
      return res.data;
    });

  return result;
};
