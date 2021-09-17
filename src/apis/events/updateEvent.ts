import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: string;
  eventId: number;
  updateTitle: string;
  updateDescription: string;
  userCookies: UserCookie | undefined;
};

export const updateEvent = async (props: Props) => {
  const { groupId, eventId, updateTitle, updateDescription, userCookies } =
    props;

  const result = await axios
    .put(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/groups/${groupId}/events/${eventId}`,
      {
        event: {
          title: updateTitle,
          description: updateDescription,
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
