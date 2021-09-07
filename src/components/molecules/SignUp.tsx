import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { signup } from "../../apis/users/signup";
import { FormInput } from "../atoms/FormInput";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { setCookie } = useContext(LoginUserContext);
  const history = useHistory();

  const clickOnSignUp = async () => {
    const { headers, status } = await signup({
      name,
      email,
      phone,
      userId,
      password,
    });

    if (status === 200) {
      setCookie("access-token", headers["access-token"]);
      setCookie("client", headers["client"]);
      setCookie("uid", headers["uid"]);
      history.push("/");
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
      <Button colorScheme="blue" onClick={clickOnSignUp}>
        新規登録
      </Button>
    </>
  );
};
