import axios from "axios";

type UserCookie = {
  "access-token"?: string;
  client?: string;
  uid?: string;
};

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
      `http://localhost:3001/api/v1/groups/${groupId}/events/${eventId}`,
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
