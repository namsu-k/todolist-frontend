import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/"
})

export const getTodos = () => instance.get("todo/").then((response) => response.data)

export const getTodo = ({queryKey}:QueryFunctionContext) => {
    const [_, todoPk] = queryKey; 
    return instance.get(`todo/${todoPk}`).then(response => response.data)
}