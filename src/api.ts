import Cookie from "js-cookie"
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
})

export const getTodos = () => instance.get("todo/").then((response) => response.data)

export const getTodo = ({queryKey}:QueryFunctionContext) => {
    const [_, todoPk] = queryKey; 
    return instance.get(`todo/${todoPk}`).then(response => response.data)
}

export const getMe = () => instance.get(`users/me`).then(response => response.data)

export const logOut = () => instance.post(`users/log-out`, null, {
    headers: {
        "X-CSRFToken":Cookie.get("csrftoken") || "",
    }
}).then(response => response.data)