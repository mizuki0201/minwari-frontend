import axios from "axios";
import { UserCookie } from "../../types/types";

type Props = {
  groupId: number;
  updateName: string;
  userCookies: UserCookie | undefined;
};

export const updateGroup = async (props: Props) => {
  const { groupId, updateName, userCookies } = props;

  const result = await axios
    .put(
      `http://localhost:3001/api/v1/groups/${groupId}`,
      {
        group: {
          name: updateName,
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
