import axios from "axios";

type Props = {
  name: string;
  email: string;
  phone: string;
  userId: string;
  password: string;
};

export const signup = async (props: Props) => {
  const { name, email, phone, userId, password } = props;

  return await axios
    .post("http://localhost:3001/api/v1/auth", {
      user: {
        name: name,
        email: email,
        phone: phone,
        user_id: userId,
        password: password,
      },
    })
    .then((res) => {
      const { headers } = res;
      const { status, user } = res.data;
      return { headers, status, user };
    })
    .catch(() => {
      return { headers: null, status: 301, user: {} };
    });
};
