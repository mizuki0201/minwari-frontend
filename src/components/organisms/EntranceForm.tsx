import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Login } from "../molecules/Login";
import { Signup } from "../molecules/Signup";

export const EntranceForm = () => {
  const [loginForm, setLoginForm] = useState(true);

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
      <Signup />
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
