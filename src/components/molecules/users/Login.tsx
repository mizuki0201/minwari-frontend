import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { FormInput } from "../../atoms/FormInput";
import { login } from "../../../apis/users/login";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useContext(LoginUserContext);
  const history = useHistory();
  const { showMessage } = useMessage();

  const clickOnLogin = async () => {
    const { headers, status, data } = await login({
      email: email,
      password: password,
    });

    if (status === 200) {
      setCookie("access-token", headers["access-token"]);
      setCookie("client", headers["client"]);
      setCookie("uid", headers["uid"]);
      setCookie("currentUserId", data.data.id);
      setCookie("currentUserName", data.data.name);
      history.push("/");
      showMessage({ title: "ログインしました", status: "success" });
    } else {
      showMessage({ title: "ログインに失敗しました", status: "error" });
    }
  };

  return (
    <>
      <FormInput
        id="email"
        label="メールアドレス"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="メールアドレスを入力してください"
      />
      <FormInput
        id="password"
        label="パスワード"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="パスワードを入力してください"
      />
      <Button
        colorScheme="blue"
        onClick={clickOnLogin}
        disabled={!(email !== "" && password !== "")}
        _focus={{ boxShadow: "none" }}
      >
        ログイン
      </Button>
    </>
  );
};
