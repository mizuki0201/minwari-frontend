import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: string;
  eventId: number;
  expenceId: number;
  updateTitle: string;
  updateDescription: string;
  updatePrice: number;
  updateSelectedUser: string;
  userCookies: UserCookie | undefined;
};

export const updateExpence = async (props: Props) => {
  const {
    groupId,
    eventId,
    expenceId,
    updateTitle,
    updateDescription,
    updatePrice,
    updateSelectedUser,
    userCookies,
  } = props;

  const result = await axios
    .put(
      `http://localhost:3001/api/v1/groups/${groupId}/events/${eventId}/expences/${expenceId}`,
      {
        expence: {
          title: updateTitle,
          description: updateDescription,
          price: updatePrice,
          user_id: updateSelectedUser,
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
