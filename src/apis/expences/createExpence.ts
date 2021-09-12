import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  title: string;
  description: string;
  price: string;
  eventId: string;
  selectedUser: string;
  groupId: string;
  userCookies: UserCookie | undefined;
};

export const createExpence = async (props: Props) => {
  const {
    title,
    description,
    price,
    selectedUser,
    eventId,
    groupId,
    userCookies,
  } = props;

  const result = await axios
    .post(
      `http://localhost:3001/api/v1/groups/${groupId}/events/${eventId}/expences`,
      {
        expence: {
          title: title,
          description: description,
          price: price,
          event_id: eventId,
          user_id: selectedUser,
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
