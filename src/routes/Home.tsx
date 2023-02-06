import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api";
import Todo from "../components/Todo";
import useUser from "../lib/useUser";

export interface ITodo {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  done: boolean;
  user: number;
}

export default function Home() {
  const { isLoggedIn } = useUser();
  const { isLoading, data } = useQuery<ITodo[]>(["todos"], getTodos);
  const skelLength = data?.map((index) => index);
  return (
    <Flex wrap={"wrap"} justifyContent={"center"}>
      {!isLoading && isLoggedIn
        ? data?.map((todo) => (
            <>
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                done={todo.done}
                created_at={todo.created_at}
                updated_at={todo.updated_at}
                user={todo.user}
              />
            </>
          ))
        : skelLength?.map((value) => (
            <Stack w="100%" alignItems={"center"}>
              <Skeleton mt={4} w="70%" h="100px" borderRadius={"2xl"} />
            </Stack>
          ))}
    </Flex>
  );
}
