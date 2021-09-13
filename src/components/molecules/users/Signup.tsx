import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { signup } from "../../../apis/users/signup";
import { FormInput } from "../../atoms/FormInput";
import { useHistory } from "react-router-dom";
import { login } from "../../../apis/users/login";
import { useMessage } from "../../../hooks/useMessage";

export const Signup = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useContext(LoginUserContext);
  const history = useHistory();
  const { showMessage } = useMessage();

  const afterRegister = async () => {
    const { headers } = await login({
      email: email,
      password: password,
    });
    setCookie("access-token", headers["access-token"]);
    setCookie("client", headers["client"]);
    setCookie("uid", headers["uid"]);
    history.push("/");
  };

  const clickOnSignUp = async () => {
    const { status } = await signup({
      name,
      email,
      phone,
      userId,
      password,
    });

    if (status === 200) {
      showMessage({ title: "ユーザー登録しました", status: "success" });
      afterRegister();
    } else {
      showMessage({ title: "ユーザー登録に失敗しました", status: "error" });
    }
  };

  return (
    <>
      <FormInput
        id="name"
        label="名前"
        type="text"
        value={name}
        onChange={setName}
        placeholder="名前を入力してください"
      />
      <FormInput
        id="user_id"
        label="ユーザーID"
        type="text"
        value={userId}
        onChange={setUserId}
        placeholder="ユーザーIDを入力してください（半角英数、4文字以上）"
      />
      <FormInput
        id="email"
        label="メールアドレス"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="メールアドレスを入力してください"
      />
      <FormInput
        id="phone"
        label="電話番号"
        type="text"
        value={phone}
        onChange={setPhone}
        placeholder="電話番号を入力してください"
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
        _focus={{ boxShadow: "none" }}
        disabled={
          !(
            name !== "" &&
            userId !== "" &&
            email !== "" &&
            phone !== "" &&
            password !== ""
          )
        }
        onClick={clickOnSignUp}
      >
        新規登録
      </Button>
    </>
  );
};
