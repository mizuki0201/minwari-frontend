import axios from "axios";

type Props = {
  email: string;
  password: string;
};

export const login = async (props: Props) => {
  const { email, password } = props;

  return await axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/auth/sign_in`, {
      email: email,
      password: password,
    })
    .then((res) => {
      const { headers, status, data } = res;
      return { headers, status, data };
    })
    .catch(() => {
      return { headers: null, status: 301, data: {} };
    });
};
