import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
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
      <HStack mt={4} justifyContent={"center"}>
        <Button onClick={onOpen}>
          <FaPlus />
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New To do</ModalHeader>
          <ModalCloseButton size={"lg"} />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
