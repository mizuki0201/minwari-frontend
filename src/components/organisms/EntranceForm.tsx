import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Login } from "../molecules/users/Login";
import { Signup } from "../molecules/users/Signup";

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
        _focus={{ boxShadow: "none" }}
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
        _focus={{ boxShadow: "none" }}
        onClick={switchLoginOrSignUp}
      >
        ログインはこちら
      </Button>
    </>
  );
};
