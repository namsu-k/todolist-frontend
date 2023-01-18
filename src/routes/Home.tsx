import { Box, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api";
import Todo from "../components/Todo";
import TodoSkeleton from "../components/TodoSkeleton";

interface ITodo {
  pk: number;
  title: string;
  done: boolean;
  deadline: string;
  is_owner: boolean;
}

export default function Home() {
  const { isLoading, data } = useQuery<ITodo[]>(["todos"], getTodos);
  return (
    <>
      {isLoading ? (
        <>
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
        </>
      ) : null}
      {data?.map((todo) => (
        <Todo
          key={todo.pk}
          pk={todo.pk}
          title={todo.title}
          done={todo.done}
          deadline={todo.deadline}
        />
      ))}
    </>
  );
}
