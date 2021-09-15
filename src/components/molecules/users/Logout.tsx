import { Text } from "@chakra-ui/layout";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { logout } from "../../../apis/users/logout";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";

export const Logout = () => {
  const { userCookies, removeCookie } = useContext(LoginUserContext);
  const history = useHistory();
  const { showMessage } = useMessage();

  const clickOnLogout = async () => {
    const result = await logout(userCookies);
    if (result.status === 200) {
      removeCookie("access-token");
      removeCookie("client");
      removeCookie("uid");
      removeCookie("currentUserId");
      removeCookie("currentUserName");
      history.push("/entrance");
      showMessage({ title: "ログアウトしました", status: "success" });
    }
  };

  return (
    <Text fontSize="lg" color="white" cursor="pointer" onClick={clickOnLogout}>
      ログアウト
    </Text>
  );
};
