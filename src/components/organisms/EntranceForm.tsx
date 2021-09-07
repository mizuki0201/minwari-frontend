import { Button } from "@chakra-ui/react";
import { useState } from "react";
// import { SignUp } from "../../apis/users/signup";
// import { Login } from "../../apis/users/login";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Login } from "../molecules/Login";
import { SignUp } from "../molecules/SignUp";

export const EntranceForm = () => {
  const [loginForm, setLoginForm] = useState(true);
  const history = useHistory();
  const [userCookies, setCookie, removeCookie] = useCookies(["access-token"]);

  const switchLoginOrSignUp = () => {
    setLoginForm(!loginForm);
  };

  return loginForm ? (
    <>
      <Login />
      <Button
        colorScheme="blue"
        variant="link"
        size="sm"
        onClick={switchLoginOrSignUp}
      >
        新規登録はこちら
      </Button>
    </>
  ) : (
    <>
      <SignUp />
      <Button
        colorScheme="blue"
        variant="link"
        size="sm"
        onClick={switchLoginOrSignUp}
      >
        ログインはこちら
      </Button>
    </>
  );
};
