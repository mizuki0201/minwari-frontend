import { ReactNode } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";
import { UserCookie } from "../types/types";

type LoginUserContextType = {
  userCookies?: UserCookie;
  setCookie: (
    name: "access-token" | "client" | "uid",
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
  removeCookie: (name: "access-token" | "client" | "uid") => void;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [userCookies, setCookie, removeCookie] = useCookies([
    "access-token",
    "client",
    "uid",
  ]);

  return (
    <LoginUserContext.Provider value={{ userCookies, setCookie, removeCookie }}>
      {children}
    </LoginUserContext.Provider>
  );
};
