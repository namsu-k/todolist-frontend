import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getTodos = () =>
  instance.get("todo/").then((response) => response.data);

export const getDones = () =>
  instance.get("todo/done").then((response) => response.data);

export const getTodo = ({ queryKey }: QueryFunctionContext) => {
  const [_, todoPk] = queryKey;
  return instance.get(`todo/${todoPk}`).then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance.post(`users/log-out`, null, {
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
  });

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance.post(
    `users/log-in`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

interface IPostTodo {
  title: string;
}

export const postTodo = ({ title }: IPostTodo) =>
  instance
    .post(
      `todo/`,
      { title },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IPutDone {
  id: number;
  done: boolean;
}

export const putTodo = ({ id, done }: IPutDone) => {
  return instance
    .put(
      `todo/${id}`,
      { done },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.data);
};

export interface ISignUpVariable {
  username: string;
  password: string;
  name?: string;
  email?: string;
}

export const signUp = ({
  username,
  password,
  name,
  email,
}: ISignUpVariable) => {
  return instance.post(
    `users/`,
    { username, password },
    { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
  );
};
