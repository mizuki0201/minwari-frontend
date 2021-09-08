import axios from "axios";

type Props = {
  email: string;
  password: string;
};

export const login = async (props: Props) => {
  const { email, password } = props;
  console.log(email, password);
  return await axios
    .post("http://localhost:3001/api/v1/auth/sign_in", {
      email: email,
      password: password,
    })
    .then((res) => {
      const { headers, status } = res;
      return { headers, status };
    })
    .catch(() => {
      return { headers: null, status: 301 };
    });
};
