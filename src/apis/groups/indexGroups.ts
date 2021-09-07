import axios from "axios";
// import { useContext } from "react";
// import { LoginUserContext } from "../../providers/LoginUserProvider";

type Props = {
  userCookies: {
    "access-token"?: string;
    client?: string;
    uid?: string;
  };
};

export const indexGroups = (props: Props | undefined) => {
  // const { userCookies } = props;

  axios
    .get("http://localhost:3001/api/v1/groups", {
      // headers: userCookies,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
      }
    })
    .catch(() => {
      console.log("グループ取れてないよ？");
    });
};
